<script setup>
import { ref  } from 'vue';
const selected = ref([]);

const props = defineProps({
    dataTable1: {
        type: Array,
        required: true
    }
})

const headers = [
    {
        title: "Nombre",
        value: 'name',
        sortable: true,
        width: '100px',
    },
    {
        title: "Location",
        value: 'location',
        sortable: true,
        width: '200px',
    }
];

// watch(() => {
//     console.log(selected.value);
// })
</script>

<template>
    <v-data-table 
        v-model="selected" 
        :headers="headers" 
        :items="dataTable1" item-value="name" 
        show-select>
    </v-data-table>
</template>


  
