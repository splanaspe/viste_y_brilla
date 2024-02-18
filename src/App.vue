<script setup>
import Header from './components/Header.vue'
</script>

<template>
    <Header> </Header>
    <div class="grid grid-cols-[15%_auto] text-start px-4 my-10 gap-4 relative">
        <div class="bg-gray-100 rounded-md self-start sticky top-4 border-2 border-purple-800 shadow-sm">
            <ul class="py-4 px-5 text-center">
                <li class="my-1 cursor-pointer text-lg text-purple-800 hover:text-purple-600 ">  Jilbabs </li>
                <li class="my-1 cursor-pointer text-lg text-purple-800 hover:text-purple-600 "> Hijabs  </li>
                <li class="my-1 cursor-pointer text-lg text-purple-800 hover:text-purple-600 "> Abayas  </li>
                <li class="my-1 cursor-pointer text-lg text-purple-800 hover:text-purple-600 "> Bolsos  </li>
                <li class="my-1 cursor-pointer text-lg text-purple-800 hover:text-purple-600 ">  Accesorios </li>
            </ul>
        </div>

        <div class="grid grid-cols-3 gap-4 content-start snap-y ">
            <div class="border rounded-md p-3 basis-1/4 shadow-sm text-center"> 
                
                <img class="rounded-md" src="./assets/jilbab1.webp">
                <h1 class="font-bold"> Jilbab Azul Cielo </h1><p> 30 $</p>
            </div>
            <div class="border rounded-md p-3 basis-1/4 shadow-sm  text-center"> 
                
                <img class="rounded-md" src="./assets/jilbab2.webp">
                <h1> Nombre Producto </h1><p> 40 $</p>
            </div>
            <div class="border rounded-md p-3 basis-1/4 shadow-sm  text-center"> 
                
                <img class="rounded-md" src="./assets/jilbab3.webp">
                <h1> Nombre Producto </h1>
                <p> 40 $</p>
            </div>
            <div class="border rounded-md p-3 basis-1/4 shadow-sm  text-center"> 
                
                <img class="rounded-md" src="./assets/jilbab4.webp">
                <h1> Nombre Producto </h1>
                <p> 40 $</p>
            </div>
            <div class="border rounded-md p-3 basis-1/4 shadow-sm  text-center"> 
                <img class="rounded-md" src="./assets/jilbab5.webp">
                <h1> Nombre Producto </h1>
                <p> 40 $</p>
            </div>
            <div class="border rounded-md p-3 basis-1/4 shadow-sm  text-center"> 
                
                <img class="rounded-md" src="./assets/jilbab6.webp">
                <h1> Nombre Producto </h1>
                <p> 40 $</p>
            </div>
            <div class="border rounded-md p-3 basis-1/4 shadow-sm  text-center"> 
                
                <img class="rounded-md" src="./assets/jilbab7.webp">
                <h1> Nombre Producto </h1>
                <p> 40 $</p>
            </div>
            <div class="border rounded-md p-3 basis-1/4 shadow-sm  text-center"> 
                <img class="rounded-md" src="./assets/jilbab8.webp">
                    <h1> Nombre Producto </h1>
                      <p> 40$ </p> 
                    
            </div>
        </div>
    </div>
    <div class="h-52">

    </div>
</template>
