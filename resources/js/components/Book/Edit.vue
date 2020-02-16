<template>
    <div>
        <h4 class="text-center">Book Edit</h4><br/>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="updateBook">
                    <div class="form-group">
                        <label>Author ID</label>
                        <select v-model="book.author_id" name="city" id="city" class="form-control">
                            <option v-for="author in authors" :key="author.id" :value="author.id">{{ author.name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control" v-model="book.title">
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
                authors: []
            }
        },
        created() {
            this.axios
                .get(window.location.origin+'/api/v1/author?order_by=name&sort=asc&select_field=id,name')
                .then((response) => {
                    this.book = response.data.data;
                    // console.log(response.data);
                });

            this.axios
                .get(window.location.origin+'/api/v1/author')
                .then(response => {
                    this.authors = response.data.data;
                });    
        },
        methods: {
            updateBook() {
                this.axios
                    .put(window.location.origin+`/api/v1/book/${this.$route.params.id}`, this.book)
                    .then((response) => {
                        this.$router.push({name: 'book'});
                    });
            }
        }
    }
</script>