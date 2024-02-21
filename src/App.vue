<script setup>
import {ref, onMounted, watch} from 'vue'
import {uid} from 'uid'
import {db} from './data/productos';

import Header from './components/Header.vue';
import Header2 from './components/Header2.vue';
import ProductoGaleria from './components/ProductoGaleria.vue';
import Footer from './components/Footer.vue';

  const productos = ref([]);
  const carrito = ref([]);
  let nuevoProducto = {}

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

  const agregarProductoCarrito = (producto, talla) => {
    const existeCarrito = carrito.value.findIndex(productoC => productoC.id === producto.id);
    if (existeCarrito >= 0) {
        // Producto ya existe en el carrito
        //Vemos si el producto del carrito tiene la misma talla o no
        if(carrito.value[existeCarrito].talla !== talla){
            nuevoProducto = {
              ...producto, // Copiamos todas las propiedades del producto 
              cantidad: 1, // Establecemos la cantidad inicial
              id: uid(), // Generamos un nuevo ID único
              talla: talla // Establecemos la nueva talla
          };
          carrito.value.push(nuevoProducto);
        } else{
          // Es la misma talla, incrementamos cantidad
          carrito.value[existeCarrito].cantidad++;
          console.log("Producto ya en el carrito, sumamos +1 a la cantidad de " + producto.nombre);
        }
        
    } else {
        // Creamos nuevo producto en el carrito
        producto.cantidad = 1;
        producto.id = uid();
        producto.talla=talla;
        carrito.value.push(producto)// Añadimos el nuevo producto al carrito
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
    <Header2
      :carrito="carrito"
      @incrementar-cantidad-producto="incrementarCantidadProducto"
      @decrementar-cantidad-producto ="decrementarCantidadProducto"
      @vaciar-carrito="vaciarCarrito"
      @eliminar-producto-carrito="eliminarProductoCarrito"
    > </Header2>
    
    <div
      class="grid  text-start px-2 py-20 my-2 gap-2">
        <!-- Para hacer una columna de 10% y la otra auto: md:grid-cols-[10%_auto]-->
  
        <div class="grid sm:grid-cols-1 md:grid-cols-3  gap-10 content-start snap-y mx-6">
          <ProductoGaleria
            v-for="producto in productos"
            v-bind:producto="producto"
            @agregar-producto-carrito="agregarProductoCarrito"/>
        </div>

    </div>

    <div class="h-20">

    </div>
    <Footer> </Footer>
</template>
