<template>
    <div>
        <h4 class="text-center">Author Add</h4><br/>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="addAuthor">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="author.name" name="name">
                    </div>
                    <button type="submit" class="btn btn-primary">Add Author</button>
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
        methods: {
            addAuthor() {
                this.axios
                    .post(window.location.origin+'/api/v1/author', this.author)
                    .then(response => (
                        this.$router.push({name: 'home'})
                    ))
                    .catch(error => {
                        alert(error.response.data.message)
                    })
                    .finally(() => this.loading = false)
            }
        }
    }
</script>