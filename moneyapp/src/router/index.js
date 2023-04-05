import { createRouter, createWebHistory } from "vue-router";

import Connexion from '../views/Connexion.vue'
import MainPage from '../views/MainPage.vue'

const routes = [
    {
        name : 'Connexion',
        component : Connexion,
        path : '/'
    },
    {
        name : 'MainPage',
        component : MainPage,
        path : '/dashboard'
    }
]

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router;