<script setup>
    import {ref, computed} from 'vue'

    const mostrarCarrito = ref(false);
    const isMenuOpen = ref(false);
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
    <header class="top-0 w-full z-50 fixed">
        <div class="flex justify-around items-center  bg-gray-200 shadow-md p-4 inline text-center border-b-2 border-purple-800"> 
            <div @click="isMenuOpen = !isMenuOpen" class="menu-icon hover:cursor-pointer">
                <!-- Icono de menú cerrado -->
                <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list transition duration-500 ease-in-out transform" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
                <!-- Icono de menú abierto -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x transition duration-500 ease-in-out transform" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
        <div class="flex items-center scale-125">
            <span class="text-purple-800 mx-2 sm:text-lg md:text-xl font-bold"> HALAL</span>
            <img class="h-10 w-10 mx-2" src="../assets/ramadan.png">
            <span class="text-gray-600 mx-2 sm:text-lg md:text-xl font-bold"> MOODS</span>
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
    <div class="absolute rounded-md px-3 py-1 sm:h-auto sm:w-72 md:h-auto md:w-96 bg-purple-800 right-2 top-2">
        <p v-if="carrito.length === 0" class="text-white sm:text-sm md:text-xl"> No hay productos en el carrito </p>
        <div v-else class="flex flex-col h-full">
            <!-- Contenedor de los productos con desplazamiento -->
            <div class="overflow-y-auto max-h-80 divide-y-2 bg-white rounded-md">
                <div class="py-2" v-for="producto in carrito">
                    <div class="flex flex-col items-center">
                        <div class="flex items-center justify-center text-center">
                            <p class="text-black mx-3 font-bold sm:text-sm md:text-lg"> {{ producto.nombre }} {{ producto.talla }}: </p>
                            <p class="p-1 w-5">  {{ producto.precio }} </p>
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
            <div class="flex sticky bottom-0 my-2 align-center justify-center">
                <button class="bg-white text-purple-800 p-2 mx-2 rounded-md my-2 self-center mt-auto sm:text-sm md:text-xl"> PAGAR </button>
                <button class="bg-red-400 text-black-700 p-2 mx-2 rounded-md my-2 self-center mt-auto sm:text-sm md:text-xl" @click="$emit('vaciar-carrito')"> VACIAR </button>
                <p class="px-2  text-white sm:text-sm md:text-xl"> <span class="font-bold "> Total: </span>{{ totalPagar}} €</p>
            </div>
            
        </div>
        </div>
    </div>

    <!-- Menu Izquierda -->
    <div v-if="isMenuOpen" class="absolute left-0 top-18 w-auto z-50 border-b-2 border-purple-800  bg-gray-200 px-4 p-2">
        <div class="rounded-md">
            <div class="flex icono-login justify-center items-center text-center mt-4 hover:cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="purple" class="bi bi-person-circle mx-2" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
            </div>
            <div class="mt-5 mb-2 pt-2 flex justify-center items-center text-center border-t-2 border-gray-400" >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="purple" class="bi bi-shop" viewBox="0 0 16 16">
                    <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z"/>
                </svg>
            </div>
            <ul class=" sm:px-1 lg:px-3 text-start divide-y-2 divide-gray-400" role="list">
                <li class="my-1 text-xl cursor-pointer  text-purple-800 hover:underline-offset-4 hover:underline ">  Jilbabs </li>
                <li class="my-1 text-xl cursor-pointer  text-purple-800 hover:underline-offset-4 hover:underline "> Hijabs  </li>
                <li class="my-1 text-xl cursor-pointer text-purple-800 hover:underline-offset-4 hover:underline "> Abayas  </li>
                <li class="my-1 text-xl cursor-pointer  text-purple-800 hover:underline-offset-4 hover:underline "> Bolsos  </li>
                <li class="my-1 text-xl cursor-pointer  text-purple-800 hover:underline-offset-4 hover:underline ">  Accesorios </li>
            </ul>
        </div>
    </div>
    </header>
</template>

<style scoped>


</style>