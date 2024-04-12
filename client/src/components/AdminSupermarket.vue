<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

const listProducts = ref([])
const listProducts2 = ref([])
const expoListProduct = ref([])
const selectedProducts = ref([])
const selectedExpoProducts = ref([])
const filterExpoListProducts = ref()
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
var local_server = "localhost" // local

// SETTINGS
const headers = [
    { text: 'Código', value: 'Codigo' },
    { text: 'Descripción', value: 'Nombre' }
];

// functions 
onMounted(() => {
    qExample();
})

const qExample = async () => {
    const response = await axios.get(`https://fakestoreapi.com/products/1`);
    let { data } = response;
    console.log(data);
    // return 
}

</script>

<template>
    <Nav></Nav>   <!--v-if="isAuthenticate" -->
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
                <input type="file" name="src-file1" @change="fImportXlsx" aria-label="Archivo">
            </div>
            <v-btn size="small" class="btn-generate-pdf" :disabled="isDisabled" append-icon="mdi-download" color="red"
                width="160" @click="fGeneratePdf">
                Generar .PDF
            </v-btn>
        </div>


    </div>
    <!--<Footer v-if="isAuthenticate"></Footer>-->
</template>

<style scoped>
.rightBtn,
.deleteBtn {
    display: block;
    /* Asegura que los botones ocupen todo el ancho disponible */
    margin-bottom: 10px;
    /* Espacio entre los botones */
}
</style>
