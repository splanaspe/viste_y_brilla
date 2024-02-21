<script setup>
    import {ref, defineEmits} from 'vue'

    const props = defineProps({
        producto:{
            type: Object,
            required: true
        }
    })

    const talla = ref('');
    const mostrarAlertaRoja=ref(false)
    const mostrarAlertaVerde=ref(false)
    
    const emit = defineEmits(['agregar-producto-carrito']);
    
    const modificarTalla = (tallaSeleccionada) => {
        if (talla.value === tallaSeleccionada) talla.value = '';
        else talla.value = tallaSeleccionada;
    };

    const agregarCarrito = () => {
        if (talla.value === '') {
            //Muestra la alerta
            mostrarAlertaRoja.value = true;
            mostrarAlertaVerde.value= false;
            
            // Oculta la alerta después de 2 segundos
            setTimeout(() => {
            mostrarAlertaRoja.value = false;
            }, 2000);
            
        } else {
            // Lógica para agregar el producto al carrito
            mostrarAlertaVerde.value = true;
            mostrarAlertaRoja.value=false;
            
            // Oculta la alerta después de 2 segundos
            setTimeout(() => {
                mostrarAlertaVerde.value = false;
            }, 2000);
            
            emit('agregar-producto-carrito', props.producto, talla.value)
            talla.value=""
        }
    };

</script>
<template>

    <div class="rounded-md sm:p-1 md:p-3 basis-1/4 shadow-md text-center relative" > 
        <img class="rounded-md items-start " :src='"src/assets/"+producto.imagen'>
        <h1 class="md:text-xl sm:text-md font-bold text-purple-800 my-2 hover:underline hover:cursor-pointer"> {{ producto.nombre }}</h1>
        <p class="md:text-lg sm:text-sm"> {{ producto.precio }} $</p>

        <div class="flex gap-1 justify-center items-center sm:my-1 md:my-3 relative">
            <div 
                :class=" talla=='S' ? 'border-black' : 'border-white'"
                class="p-2 border-2 hover:border-black rounded-full"
                @click="modificarTalla('S')"    
            >
                <p> S </p>
            </div>
            <div 
                :class=" talla=='M' ? 'border-black' : 'border-white'"
                class="p-2 border-2 hover:border-black rounded-full hover:cursor-pointer" 
                @click="modificarTalla('M')">
                <p> M </p>
            </div>
            <div
                :class=" talla=='L' ? 'border-black' : 'border-white'"
                class="p-2 border-2 hover:border-black rounded-full hover:cursor-pointer"
                @click="modificarTalla('L')">
                <p> L </p>
            </div>
            <div
                :class=" talla=='XL' ? ' border-black' : 'border-white'"
                class="p-2 border-2 hover:border-black rounded-full hover:cursor-pointer"
                @click="modificarTalla('XL')">
                <p> XL </p>
            </div>
            <div 
                :class=" talla=='XXL' ? ' border-black' : 'border-white'"
                class="p-2 border-2 hover:border-black rounded-full hover:cursor-pointer"
                @click="modificarTalla('XXL')">
                <p> XXL </p>
            </div>
        </div>
        <button
            :class="{ 'bg-orange-300 hover:cursor-pointer hover:scale-110 transition-transform duration-100': talla !== '', 'bg-orange-100': talla === '' }"

            class="text-black-700 p-2 mx-2 rounded-md  my-2"
            @click="agregarCarrito"> 
            <p> Añadir Carrito </p>  
        </button>
        <div v-if="mostrarAlertaRoja" class="fixed right-4 bottom-4 z-50 bg-red-500 text-white p-4 rounded-md">
            Debe escoger una talla para agregar el producto
        </div>
        <div v-if="mostrarAlertaVerde" class="fixed right-4 bottom-4 z-50 bg-green-500 text-white p-4 rounded-md">
            Producto añadido correctamente al carrito
        </div>
    </div>

</template>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>