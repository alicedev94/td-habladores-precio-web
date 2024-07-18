<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import readXlsxFile from 'read-excel-file'
import Nav from '@/components/Nav.vue';

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

const sapCode = ref([])

//  DETERMINAR CARACTERISTICAS DEL HABLADOR TAMÑO ETC
const list = ref("")
const sizeTalker = ref("")

// cdd 
const rack = ref('')
const galpon = ref('')

// STATIC VARIBLES
var deleteCode = []
var local_server = "localhost" // local
// var local_server = "192.168.161.38" // local
// var local_server = "192.168.21.241" // product

// API AND PORT
var api = `${window.location.hostname}`;
var portApi = 3003;

// SETTINGS
const headers = [
    { text: 'Código', value: 'Codigo' },
    { text: 'Descripción', value: 'Nombre' }
];

onMounted(async () => {
    try {
        isLoading.value = true;
        await busquedaIncial()
        isLoading.value = false;
        const { data } = await axios.get(`http://${api}:${portApi}/api/v1/tabla-data-cdd`);

        // -
        for (const obj of data) {
            obj.Cantidad = rack.value;
            obj.galpon = galpon.value;
        }// AGREGAMOS LA CANTIDAD SELECCIONADA EN EL INPUT EN CASO DE QUE SEA MANUAL.

        listProducts.value = data;
    } catch (error) {
        alert(error);
    }
})

watch(() => {
    // SECOND PRODUCT TABLE
    filterExpoListProducts.value = expoListProduct.value.filter(item => selectedExpoProducts.value.includes(item.Codigo)); if (filterExpoListProducts.value.length > 0) {

        isDisabled.value = false
    } else {
        isDisabled.value = true
    }
})

const busquedaIncial = async () => {
    // SABER LA RUTA DONDE ESTOY
    let route = location.pathname

    // Divide la ruta en segmentos
    let segmentos = route.split('/');

    //saber si estoy en la ruta correspondiente
    if (segmentos[1] === "table-data-cdd") {
        isAuthenticate.value = true
    } else {
        isAuthenticate.value = false
    }

    const ruta = window.location.pathname;
    const regex = /\/table-data-cdd\/(\d+)\/(\d+)\/(\d+)*/;
    const match = ruta.match(regex);

    if (match) {
        rack.value = match[1];
        galpon.value = match[2];
        sizeTalker.value = match[3];
    } else {
        console.error("La ruta no coincide con el patrón esperado.");
    }
}

// LOCAL FUNCTION
const fGeneratePdf = async () => {
    isLoadingPdf.value = true
    try {
        fetch(`http://${api}:${portApi}/api/v1/gene-cdd/${rack.value}/${galpon.value}`, {
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
        sapCode.value = []
        await readXlsxFile(event.target.files[0]).then((rows) => {
            sapCode.value.push(rows)
        })

        fetch(`http://${api}:${portApi}/api/v1/send/sap-code-cdd`, {
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
                if (data.status != "ok") {
                    alert(data.descrip)
                    isLoading2.value = false
                } else {
                    expoListProduct.value = expoListProduct.value.concat(data.data) // expoListProduct listProducts2
                    isLoading2.value = false
                }

            })
            .catch(error => {
                alert(error)
            });
    } catch (error) {
        alert(error)
    }
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
    <Nav></Nav>
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
