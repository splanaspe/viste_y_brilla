<script setup>
    import {ref, computed} from 'vue'

    const mostrarCarrito = ref(false);
    let tiempo, tiempo2;
    let haEntradoCarrito= ref(false);

    const props = defineProps({
        carrito:{
            type: Array,
            required: true
        }
    })

    const totalPagar = computed(()=>{
        return props.carrito.reduce( (total,producto) => total + (producto.cantidad * producto.precio),0)
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
    <header class="top-0 w-full z-50">
        <div class="flex justify-around items-center  bg-gray-100 shadow-md p-4 inline text-center h-14"> 
        <div class="">
            <img class="h-10 w-10 hover:cursor-pointer hover:scale-110 transition-transform duration-300" src="../assets/ramadan.png">
        </div>
        <div class="">
            <ul class="inline flex">
                <li class="mr-2 text-lg mx-3 cursor-pointer text-purple-800 hover:text-purple-600 hover:underline-offset-4 hover:underline"> Tienda</li>
                <li class="mr-2 text-lg mx-3 cursor-pointer text-purple-800 hover:text-purple-600 hover:underline-offset-4 hover:underline"> Rebajas</li>
                <li class="text-lg mx-3 cursor-pointer text-purple-800 hover:text-purple-600 hover:underline-offset-4 hover:underline"> Proyecto</li>
            </ul>
        </div>
        <div @click="mostrarCarritoHandler" class="relative hover:scale-125 transition-transform duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="purple" class="bi bi-cart4  hover:cursor-pointer" viewBox="0 0 16 16">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
            </svg>
            <span class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-orange-200 text-black-800 font-bold w-4 h-4 rounded-md text-xs">
                {{ carrito.length }}
            </span>
        </div>
        </div>
    <!-- CARRITO -->
    <div v-if="mostrarCarrito" @mouseleave="ocultarCarritoHandler" @mouseenter="haEntradoCarrito = true" class="relative z-50">    
    <div class="absolute rounded-md px-3 py-1 sm:h-auto sm:w-72 md:h-auto md:w-96 bg-gray-100 right-2 top-2">
        <p v-if="carrito.length === 0" class="text-purple-800 sm:text-sm md:text-xl"> No hay productos en el carrito </p>
        <div v-else class="flex flex-col h-full">
            <!-- Contenedor de los productos con desplazamiento -->
            <div class="overflow-y-auto max-h-80 divide-y-2 bg-white rounded-md">
                <div class="py-2" v-for="producto in carrito">
                    <div class="flex flex-col items-center">
                        <div class="flex items-center justify-center text-center">
                            <p class="text-black mx-3 font-bold sm:text-sm md:text-xl"> {{ producto.nombre }} {{ producto.talla }}: </p>
                            <p>  {{ producto.precio }} €</p>
                            <span class="mx-1 px-1 sm:text-md md:text-2xl text-red-500  bg-white rounded-md cursor-pointer" @click="$emit('decrementar-cantidad-producto', producto.id)"> - </span>
                            <span class="mx-1 sm:text-sm md:text-xl"> {{ producto.cantidad }} </span>
                            <span class="mx-1 px-1 sm:text-sm md:text-xl text-green-500 bg-white rounded-md cursor-pointer" @click="$emit('incrementar-cantidad-producto', producto.id)"> + </span>
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
            <div class="flex sticky bottom-0 my-2 justify-center">
                <button class="bg-white text-purple-800 p-2 mx-2 rounded-md my-2 self-center mt-auto sm:text-sm md:text-xl"> PAGAR </button>
                <button class="bg-red-400 text-black-700 p-2 mx-2 rounded-md my-2 self-center mt-auto sm:text-sm md:text-xl" @click="$emit('vaciar-carrito')"> VACIAR </button>
                <p class="px-2 sm:text-sm md:text-xl"> <span class="font-boldn"> Total: </span>{{ totalPagar }}</p>
            </div>
            
        </div>
        </div>
    </div>

    </header>
    
</template>