import UserListPage from '@pages/UserListPage.vue'
import AddUserPage from '@pages/AddUserPage.vue'
import EditUserPage from '@pages/EditUserPage.vue'

export const routes = [
    {
        path: '/',
        component: UserListPage,
        name: 'user-list',
    },
    { path: '/add-user', component: AddUserPage, name: 'add-user' },
    {
        path: '/edit-user/:id',
        component: EditUserPage,
        name: 'edit-user',
        props: true,
    },
]
