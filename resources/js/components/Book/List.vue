<template>
    <div>
        <h4 class="text-center">Book List</h4><br/>
        <router-link to="/book/add" class="btn btn-success">Add Book</router-link>
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
                .get(window.location.origin+'/api/v1/book')
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