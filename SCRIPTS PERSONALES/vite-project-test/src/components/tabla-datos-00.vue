<script setup>
import { onMounted, ref } from 'vue';

const cantidad_registros = 10;
const productos = ref([]);

for (let i = 0; i < cantidad_registros; i++) {
  const maestro = {
    codigo: i,
    descripcion: `computadora de escritorio`,
    precio_sin_iva: 96.1,
    almacen: "alm-g",
  };
  productos.value.push(maestro);
} 
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Codigo</th>
        <th>Descripción</th>
        <th>Precio</th>
        <th>Almacen</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="producto in productos" :key="producto.codigo">
        <td>{{ producto.codigo }}</td>
        <td>{{ producto.descripcion }}</td>
        <td>{{ producto.precio_sin_iva }}</td>
        <td>{{ producto.almacen }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
th,
td {
  border: 1px solid black;
}
</style>
