import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import './style.css'
import App from './App.vue'
import Test from './components/Test.vue'

/*
// Define las rutas
const routes = [
    { path: '/', component: App },
    { path: '/test', component: Testt },
    // Añade más rutas aquí
];


// Crea el router
const router = createRouter({
    history: createWebHistory(),
    routes, // configuración de rutas
});

*/

createApp(App).mount('#app')
