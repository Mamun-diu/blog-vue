import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '../components/backend/home.vue'
import Category from '../components/backend/category/manage.vue'
import AddCategory from '../components/backend/category/create.vue'
import EditCategory from '../components/backend/category/edit.vue'

import Post from '../components/backend/post/manage.vue'
import AddPost from '../components/backend/post/create.vue'
import EditPost from '../components/backend/post/edit.vue'
const routes = [
{path: '/home',component: Home,name: 'home',},

{path: '/categories',component: Category},
{path: '/add-category',component: AddCategory},
{path: '/edit-category/:id',component: EditCategory,name: 'editCategory'},

{path: '/posts',component: Post,name: 'posts'},
{path: '/add-post',component: AddPost},
{path: '/edit-post/:id',component: EditPost,name: 'editPost'},
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    mode: "history",
    routes, // short for `routes: routes`
    linkActiveClass: 'active',
})
export default router;
