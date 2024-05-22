<script setup>
import { watch, onMounted, ref } from 'vue'
import axios from 'axios'

const inputBuscador = ref("")
const productos = ref([])
let productosOriginales;

// Agregamos la variable de estado para el control de la paginación
const paginaActual = ref(1)
const elementosPorPagina = ref(10)

// FUNCIONES LOCALES DE LA TABLA
const obtenerProductos = async () => {
    const { data } = await axios.get('http://localhost:3000/api/dato')
    productos.value = data;
    productosOriginales = data;
}

const buscadorProductos = () => {
    if (inputBuscador.value.length === 0) {
        productos.value = productosOriginales;
    } else {
        productos.value = productosOriginales.filter((producto) =>
            producto.product.Codigo.toLocaleLowerCase().
                includes(inputBuscador.value.toLocaleLowerCase()));
    }
}

// Función para cambiar la página
const cambiarPagina = (numPagina) => {
    paginaActual.value = numPagina
}

// ESTA FUNCION SE EJECUTA AL RECARGAR LA PAGINA.
onMounted(async () => {
    await obtenerProductos();
})

// ESTA FUNCION SE EJECUTA CADA VEZ QUE EL ELEMENTO ASIGNADO (inputBuscador) EN ESTE CASO, CAMBIA SU VALOR.
watch(inputBuscador, () => {
    buscadorProductos();
})
</script>

<template>
    <!-- ENTRADA BUSCADOR -->
    <div class="contenedor-buscador">
        <input class="buscador" type="text" placeholder="Barra de busqueda..." v-model="inputBuscador">
    </div>

    <!-- TABLA DATOS -->
    <table class="estilos-tabla">
        <thead>
            <tr>
                <th>Producto</th>
                <th>Detalle</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="producto in productos.slice((paginaActual - 1) * elementosPorPagina, paginaActual * elementosPorPagina)"
                :key="producto.codigo">
                <td>{{ producto.product.Codigo }} - {{ producto.product.Nombre }}</td>
                <td>
                    <ul>
                        <li v-for="detalle in producto.details">
                            {{ detalle.Codigo }} - {{ detalle.Nombre }}
                        </li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>

    <!-- PAGINACION -->
    <div class="paginacion">
        <button v-for="pagina in Math.ceil(productos.length / elementosPorPagina)" :key="pagina"
            @click="cambiarPagina(pagina)">
            {{ pagina }}
        </button>
    </div>
</template>

<style scoped>
/* ESTILOS DE LA TABLA  */
.estilos-tabla {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9em;
    font-family: sans-serif;
    text-align: left;
}

.estilos-tabla thead tr {
    background-color: #42b883;
    color: #ffffff;
    text-align: left;
}

.estilos-tabla th,
.estilos-tabla td {
    padding: 12px 15px;
}

.estilos-tabla tbody tr {
    border-bottom: 1px solid #dddddd;
}

.estilos-tabla tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.estilos-tabla tbody tr:last-of-type {
    border-bottom: 2px solid #35495e;
}

.estilos-tabla ul {
    list-style-type: none;
    padding: 0;
}

/* ESTILOS PARA LA ENTRADA DE TEXTO DEL BUSCADOR  */
.contenedor-buscador {
    display: flex;
    align-items: flex-start;
}

.buscador {
    width: 20rem;
    height: 2rem;
    border-color: var(--verde-vue);
    margin-bottom: 0.2rem;
}

/* ESTILOS PARA LA PAGINACION */
.paginacion {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}

.paginacion button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    background-color: #42b883;
    color: #ffffff;
    cursor: pointer;
}

.paginacion button:hover {
    background-color: #35495e;
}
</style>
