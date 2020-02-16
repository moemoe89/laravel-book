import AuthorList from './components/AuthorList.vue';
import AuthorAdd from './components/AuthorAdd.vue';
import AuthorEdit from './components/AuthorEdit.vue';

export const routes = [
    {
        name: 'home',
        path: '/',
        component: AuthorList
    },
    {
        name: 'add',
        path: '/add',
        component: AuthorAdd
    },
    {
        name: 'edit',
        path: '/edit/:id',
        component: AuthorEdit
    }
];