<template>
    <div>
        <h4 class="text-center">Author List</h4><br/>
        <div class="card">
            <div class="card-header"><router-link class="float-right btn btn-success btn-sm add-author" to="/author/add"><i class="fa fa-fw fa-plus-circle"></i> Add Author</router-link></div>
            <div class="card-body">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-2">
                            <div class="form-group">
                                <input type="text" v-model="search" v-on:keyup.enter="searchAuthor" class="form-control" value="" placeholder="Search" name="search">
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group">
                                <download-csv
                                        :data="authorsExport"
                                        :name="dataFile"
                                        :labels="labels"
                                        :fields="fields"
                                        v-on:export-finished="exportCSV"
                                >
                                    <button class="button" ref="exportCSV" style="display: none"></button>
                                </download-csv>
                                <button class="btn btn-info export-csv" @click="bindExport('csv')">Export CSV</button>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group">
                                <button class="btn btn-info export-xml" @click="bindExport('xml')">Export XML</button>
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
                <th @click="sort('id')">ID <i class="fa fa-sort" aria-hidden="true"></i></th>
                <th @click="sort('name')">Name <i class="fa fa-sort" aria-hidden="true"></i></th>
                <th @click="sort('created_at')">Created At <i class="fa fa-sort" aria-hidden="true"></i></th>
                <th @click="sort('updated_at')">Updated At <i class="fa fa-sort" aria-hidden="true"></i></th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="author in authors.data" :key="author.id">
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
        <pagination :data="authors" @pagination-change-page="list"></pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                authors: [],
                authorsExport: [],
                search: (this.$route.query.search || ''),
                currentSort: (this.$route.query.order_by || ''),
                currentSortDir: (this.$route.query.sort || ''),
                isPaginate: (this.$route.query.is_paginate || 'true'),
                page: (this.$route.query.page || '1'),
                dataFile: 'author_export.csv',
                labels: {
                    name: 'Name'
                },
                fields : ['name'],
                isExported: false
            }
        },
        created() {
            this.list();
        },
        methods: {
            list(page) {
                this.page = page;
                this.axios
                    .get(window.location.origin+'/api/v1/author', {
                      params: {
                        search: this.search,
                        order_by: this.currentSort,
                        sort: this.currentSortDir,
                        is_paginate: this.isPaginate,
                        page: this.page,
                      },
                    })
                    .then(response => {
                        this.authors = response.data.data;
                        this.$router.replace({ name: "home", query: {search: this.search, order_by: this.currentSort, sort: this.currentSortDir, page: this.page} });
                    });
            },
            deleteAuthor(id) {
                if(confirm("Do you really want to delete?")){
                    this.axios
                        .delete(window.location.origin+`/api/v1/author/${id}`)
                        .then(response => {
                            let i = this.authors.data.map(item => item.id).indexOf(id);
                            this.authors.data.splice(i, 1)
                        });
                }
            },
            searchAuthor:function() {
                this.list();
                this.search = this.search;
                this.$router.replace({ name: "home", query: {search: this.search, order_by: this.currentSort, sort: this.currentSortDir, page: this.page} });
            },
            sort:function(s) {
                if(s === this.currentSort) {
                    this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
                }
                this.currentSort = s;
                this.list();
                this.$router.replace({ name: "home", query: {search: this.search, order_by: this.currentSort, sort: this.currentSortDir, page: this.page} });
            },
            bindExport(type) {
                this.axios
                    .get(window.location.origin+'/api/v1/author', {
                      params: {
                        select_field: 'name',
                        search: this.search,
                        order_by: this.currentSort,
                        sort: this.currentSortDir,
                      },
                    })
                    .then(response => {
                        this.authorsExport = response.data.data;
                    })
                    .finally(() => {
                        if(type == 'csv') {
                            this.$refs.exportCSV.click()
                        } else if(type == 'xml') {
                            this.exportXML()
                        }
                    });
            },
            exportCSV(event) {
                this.isExported = true
                setTimeout(() => {
                    this.isExported = false
                }, 3 * 1000)
            },
            exportXML() {
                var jsonxml = require('jsontoxml');
                var authorData = [];

                var arrayLength = this.authorsExport.length;
                for (var i = 0; i < arrayLength; i++) {
                    authorData.push({
                        author:{
                            name: this.authorsExport[i].name,
                        }
                    });
                }

                var xml = jsonxml({
                    root: authorData,
                })
                 
                var download = require('downloadjs');
                download(xml, "author_export.xml", "application/xml");
            }
        },
        computed: {
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