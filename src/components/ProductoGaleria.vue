<script setup>
    
    const props = defineProps({
        producto:{
            type: Object,
            required: true
        }
    })

    defineEmits(['agregar-producto-carrito']);
    
</script>
<template>
    <div class="rounded-md p-3 basis-1/4 shadow-md text-center relative hover:cursor-pointer"> 
        <img class="rounded-md" :src='"src/assets/"+producto.imagen'>
        <h1 class="text-lg font-bold text-purple-800"> {{ producto.nombre }}</h1>
        <p> {{ producto.precio }} $</p>
        <div 
            class="absolute bottom-0 right-0 p-2" 
            @click="$emit('agregar-producto-carrito', producto)">
            <svg
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                fill="purple" 
                class="bi bi-cart-plus hover:scale-125 transition-transform duration-100" 
                viewBox="0 0 16 16">
                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
        </div>
    </div>
</template>