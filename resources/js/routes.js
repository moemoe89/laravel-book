import AuthorList from './components/Author/List.vue';
import AuthorAdd from './components/Author/Add.vue';
import AuthorEdit from './components/Author/Edit.vue';
import BookList from './components/Book/List.vue';
import BookAdd from './components/Book/Add.vue';
import BookEdit from './components/Book/Edit.vue';

export const routes = [
    {
        name: 'home',
        path: '/',
        component: AuthorList
    },
    {
        name: 'author_add',
        path: '/author/add',
        component: AuthorAdd
    },
    {
        name: 'author_edit',
        path: '/author/edit/:id',
        component: AuthorEdit
    },
    {
        name: 'book',
        path: '/book',
        component: BookList
    },
    {
        name: 'book_add',
        path: '/book/add',
        component: BookAdd
    },
    {
        name: 'book_edit',
        path: '/book/edit/:id',
        component: BookEdit
    }
];