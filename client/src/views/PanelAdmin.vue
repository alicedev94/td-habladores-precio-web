<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import readXlsxFile from 'read-excel-file'
import Swal from 'sweetalert2'

const listProducts = ref([]);
const listProducts2 = ref([]);
const expoListProduct = ref([]);
const selectedProducts = ref([]);
const selectedExpoProducts = ref([]);

const filterExpoListProducts = ref();

const searchTable1 = ref("")
const searchTable2 = ref("")
const isDisabled = ref(true)
const isLoading = ref(false)
const isLoading2 = ref(false)

const sapCode = ref([])


// SETTINGS
const headers = [
    { text: 'Código', value: 'Codigo' },
    { text: 'Descripción', value: 'Nombre' }
];

onMounted(async () => {
    isLoading.value = true
    const response = await axios.get(`http://localhost:3001/api/v1/products`);
    listProducts.value = response.data
    isLoading.value = false
    document.body.classList.add("body-white")
})

watch(() => {
    // FISRT PRODUCT TABLE
    // const filterListProducts = listProducts.value.filter(item => selectedProducts.value.includes(item.Codigo));
    // expoListProduct.value = filterListProducts

    // SECOND PRODUCT TABLE
    filterExpoListProducts.value = expoListProduct.value.filter(item => selectedExpoProducts.value.includes(item.Codigo));
    if (filterExpoListProducts.value.length > 0) {
        isDisabled.value = false
    } else {
        isDisabled.value = true
    }

    //expoListProduct.value = dataprueba
})

// LOCAL FUNCTION
const fGeneratePdf = async () => {
    try {
        const response = await axios.post(`http://localhost:3001/api/v1/generate-pdf`, filterExpoListProducts.value);
        if (response.data.value) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Operación Exitosa!",
                showConfirmButton: false,
                timer: 2000
            });
        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Algo salio mal!",
                showConfirmButton: false,
                timer: 2000
            });
        }
    } catch (error) {
        console.error(error);
    }
}

const fImportXlsx = async (event) => {
    isLoading2.value = true
    try {
        await readXlsxFile(event.target.files[0]).then((rows) => {
            sapCode.value.push(rows)
        })

        // http://localhost:3001/api/v1/send/sap-code1
        fetch('http://localhost:3001/api/v1/send/sap-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // For sending JSON data
            },
            body: JSON.stringify({
                sapCode: sapCode.value
            })
        })
            .then(response => response.json())
            .then(data => {
                // Handle successful response
                console.log('Post created successfully:', data);
                expoListProduct.value = data // expoListProduct listProducts2
                isLoading2.value = false
            })
            .catch(error => {
                // Handle errors
                console.error(error);
            });

        //expoListProduct.value = response.data.data
        //console.log(expoListProduct.value);
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <v-card class="mx-auto card-select-list" width="600" height="400" color="#000" variant="outlined" elevation="8">
        <v-data-table width="400" height="300" v-model="selectedProducts" :headers="headers" :search="searchTable1"
                :loading="isLoading" :items="listProducts" item-value="Codigo" show-select
                no-data-text="No hay datos disponibles" items-per-page-text="Número de filas por página"
                loading-text="Cargando..." />
    </v-card>
</template>




