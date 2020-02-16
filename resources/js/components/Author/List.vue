<template>
    <div>
        <h4 class="text-center">Author List</h4><br/>
        <div class="card">
            <div class="card-header"><router-link class="float-right btn btn-success btn-sm" to="/author/add"><i class="fa fa-fw fa-plus-circle"></i> Add Author</router-link></div>
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
                <th>Name</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="author in authors" :key="author.id">
                <td>{{ author.id }}</td>
                <td>{{ author.name }}</td>
                <td>{{ author.created_at }}</td>
                <td>{{ author.updated_at }}</td>
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
                authors: []
            }
        },
        created() {
            this.axios
                .get(window.location.origin+'/api/v1/author?search='+(this.$route.query.search || ''))
                .then(response => {
                    this.authors = response.data.data;
                });
        },
        methods: {
            deleteAuthor(id) {
                if(confirm("Do you really want to delete?")){
                    this.axios
                        .delete(window.location.origin+`/api/v1/author/${id}`)
                        .then(response => {
                            let i = this.authors.map(item => item.id).indexOf(id); // find index of your object
                            this.authors.splice(i, 1)
                        });
                }
            }
        }
    }
</script>