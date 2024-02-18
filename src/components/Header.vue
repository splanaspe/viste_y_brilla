<script setup>
    import {ref} from 'vue'

    const mostrarCarrito = ref(false);
    let tiempo, tiempo2;
    let haEntradoCarrito= ref(false);

    const props = defineProps({
        carrito:{
            type: Array,
            required: true
        }
    })

    defineEmits([
        'incrementar-cantidad-producto',
        'decrementar-cantidad-producto',
        'vaciar-carrito',
        'eliminar-producto-carrito'
    ])

    const ocultarCarritoHandler = () =>{
        if(mostrarCarrito.value){
            tiempo = setInterval( () =>{
            mostrarCarrito.value=false;
            haEntradoCarrito.value=false;
        }, 200)
        }       
    }

    const mostrarCarritoHandler = () =>{
        clearInterval(tiempo)
        clearInterval(tiempo2)
        mostrarCarrito.value=true
        haEntradoCarrito.value=false;

        tiempo2 = setInterval( () =>{
            if(!haEntradoCarrito.value){
                mostrarCarrito.value=false;
            }
        }, 4000)
    }
</script>

<template>
    <header class="">
    
        <div class="flex justify-around items-center  bg-purple-500 shadow-xl p-4 inline text-center h-18"> 
        <div class="">
            <img class="h-16 w-16 hover:cursor-pointer hover:scale-110 transition-transform duration-300" src="../assets/ramadan.png">
        </div>
        <div class="">
            <ul class="inline flex">
                <li class="mr-2 text-2xl mx-3 cursor-pointer text-white hover:text-gray-100 hover:underline-offset-4 hover:underline"> Tienda</li>
                <li class="mr-2 text-2xl mx-3 cursor-pointer text-white hover:text-gray-100 hover:underline-offset-4 hover:underline"> Rebajas</li>
                <li class="text-2xl mx-3 cursor-pointer text-white hover:text-gray-100 hover:underline-offset-4 hover:underline"> Proyecto</li>
            </ul>
        </div>
        <div @click="mostrarCarritoHandler">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-cart4 hover:scale-125 transition-transform duration-200 hover:cursor-pointer" viewBox="0 0 16 16">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
            </svg>
        </div>
    </div>
    <!-- CARRITO -->
    <div v-if="mostrarCarrito" @mouseleave="ocultarCarritoHandler" @mouseenter="haEntradoCarrito = true" class="relative z-50">    
    <div class="absolute rounded-md px-3 py-1 h-96 w-96 bg-purple-500 right-2 top-2">
        <p v-if="carrito.length === 0" class="text-white text-xl"> No hay productos en el carrito </p>
        <div v-else class="flex flex-col h-full">
            <!-- Contenedor de los productos con desplazamiento -->
            <div class="overflow-y-auto max-h-80 divide-y-2 bg-white rounded-md">
                <div class="py-2" v-for="producto in carrito">
                    <div class="flex flex-col items-center">
                        <div class="flex items-center justify-center text-center">
                            <p class="text-black font-bold mx-3"> {{ producto.nombre }} : </p>
                            <span class="mx-1 px-1 text-2xl text-red-500  bg-white rounded-md cursor-pointer" @click="$emit('decrementar-cantidad-producto', producto.id)"> - </span>
                            <span class="mx-1 text-xl"> {{ producto.cantidad }} </span>
                            <span class="mx-1 px-1 text-xl text-green-500 bg-white rounded-md cursor-pointer" @click="$emit('incrementar-cantidad-producto', producto.id)"> + </span>
                            <span class="mx-1 text-black" @click="$emit('eliminar-producto-carrito', producto.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x-circle cursor-pointer" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </span>
                        </div>
                    <div class="mt-2">
                        <img class="rounded-md w-24 h-34 shadow-md" :src='"src/assets/"+producto.imagen'>
                    </div>
                </div>
            </div>
        </div >
            
            <!-- Botón Pagar, fuera del contenedor de desplazamiento -->
            <div class="flex absolute bottom-0">
                <button class="bg-white text-purple-800 p-2 mx-2 rounded-md my-2 self-center mt-auto"> PAGAR </button>
                <button class="bg-red-400 text-black-700 p-2 mx-2 rounded-md my-2 self-center mt-auto" @click="$emit('vaciar-carrito')"> VACIAR </button>
            </div>
            
        </div>
    </div>
</div>

    </header>
    
</template>