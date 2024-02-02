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

//  DETERMINAR CARACTERISTICAS DEL HABLADOR TAMÑO ETC
const list = ref("")
const sizeTalker = ref("")


// SETTINGS
const headers = [
    { text: 'Código', value: 'Codigo' },
    { text: 'Descripción', value: 'Nombre' }
];

onMounted(async () => {
    // const ruta = location.pathname;
    // //const regex = /\/(\d+)\/(\d+)$/;
    // const regex = /(?:\/(\d+)){3}\/$/; 
    // const match = ruta.match(regex);
    // list.value = match[1];
    // sizeTalker.value = match[2];
    // console.log(match[3]);
    // isLoading.value = true
    // const response = await axios.get(`http://localhost:3001/api/v1/products/${list.value}/${sizeTalker.value}`);
    // listProducts.value = response.data
    // isLoading.value = false
    // document.body.classList.add("body-white")

    const ruta = window.location.pathname;
    const regex = /\/table-data\/(\d+)\/(\d+)\/(\d+)*/;
    const match = ruta.match(regex);

    if (match) {
        list.value = match[1];
        sizeTalker.value = match[2];
        const sucur = match[3];

        isLoading.value = true
        const response = await axios.get(`http://localhost:3001/api/v1/products/${list.value}/${sizeTalker.value}/${sucur}`);
        listProducts.value = response.data
        isLoading.value = false
        document.body.classList.add("body-white")

    } else {
        console.error("La ruta no coincide con el patrón esperado.");
    }
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
        const response = await axios.post(`http://localhost:3001/api/v1/generate-pdf`, {
            data: filterExpoListProducts.value,
            list: list.value,
            sizeTalker: sizeTalker.value
        });
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

const rightBtn = () => {
    const filterListProducts = listProducts.value.filter(item => selectedProducts.value.includes(item.Codigo));
    expoListProduct.value = filterListProducts
}
</script>

<template>
    <div class="table-container">

        <div>
            <v-text-field v-model="searchTable1" variant="outlined"
                style="width: 600px; height: 20px; margin-left: 0%; margin-bottom: 30px"
                label="Buscar por código o descripción"></v-text-field>
            <v-card class="mx-auto card-select-list" width="600" height="400" color="#000" variant="outlined" elevation="8">
                <v-data-table width="400" height="300" v-model="selectedProducts" :headers="headers" :search="searchTable1"
                    :loading="isLoading" :items="listProducts" item-value="Codigo" show-select
                    no-data-text="No hay datos disponibles" items-per-page-text="Número de filas por página"
                    loading-text="Cargando..." />
            </v-card>
        </div>

        <v-btn class="rightBtn" size="small" variant="outlined" @click="rightBtn">derecha</v-btn>

        <div>
            <v-text-field v-model="searchTable2" variant="outlined"
                style="width: 600px; height: 20px; margin-left: 0px; margin-bottom: 30px"
                label="Buscar por código o descripción"></v-text-field>

            <v-card class="mx-auto card-select-list" width="600" height="400" color="#000" variant="outlined" elevation="8">
                <v-data-table width="400" height="300" v-model="selectedExpoProducts" :search="searchTable2"
                    :headers="headers" :items="expoListProduct" :loading="isLoading2" item-value="Codigo" show-select
                    no-data-text="No hay datos disponibles" items-per-page-text="Número de filas por página"
                    loading-text="Cargando..." />
                <div class="file-select" id="src-file1">
                    <input type="file" name="src-file1" @change="fImportXlsx" aria-label="Archivo">
                </div>
                <v-btn size="small" class="btn-generate-pdf" :disabled="isDisabled" append-icon="mdi-download" color="red"
                    width="160" @click="fGeneratePdf">
                    Generar .PDF
                </v-btn>
            </v-card>
        </div>

    </div>
</template>




