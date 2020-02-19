<template>
    <div>
        <h4 class="text-center">Book Edit</h4><br/>
        <div class="row">
            <div class="col-md-6">
                <div class="alert alert-danger" v-if="error">
                    {{ errorMessage }}
                </div>
                <form @submit.prevent="updateBook">
                    <div class="form-group">
                        <label>Author ID</label>
                        <select v-model="book.author_id" name="author_id" class="form-control">
                            <option v-for="author in authors" :key="author.id" :value="author.id">{{ author.name }}</option>
                        </select>
                        <form-error v-if="errors.author_id" :errors="errors">
                            {{ errors.author_id[0] }}
                        </form-error>
                    </div>
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control" v-model="book.title" name="title">
                        <form-error v-if="errors.title" :errors="errors">
                            {{ errors.title[0] }}
                        </form-error>
                    </div>
                    <button type="submit" class="btn btn-primary">Update Book</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                book: {},
                authors: [],
                error: false,
                errorMessage: '',
                errors: {}
            }
        },
        created() {
            this.axios
                .get(window.location.origin+'/api/v1/author?order_by=name&sort=asc&select_field=id,name')
                .then((response) => {
                    this.authors = response.data.data;
                });

            this.axios
                .get(window.location.origin+`/api/v1/book/${this.$route.params.id}`)
                .then((response) => {
                    this.book = response.data.data;
                })
                .catch(error => {
                    alert(error.response.data.message);
                    this.$router.push({name: 'book'});
                });
        },
        methods: {
            updateBook() {
                this.axios
                    .put(window.location.origin+`/api/v1/book/${this.$route.params.id}`, this.book)
                    .then((response) => {
                        this.$router.push({name: 'book'});
                    })
                    .catch(error => {
                        this.error = true
                        this.errorMessage = error.response.data.message
                        this.errors = error.response.data.errors
                    });
            }
        }
    }
</script>