<template>
    <div>
        <h4 class="text-center">Book List</h4><br/>
        <div class="card">
            <div class="card-header"><router-link class="float-right btn btn-success btn-sm" to="/book/add"><i class="fa fa-fw fa-plus-circle"></i> Add Book</router-link></div>
            <div class="card-body">
                <div class="col-sm-12">
                    <form method="get">
                        <div class="row">
                            <div class="col-sm-2">
                                <div class="form-group">
                                    <input type="text" name="search" id="search" class="form-control" value="" placeholder="Search">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <br />
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>ID</th>
                <th>Author</th>
                <th>Title</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="book in books" :key="book.id">
                <td>{{ book.id }}</td>
                <td>{{ book.name }}</td>
                <td>{{ book.title }}</td>
                <td>{{ book.created_at }}</td>
                <td>{{ book.updated_at }}</td>
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
                books: []
            }
        },
        created() {
            this.axios
                .get(window.location.origin+'/api/v1/book?search='+(this.$route.query.search || ''))
                .then(response => {
                    this.books = response.data.data;
                });
        },
        methods: {
            deleteBook(id) {
                if(confirm("Do you really want to delete?")){
                    this.axios
                        .delete(window.location.origin+`/api/v1/book/${id}`)
                        .then(response => {
                            let i = this.books.map(item => item.id).indexOf(id); // find index of your object
                            this.books.splice(i, 1)
                        });
                }
            }
        }
    }
</script>