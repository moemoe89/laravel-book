<template>
    <div>
        <h4 class="text-center">Book List</h4><br/>
        <div class="card">
            <div class="card-header"><router-link class="float-right btn btn-success btn-sm" to="/book/add"><i class="fa fa-fw fa-plus-circle"></i> Add Book</router-link></div>
            <div class="card-body">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-2">
                            <div class="form-group">
                                <input type="text" v-model="search" v-on:keyup.enter="searchBook" class="form-control" value="" placeholder="Search">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br />
        <table class="table table-bordered">
            <thead>
            <tr>
                <th @click="sort('id')">ID</th>
                <th @click="sort('name')">Author</th>
                <th @click="sort('title')">Title</th>
                <th @click="sort('created_at')">Created At</th>
                <th @click="sort('updated_at')">Updated At</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="book in books" :key="book.id">
                <td>{{ book.id }}</td>
                <td>{{ book.name }}</td>
                <td>{{ book.title }}</td>
                <td>{{ book.created_at | localTime }}</td>
                <td>{{ book.updated_at | localTime }}</td>
                <td>
                    <div class="btn-group" role="group">
                        <router-link :to="{name: 'book_edit', params: { id: book.id }}" class="btn btn-primary">Edit
                        </router-link>
                        <button class="btn btn-danger" @click="deleteBook(book.id)">Delete</button>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                books: [],
                search: (this.$route.query.search || ''),
                currentSort: (this.$route.query.order_by || ''),
                currentSortDir: (this.$route.query.sort || '')
            }
        },
        created() {
            this.list();
        },
        methods: {
            list() {
                this.axios
                    .get(window.location.origin+'/api/v1/book', {
                      params: {
                        search: this.search,
                        order_by: this.currentSort,
                        sort: this.currentSortDir,
                      },
                    })
                    .then(response => {
                        this.books = response.data.data;
                    });
            },
            deleteBook(id) {
                if(confirm("Do you really want to delete?")){
                    this.axios
                        .delete(window.location.origin+`/api/v1/book/${id}`)
                        .then(response => {
                            let i = this.books.map(item => item.id).indexOf(id); // find index of your object
                            this.books.splice(i, 1)
                        });
                }
            },
            searchBook:function() {
                this.list();
                this.search = this.search;
                this.$router.replace({ name: "book", query: {search: this.search, order_by: this.currentSort, sort: this.currentSortDir} });
            },
            sort:function(s) {
                //if s == current sort, reverse
                if(s === this.currentSort) {
                    this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
                }
                this.currentSort = s;
                this.list();
                this.$router.replace({ name: "book", query: {search: this.search, order_by: this.currentSort, sort: this.currentSortDir} });
            }
        },
        computed:{
            books:function() {
                return this.books.sort((a,b) => {
                    let modifier = 1;
                    if(this.currentSortDir === 'desc') modifier = -1;
                    if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                    if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                    return 0;
                });
            }
        },
        filters: {
            localTime: function (date) {
               return moment(date + ' Z', 'YYYY-MM-DD HH:mm:ss Z', true).format('D MMM YYYY HH:mm');
            }
        }
    }
</script>