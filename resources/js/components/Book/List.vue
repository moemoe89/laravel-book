<template>
    <div>
        <h4 class="text-center">Book List</h4><br/>
        <div class="card">
            <div class="card-header"><router-link class="float-right btn btn-success btn-sm add-book" to="/book/add"><i class="fa fa-fw fa-plus-circle"></i> Add Book</router-link></div>
            <div class="card-body">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-2">
                            <div class="form-group">
                                <input type="text" v-model="search" v-on:keyup.enter="searchBook" class="form-control" value="" placeholder="Search">
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group">
                                <download-csv
                                        :data="booksExport"
                                        :name="dataFile"
                                        :labels="labels"
                                        :fields="fields"
                                        v-on:export-finished="exportCSV"
                                >
                                    <button class="button" ref="exportCSV" style="display: none"></button>
                                </download-csv>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-info">Export CSV</button>
                                    <button type="button" class="btn btn-info dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                                        <span class="caret"></span>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="#" @click="bindExport('title','csv')">Title</a>
                                        <a class="dropdown-item" href="#" @click="bindExport('author_title','csv')">Author Title</a>
                                  </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-info">Export XML</button>
                                    <button type="button" class="btn btn-info dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                                        <span class="caret"></span>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="#" @click="bindExport('title','xml')">Title</a>
                                        <a class="dropdown-item" href="#" @click="bindExport('author_title','xml')">Author Title</a>
                                  </div>
                                </div>
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
                <th @click="sort('name')">Author <i class="fa fa-sort" aria-hidden="true"></i></th>
                <th @click="sort('title')">Title <i class="fa fa-sort" aria-hidden="true"></i></th>
                <th @click="sort('created_at')">Created At <i class="fa fa-sort" aria-hidden="true"></i></th>
                <th @click="sort('updated_at')">Updated At <i class="fa fa-sort" aria-hidden="true"></i></th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="book in books.data" :key="book.id">
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
        <pagination :data="books" @pagination-change-page="list"></pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                books: [],
                booksExport: [],
                search: (this.$route.query.search || ''),
                currentSort: (this.$route.query.order_by || ''),
                currentSortDir: (this.$route.query.sort || ''),
                isPaginate: (this.$route.query.is_paginate || 'true'),
                page: (this.$route.query.page || '1'),
                dataFile: 'book_export.csv',
                labels: {},
                fields : [],
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
                    .get(window.location.origin+'/api/v1/book', {
                      params: {
                        search: this.search,
                        order_by: this.currentSort,
                        sort: this.currentSortDir,
                        is_paginate: this.isPaginate,
                        page: this.page,
                      },
                    })
                    .then(response => {
                        this.books = response.data.data;
                        this.$router.replace({ name: "book", query: {search: this.search, order_by: this.currentSort, sort: this.currentSortDir, page: this.page} });
                    });
            },
            deleteBook(id) {
                if(confirm("Do you really want to delete?")){
                    this.axios
                        .delete(window.location.origin+`/api/v1/book/${id}`)
                        .then(response => {
                            let i = this.books.data.map(item => item.id).indexOf(id);
                            this.books.data.splice(i, 1)
                        });
                }
            },
            searchBook:function() {
                this.list();
                this.search = this.search;
                this.$router.replace({ name: "book", query: {search: this.search, order_by: this.currentSort, sort: this.currentSortDir, page: this.page} });
            },
            sort:function(s) {
                if(s === this.currentSort) {
                    this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
                }
                this.currentSort = s;
                this.list();
                this.$router.replace({ name: "book", query: {search: this.search, order_by: this.currentSort, sort: this.currentSortDir, page: this.page} });
            },
            bindExport(column, type) {
                this.axios
                    .get(window.location.origin+'/api/v1/book', {
                      params: {
                        select_field: 'name,title',
                        search: this.search,
                        order_by: this.currentSort,
                        sort: this.currentSortDir,
                      },
                    })
                    .then(response => {
                        if(column == 'author_title') {
                            this.labels = {
                                name: 'Author',
                                title: 'Title'
                            };
                            this.fields = ['name', 'title'];
                        } else if(column == 'title') {
                            this.labels = {
                                title: 'Title'
                            };
                            this.fields = ['title'];
                        }
                        this.booksExport = response.data.data;
                    })
                    .finally(() => {
                        if(type == 'csv') {
                            this.$refs.exportCSV.click()
                        } else if(type == 'xml') {
                            this.exportXML(column)
                        }
                    });
            },
            exportCSV(event) {
                this.isExported = true
                setTimeout(() => {
                    this.isExported = false
                }, 3 * 1000)
            },
            exportXML(column) {
                var jsonxml = require('jsontoxml');
                var bookData = [];

                var arrayLength = this.booksExport.length;
                for (var i = 0; i < arrayLength; i++) {
                    var book = {
                        title: this.booksExport[i].title
                    }
                    if(column == 'author_title') {
                        book.name = this.booksExport[i].name;
                    }
                    bookData.push({
                        book
                    });
                }

                var xml = jsonxml({
                    root: bookData,
                })
                 
                var download = require('downloadjs');
                download(xml, "author_export.xml", "application/xml");
            }
        },
        computed: {
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