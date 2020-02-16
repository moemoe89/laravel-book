<template>
    <div>
        <h4 class="text-center">Author List</h4><br/>
        <div class="card">
            <div class="card-header"><router-link class="float-right btn btn-success btn-sm" to="/author/add"><i class="fa fa-fw fa-plus-circle"></i> Add Author</router-link></div>
            <div class="card-body">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-2">
                            <div class="form-group">
                                <input type="text" v-model="search" v-on:keyup.enter="searchAuthor" class="form-control" value="" placeholder="Search">
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
                <th @click="sort('name')">Name</th>
                <th @click="sort('created_at')">Created At</th>
                <th @click="sort('updated_at')">Updated At</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="author in authors" :key="author.id">
                <td>{{ author.id }}</td>
                <td>{{ author.name }}</td>
                <td>{{ author.created_at | localTime }}</td>
                <td>{{ author.updated_at | localTime }}</td>
                <td>
                    <div class="btn-group" role="group">
                        <router-link :to="{name: 'author_edit', params: { id: author.id }}" class="btn btn-primary">Edit
                        </router-link>
                        <button class="btn btn-danger" @click="deleteAuthor(author.id)">Delete</button>
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
                authors: [],
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
                    .get(window.location.origin+'/api/v1/author', {
                      params: {
                        search: this.search,
                        order_by: this.currentSort,
                        sort: this.currentSortDir,
                      },
                    })
                    .then(response => {
                        this.authors = response.data.data;
                    });
            },
            deleteAuthor(id) {
                if(confirm("Do you really want to delete?")){
                    this.axios
                        .delete(window.location.origin+`/api/v1/author/${id}`)
                        .then(response => {
                            let i = this.authors.map(item => item.id).indexOf(id); // find index of your object
                            this.authors.splice(i, 1)
                        });
                }
            },
            searchAuthor:function() {
                this.list();
                this.search = this.search;
                this.$router.replace({ name: "home", query: {search: this.search, order_by: this.currentSort, sort: this.currentSortDir} });
            },
            sort:function(s) {
                //if s == current sort, reverse
                if(s === this.currentSort) {
                    this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
                }
                this.currentSort = s;
                this.list();
                this.$router.replace({ name: "home", query: {search: this.search, order_by: this.currentSort, sort: this.currentSortDir} });
            }
        },
        computed:{
            authors:function() {
                return this.authors.sort((a,b) => {
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