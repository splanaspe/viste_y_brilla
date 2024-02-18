<script setup>
    import {ref, defineEmits} from 'vue'

    const props = defineProps({
        producto:{
            type: Object,
            required: true
        }
    })

    const talla = ref('');
    const mostrarAlerta=ref(false)

    // const emit = defineEmits(['agregar-producto-carrito']);
    
    const modificarTalla = (tallaSeleccionada) => {
        if (talla.value === tallaSeleccionada) talla.value = '';
        else talla.value = tallaSeleccionada;
    };

    const agregarCarrito = () => {
        if (talla.value === '') {
            //Muestra la alerta
            mostrarAlerta.value = true;
            // Oculta la alerta después de 2 segundos
            setTimeout(() => {
            mostrarAlerta.value = false;
            }, 2000);
        } else {
            // Lógica para agregar el producto al carrito
            emit('agregar-producto-carrito')
        }
    };

</script>
<template>
    <div class="rounded-md p-3 basis-1/4 shadow-md text-center relative"> 
        <img class="rounded-md" :src='"src/assets/"+producto.imagen'>
        <h1 class="text-xl font-bold text-purple-800 my-2"> {{ producto.nombre }}</h1>
        <p class="text-lg"> {{ producto.precio }} $</p>
        
        <div class="flex gap-2 justify-center items-center my-3 relative">
            <div 
                :class=" talla=='S' ? 'border-black' : 'border-white'"
                class="p-2 border-2 hover:border-black rounded-full"
                @click="modificarTalla('S')"    
            >
                <p> S </p>
            </div>
            <div 
                :class=" talla=='M' ? 'border-black' : 'border-white'"
                class="p-2 border-2 hover:border-black rounded-full" 
                @click="modificarTalla('M')">
                <p> M </p>
            </div>
            <div
                :class=" talla=='L' ? 'border-black' : 'border-white'"
                class="p-2 border-2 hover:border-black rounded-full"
                @click="modificarTalla('L')">
                <p> L </p>
            </div>
            <div
                :class=" talla=='XL' ? ' border-black' : 'border-white'"
                class="p-2 border-2 hover:border-black rounded-full"
                @click="modificarTalla('XL')">
                <p> XL </p>
            </div>
            <div 
                :class=" talla=='XXL' ? ' border-black' : 'border-white'"
                class="p-2 border-2 hover:border-black rounded-full"
                @click="modificarTalla('XXL')">
                <p> XXL </p>
            </div>
        </div>
        <button
            class="bg-orange-200 text-black-700 p-2 mx-2 rounded-md  my-2 hover:cursor-pointer hover:scale-110 transition-transform duration-100"
            @click="agregarCarrito"> 
            <p> Añadir Carrito </p>  
        </button>
        <div v-if="mostrarAlerta" class="fixed right-4 bottom-4 z-50 bg-red-500 text-white p-4 rounded-md">
            Debe escoger una talla para agregar el producto.
        </div>
    </div>
</template>