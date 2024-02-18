<script setup>
import {ref, onMounted} from 'vue'
import Header from './components/Header.vue'
import ProductoGaleria from './components/ProductoGaleria.vue';
import {db} from './data/productos';

  const productos = ref([]);

  onMounted( () => {
    productos.value=db
  })
  console.log(productos)

</script>

<template>
    <Header> </Header>
    <div class="grid grid-cols-[15%_auto] text-start px-4 my-10 gap-6 relative">
        <div class="rounded-md self-start sticky top-4">
            <ul class="py-4 px-5 text-center">
                <li class="my-1 text-2xl cursor-pointer text-lg text-purple-800 hover:underline-offset-4 hover:underline ">  Jilbabs </li>
                <li class="my-1 text-2xl cursor-pointer text-lg text-purple-800 hover:underline-offset-4 hover:underline "> Hijabs  </li>
                <li class="my-1 text-2xl cursor-pointer text-lg text-purple-800 hover:underline-offset-4 hover:underline "> Abayas  </li>
                <li class="my-1 text-2xl cursor-pointer text-lg text-purple-800 hover:underline-offset-4 hover:underline "> Bolsos  </li>
                <li class="my-1 text-2xl cursor-pointer text-lg text-purple-800 hover:underline-offset-4 hover:underline ">  Accesorios </li>
            </ul>
            
        </div>
        <div class="grid grid-cols-3 gap-6 content-start snap-y ">
        <ProductoGaleria
          v-for="producto in productos"
          v-bind:producto="producto" />
      </div>
    </div>
    
    <div class="h-52">

    </div>
</template>
