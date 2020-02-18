<template>
    <div>
        <h4 class="text-center">Author Edit</h4><br/>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="updateAuthor">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="author.name" id="name">
                    </div>
                    <button type="submit" class="btn btn-primary">Update Author</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                author: {}
            }
        },
        created() {
            this.axios
                .get(window.location.origin+`/api/v1/author/${this.$route.params.id}`)
                .then((response) => {
                    this.author = response.data.data;
                })
                .catch(error => {
                    alert(error.response.data.message);
                    this.$router.push({name: 'home'});
                });
        },
        methods: {
            updateAuthor() {
                this.axios
                    .put(window.location.origin+`/api/v1/author/${this.$route.params.id}`, this.author)
                    .then((response) => {
                        this.$router.push({name: 'home'});
                    })
                    .catch(error => {
                        alert(error.response.data.message)
                    });
            }
        }
    }
</script>