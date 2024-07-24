<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import Nav from '@/components/Nav.vue'
import { standardStorePdf, standardStoreXlsx } from "@/composables/export"

const listProducts = ref([]);
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

//  DETERMINAR CARACTERISTICAS DEL HABLADOR TAMÑO ETC
const list = ref("")
const sizeTalker = ref("")
const sucur = ref("")
const promo = ref("")

// STATIC VARIBLES
var deleteCode = []

// API AND PORT
var api = `${window.location.hostname}`;
var portApi = 3003;

// SETTINGS
const headers = [
    { text: 'Código', value: 'Codigo' },
    { text: 'Descripción', value: 'Nombre' }
];

onMounted(async () => {
    // SABER LA RUTA DONDE ESTOY
    let route = location.pathname

    // Divide la ruta en segmentos
    let segmentos = route.split('/');

    // saber si estoy en la ruta correspondiente
    if (segmentos[1] === "table-data") {
        isAuthenticate.value = true
    } else {
        isAuthenticate.value = false
    }

    const ruta = window.location.pathname;
    // const regex = /\/table-data\/(\d+)\/(\d+)\/(\d+)*/;
    const regex = /\/table-data\/(\d+)\/(\d+)\/(\d+)(?:\/(\d+))?/;
    const match = ruta.match(regex);

    if (match) {
        list.value = match[1];
        sizeTalker.value = match[2];
        sucur.value = match[3];
        promo.value = match[4];

        if (promo.value !== "") {
            isLoading.value = true
            const response = await axios.get(`http://${api}:3003/api/v1/products/${list.value}/10/${sucur.value}`);
            listProducts.value = response.data
            // MANERA CORRECTA DE ACCEDER AL VALOR DE LOS COMPONENETES
            isLoading.value = false
            document.body.classList.add("body-white")
        } else {
            isLoading.value = true
            const response = await axios.get(`http://${api}:3003/api/v1/products/${list.value}/${sizeTalker.value}/${sucur.value}`);
            listProducts.value = response.data
            // MANERA CORRECTA DE ACCEDER AL VALOR DE LOS COMPONENETES
            isLoading.value = false
            document.body.classList.add("body-white")
        }

    } else {
        console.error("La ruta no coincide con el patrón esperado.");
    }
})

watch(() => {
    // SECOND PRODUCT TABLE
    filterExpoListProducts.value = expoListProduct.value.filter(item => selectedExpoProducts.value.includes(item.Codigo));
    if (filterExpoListProducts.value.length > 0) {
        isDisabled.value = false
    } else {
        isDisabled.value = true
    }
})

// LOCAL FUNCTION
const exportPdf = async () => {
    let data = filterExpoListProducts.value
    let list1 = list.value
    let size = sizeTalker.value
    let promo1 = promo.value

    isLoadingPdf.value = true
    await standardStorePdf(api, portApi, data, list1, size, promo1)
    isLoadingPdf.value = false
}

const exportXlsx = async (event) => {
    let data = expoListProduct.value
    let list1 = list.value
    let size = sizeTalker.value
    let sucur1 = sucur.value

    isLoading2.value = true
    const response = await standardStoreXlsx(api, portApi, event, data, list1, sucur1, size)
    expoListProduct.value = response
    isLoading2.value = false
}

var filterListProducts = []

const rightBtn = () => {
    filterListProducts = listProducts.value.filter(item => selectedProducts.value.includes(item.Codigo));
    expoListProduct.value = expoListProduct.value.concat(filterListProducts);

    // una vez los elementos sean enviados a la segunda tabla (TABLA PARA EXPORTAR A UN EXCEL)
    selectedProducts.value = []
}

const deleteBtn = () => {
    const filterListProducts2 = expoListProduct.value.filter(item => selectedExpoProducts.value.includes(item.Codigo));
    filterListProducts2.map((item) => {
        deleteCode.push(item.Codigo)
    })
    expoListProduct.value = expoListProduct.value.filter(item => !deleteCode.includes(item.Codigo));
    deleteCode.length = 0
}
</script>

<template>
    <Nav v-if="isAuthenticate"></Nav>
    <span v-if="isLoadingPdf" class="loaderPdf"></span>
    <div class="table-container">
        <div>
            <v-text-field v-model="searchTable1" variant="solo-filled"
                style="width: 600px; height: 20px; margin-left: 0%; margin-bottom: 30px"
                label="Buscar por código o descripción"></v-text-field>
            <v-card class="mx-auto card-select-list" width="600" height="375" color="#000" variant="solo-filled"
                elevation="8">
                <v-data-table width="400" height="300" v-model="selectedProducts" :headers="headers"
                    :search="searchTable1" :loading="isLoading" :items="listProducts" item-value="Codigo" show-select
                    no-data-text="No hay datos disponibles" items-per-page-text="Número de filas por página"
                    loading-text="Cargando..." />
            </v-card>
        </div>

        <div>
            <v-btn class="rightBtn" size="small" variant="outlined" @click="rightBtn">Agregar</v-btn>
            <v-btn class="deleteBtn" size="small" variant="outlined" @click="deleteBtn">Eliminar</v-btn>
        </div>

        <div>
            <v-text-field v-model="searchTable2" variant="solo-filled"
                style="width: 600px; height: 20px; margin-left: 0px; margin-bottom: 30px"
                label="Buscar por código o descripción"></v-text-field>

            <v-card class="mx-auto card-select-list" width="600" height="375" color="#000" variant="solo-filled"
                elevation="8">
                <v-data-table width="400" height="300" v-model="selectedExpoProducts" :search="searchTable2"
                    :headers="headers" :items="expoListProduct" :loading="isLoading2" item-value="Codigo" show-select
                    no-data-text="No hay datos disponibles" items-per-page-text="Número de filas por página"
                    loading-text="Cargando..." />
            </v-card>

            <div class="file-select" id="src-file1">
                <input type="file" name="src-file1" @change="exportXlsx" aria-label="Archivo">
            </div>

            <v-btn size="small" class="btn-generate-pdf" :disabled="isDisabled" append-icon="mdi-download" color="red"
                width="160" @click="exportPdf">
                Generar .PDF
            </v-btn>
        </div>

    </div>
</template>

<style scoped>
.rightBtn,
.deleteBtn {
    display: block;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
}
</style>
