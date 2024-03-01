<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import readXlsxFile from 'read-excel-file'
import Swal from 'sweetalert2'
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';

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
const isLoadingPdf = ref(false)

const isAuthenticate = ref(false)

const sapCode = ref([])

//  DETERMINAR CARACTERISTICAS DEL HABLADOR TAMÑO ETC
const list = ref("")
const sizeTalker = ref("")
const sucur = ref("")

// STATIC VARIBLES
var deleteCode = []
var existDestintCode = []

// API AND PORT
var api = `${window.location.hostname}`;
var portApi = 3001;

// SETTINGS
const headers = [
    { text: 'Código', value: 'Codigo' },
    { text: 'Descripción', value: 'Nombre' }
];

onMounted(async () => {
    // console.log("asjdkjasdj");
    // console.log(location.pathname);
    // agregar nav en caso de que el usuaurio este autenticado
    // SABER LA RUTA DONDE ESTOY
    let route = location.pathname

    // Divide la ruta en segmentos
    let segmentos = route.split('/');

    // console.log(segmentos[1]);

    // saber si estoy en la ruta correspondiente
    if (segmentos[1] === "table-data") {
        isAuthenticate.value = true
        // console.log("dentro de pathnmane");
    } else {
        isAuthenticate.value = false
    }

    const ruta = window.location.pathname;
    const regex = /\/table-data\/(\d+)\/(\d+)\/(\d+)*/;
    const match = ruta.match(regex);

    if (match) {
        list.value = match[1];
        sizeTalker.value = match[2];
        sucur.value = match[3];

        isLoading.value = true
        const response = await axios.get(`http://192.168.21.241:3001/api/v1/products/${list.value}/${sizeTalker.value}/${sucur.value}`);
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
    isLoadingPdf.value = true
    try {
        let datos = { /* tu JSON grande */ };
        fetch(`http://${api}:${portApi}/api/v1/generate-pdf`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: filterExpoListProducts.value,
                list: list.value,
                sizeTalker: sizeTalker.value
            })
        })
            .then(response => response.blob())
            .then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                const fecha = new Date();
                const fechaFormateada = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}_${fecha.getHours().toString().padStart(2, '0')}-${fecha.getMinutes()}`;
                const nombreArchivo = `Hablador-Precio${fechaFormateada}.pdf`;
                a.download = nombreArchivo;
                a.click();
                isLoadingPdf.value = false
            })
            .catch((error) => alert(error));

    } catch (error) {
        console.error(error);
        isLoadingPdf.value = false
    }
}

const fImportXlsx = async (event) => {
    isLoading2.value = true
    try {
        await readXlsxFile(event.target.files[0]).then((rows) => {
            sapCode.value.push(rows)
        })

        // http://${api}:${portApi}/api/v1/send/sap-code1
        fetch(`http://${api}:${portApi}/api/v1/send/sap-code/${list.value}/${sucur.value}/${sizeTalker.value}`, {
            method: 'POST',
            timeout: 120000, // espera hasta 30 segundos
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
                if (data.status != "ok") {
                    // remplazar por sweet alert
                    alert(data.descrip)
                    isLoading2.value = false
                } else {
                    expoListProduct.value = expoListProduct.value.concat(data.data) // expoListProduct listProducts2
                    isLoading2.value = false
                }

            })
            .catch(error => {
                // Handle errors
                alert(error)
            });

        //expoListProduct.value = response.data.data
        //console.log(expoListProduct.value);
    } catch (error) {
       alert(error)
    }
}

var filterListProducts = []
const rightBtn = () => {
    if (expoListProduct.value.length != 0) {
        filterListProducts = listProducts.value.filter(item => selectedProducts.value.includes(item.Codigo));
        // console.log(expoListProduct.value);
        // // GENERRAR ARREGLO DE PRODUCTOS EXISTENTES EN NUESTRA TABLA DESTINO
        expoListProduct.value.map((item) => {
            existDestintCode.push(item.Codigo)
        })
        // console.log(existDestintCode);
        filterListProducts = filterListProducts.filter(item => !existDestintCode.includes(item.Codigo))
        console.log(filterListProducts);
        expoListProduct.value = expoListProduct.value.concat(filterListProducts);
    } else {
        filterListProducts = listProducts.value.filter(item => selectedProducts.value.includes(item.Codigo));
        expoListProduct.value = expoListProduct.value.concat(filterListProducts);
        filterListProducts.length = 0
    }
    filterListProducts.length = 0

    // filterListProducts = listProducts.value.filter(item => selectedProducts.value.includes(item.Codigo));
    // expoListProduct.value = expoListProduct.value.concat(filterListProducts);
}

const deleteBtn = () => {
    const filterListProducts2 = expoListProduct.value.filter(item => selectedExpoProducts.value.includes(item.Codigo));
    filterListProducts2.map((item) => {
        deleteCode.push(item.Codigo)
    })
    expoListProduct.value = expoListProduct.value.filter(item => !deleteCode.includes(item.Codigo));
    deleteCode.length = 0
}

const downloadBtn = async () => {
    const rta = await fetch(`http://${api}:${portApi}/api/v1/download`);
    const blob = await rta.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "alicePdfdasdasdsa.pdf";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}
</script>

<template>
    <Nav v-if="isAuthenticate"></Nav>
    <span v-if="isLoadingPdf" class="loaderPdf"></span>
    <div class="table-container">

        <div>
            <v-text-field v-model="searchTable1" variant="outlined"
                style="width: 600px; height: 20px; margin-left: 0%; margin-bottom: 30px"
                label="Buscar por código o descripción"></v-text-field>
            <v-card class="mx-auto card-select-list" width="600" height="375" color="#000" variant="outlined" elevation="8">
                <v-data-table width="400" height="300" v-model="selectedProducts" :headers="headers" :search="searchTable1"
                    :loading="isLoading" :items="listProducts" item-value="Codigo" show-select
                    no-data-text="No hay datos disponibles" items-per-page-text="Número de filas por página"
                    loading-text="Cargando..." />
            </v-card>
        </div>

        <div display="flex">
            <v-btn class="rightBtn" size="small" variant="outlined" @click="rightBtn">Agregar</v-btn>
            <v-btn class="deleteBtn" size="small" variant="outlined" @click="deleteBtn">Eliminar</v-btn>

        </div>

        <div>
            <v-text-field v-model="searchTable2" variant="outlined"
                style="width: 600px; height: 20px; margin-left: 0px; margin-bottom: 30px"
                label="Buscar por código o descripción"></v-text-field>

            <v-card class="mx-auto card-select-list" width="600" height="375" color="#000" variant="outlined" elevation="8">
                <v-data-table width="400" height="300" v-model="selectedExpoProducts" :search="searchTable2"
                    :headers="headers" :items="expoListProduct" :loading="isLoading2" item-value="Codigo" show-select
                    no-data-text="No hay datos disponibles" items-per-page-text="Número de filas por página"
                    loading-text="Cargando..." />
            </v-card>

            <div class="file-select" id="src-file1">
                <input type="file" name="src-file1" @change="fImportXlsx" aria-label="Archivo">
            </div>
            <v-btn size="small" class="btn-generate-pdf" :disabled="isDisabled" append-icon="mdi-download" color="red"
                width="160" @click="fGeneratePdf">
                Generar .PDF
            </v-btn>
        </div>


    </div>
    <Footer v-if="isAuthenticate"></Footer>
</template>




