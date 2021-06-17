import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '../components/backend/home.vue'
import Category from '../components/backend/category/manage.vue'
import AddCategory from '../components/backend/category/create.vue'
const routes = [
{
    path: '/home',
    component: Home,
    name: 'home',
},
{
    path: '/categories',
    component: Category,
    name: 'category',
},
{
    path: '/add-category',
    component: AddCategory,
    name: 'add-category',
},
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
