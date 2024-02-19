<script setup>
import {ref, onMounted, watch} from 'vue'
import {uid} from 'uid'
import Header from './components/Header.vue'
import ProductoGaleria from './components/ProductoGaleria.vue';
import {db} from './data/productos';

  const productos = ref([]);
  const carrito = ref([]);

  onMounted( () => {
    productos.value=db

    const carritoStorage = localStorage.getItem('carrito')
    if(carritoStorage) carrito.value = JSON.parse(carritoStorage)
  })
  
  watch(carrito, () => {
    guardarLocalStorage()
  },{
    deep:true // Entrara a todos los attr del carrito para ver cuando cambien
  })

  const guardarLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito.value))
  }

  const agregarProductoCarrito = (productoOriginal, talla) => {
    const existeCarrito = carrito.value.findIndex(productoC => productoC.id === productoOriginal.id && productoC.talla === talla);
    if (existeCarrito >= 0) {
        // Producto ya existe en el carrito con la misma talla, incrementamos la cantidad
        carrito.value[existeCarrito].cantidad++;
        console.log("Producto ya en el carrito, sumamos +1 a la cantidad de " + productoOriginal.nombre);
    } else {
        // Creamos un nuevo objeto producto para evitar la mutación del objeto original
        const nuevoProducto = {
            ...productoOriginal, // Copiamos todas las propiedades del producto original
            cantidad: 1, // Establecemos la cantidad inicial
            id: uid(), // Generamos un nuevo ID único
            talla: talla // Establecemos la nueva talla
        };
        carrito.value.push(nuevoProducto); // Añadimos el nuevo producto al carrito
        console.log(`Añadimos producto ${nuevoProducto.nombre} al carrito con talla ${nuevoProducto.talla}`);
    }
  };

  // Metodos del carrito que provienen del HEADER
  const incrementarCantidadProducto = (id) => {
    const index = carrito.value.findIndex(producto => producto.id === id)
    if(carrito.value[index].cantidad > 4) return
    carrito.value[index].cantidad++
  }

  const decrementarCantidadProducto = (id) => {
    const index = carrito.value.findIndex(producto => producto.id === id)
    if(carrito.value[index].cantidad <= 1 ){
      eliminarProductoCarrito(id)
      return
    }
    carrito.value[index].cantidad--
  }

  const vaciarCarrito = () => {
    carrito.value=[];
  }

  const eliminarProductoCarrito = (id) => {
    carrito.value = carrito.value.filter(producto => producto.id != id)
  }

</script>

<template>
    <Header
      :carrito="carrito"
      @incrementar-cantidad-producto="incrementarCantidadProducto"
      @decrementar-cantidad-producto ="decrementarCantidadProducto"
      @vaciar-carrito="vaciarCarrito"
      @eliminar-producto-carrito="eliminarProductoCarrito"
    > </Header>
    <div class="grid grid-cols-[15%_auto] text-start px-4 my-10 gap-6 relative pt-20">
        <div class="rounded-md self-start sticky top-4 pt-16">
            <ul class="py-4 px-5 text-center divide-y-4 divide-gray-100 divide-" role="list">
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
          v-bind:producto="producto"
          @agregar-producto-carrito="agregarProductoCarrito"/>
      </div>
    </div>
    
    <div class="h-52">

    </div>
</template>
