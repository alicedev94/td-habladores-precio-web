<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import axios from 'axios'
import readXlsxFile from 'read-excel-file'
import Nav from './Nav.vue';
import GreenjsTable from './GreenjsTable.vue';

const listProducts = ref([])
const listProducts2 = ref([])
const expoListProduct = ref([])
const selectedProducts = ref([])
const selectedExpoProducts = ref([])
const filterExpoListProducts = ref()
const searchTable1 = ref("")
const searchTable2 = ref("")
const isDisabled = ref(false)
const isLoading = ref(false)
const isLoading2 = ref(false)
const isLoadingPdf = ref(false)
const isAuthenticate = ref(false)
const sapCode = ref([])
const armaCombo = ref([])

//  DETERMINAR CARACTERISTICAS DEL HABLADOR TAMÑO ETC
const list = ref("")
const sizeTalker = ref("")
const typeTalker = ref("")
const sucur = ref("")

// STATIC VARIBLES
var deleteCode = []
var existDestintCode = []
var local_server = "localhost" // local

// API AND PORT
var api = `${window.location.hostname}`;
var portApi = 3001;

// SETTINGS
const headers = [
    { text: 'Código', value: 'Codigo' },
    { text: 'Descripción', value: 'Nombre' }
];

// functions 
const busquedaIncial = async () => {
    // SABER LA RUTA DONDE ESTOY
    let route = location.pathname

    // Divide la ruta en segmentos
    let segmentos = route.split('/');

    // console.log(segmentos[1]);

    //saber si estoy en la ruta correspondiente
    if (segmentos[1] === "table-data-supermarke-combot") {
        isAuthenticate.value = true
        //console.log("dentro de pathnmane");
    } else {
        isAuthenticate.value = false
    }

    const ruta = window.location.pathname;
    const regex = /\/table-data-supermarket-combo\/(\d+)\/(\d+)\/(\d+)\/(\d+)*/;
    const match = ruta.match(regex);

    if (match) {
        list.value = match[1];
        sizeTalker.value = match[2];
        typeTalker.value = match[3];
        sucur.value = match[4];

        isLoading.value = true
        const response = await axios.get(`http://${local_server}:3001/api/v1/gene-supermarket/${list.value}/${sizeTalker.value}/${typeTalker.value}/${sucur.value}`);
        listProducts.value = response.data
        isLoading.value = false
        document.body.classList.add("body-white")
    } else {
        console.error("La ruta no coincide con el patrón esperado.");
    }
}

const filterListProducts = ref([])
const rightBtn = async () => {
    // lista de todos los articulos 
    // console.log(listProducts.value);

    // proceso para obtener solo lo seleccionado antes de darle siguiente 
    filterListProducts.value = listProducts.value.filter(item => selectedProducts.value.includes(item.Codigo));
    expoListProduct.value = expoListProduct.value.concat(filterListProducts.value);

    // lista depurada con lo seleccionado

    // NOTA: En este evento el app tiene que buscar en la misma tabla los que tengan relacion 1 con 1.1
    // 1 ACA LA DATA DE LA CABECERA POR CODIGO INDIVIDUAL (CABECERA) # PAN_DULCE
    // console.log(filterListProducts); // ESTO ME GENERA UN ARRAY DE OBJETOS CON TODOS LOS CAMPOS NECESARIOS

    let promises = filterListProducts.value.map(async (obj) => {

        let data = await axios.post(`http://${local_server}:3001/api/v1/arma-combo`, {
            codigo_relaclion: obj.Codigo_relacion // ESTO DEPENDE  DEL VALOR QUE TENGAS NUESTROS ARCHIVOS

        });
        // AGREGAR DATOS COMO EL PRECIO 
        data.data.Cabecera = obj; // `${obj.Codigo} ${obj.Nombre}`
     
        armaCombo.value.push(data.data);
        // console.log("aramaCombo", data.data);
    })
    Promise.all(promises).then(() => {
        // NUEVA IMPLEMENTACION
        let master = []

        armaCombo.value.forEach((element, index) => {
            let data = {}
            data.product = armaCombo.value[index].Cabecera
            data.details = armaCombo.value[index];
            master.push(data)
            // console.log("master", master);
            //expoListProduct.value = expoListProduct.value.concat(armaCombo.value[index]);
        });

        // ESTOS SON LOS DATOS PRINCIPALES QUE LLENAN LA SEGUNGA TABLA
        // console.log(master);
        items.value = master
 
        // console.log("items", items.value);
        master = []
        armaCombo.value = []
    })

   
    selectedProducts.value = []
    // armaCombo.value = []
}

const deleteBtn = () => {
    const filterListProducts2 = expoListProduct.value.filter(item => selectedExpoProducts.value.includes(item.Codigo));
    filterListProducts2.map((item) => {
        deleteCode.push(item.Codigo)
    })
    expoListProduct.value = expoListProduct.value.filter(item => !deleteCode.includes(item.Codigo));
    deleteCode.length = 0
}

const fGeneratePdf = async () => {
    isLoadingPdf.value = true
    try {
        fetch(`http://${api}:${portApi}/api/v1/generate-super-pdf`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: expoListProduct.value, // filterExpoListProducts.value  // items.value para combos
                datosRelacionados: items.value,
                list: list.value,
                sizeTalker: sizeTalker.value,
                typeTalker: typeTalker.value
            })
        })
            .then(response => response.blob())
            .then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                const fecha = new Date();
                const fechaFormateada = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}_${fecha.getHours().toString().padStart(2, '0')}-${fecha.getMinutes()}`;
                const nombreArchivo = `Hablador-Super-Mercado${fechaFormateada}.pdf`;
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

        // console.log(sapCode.value);

        // http://${api}:${portApi}/api/v1/send/sap-code1
        console.log(list.value);
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
                    console.log(data.data);
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

onMounted(() => {
    busquedaIncial()
})

const items = ref([
])


watch(() => {
    // SECOND PRODUCT TABLE
    filterExpoListProducts.value = expoListProduct.value.filter(item => selectedExpoProducts.value.includes(item.Codigo));
    if (filterExpoListProducts.value.length > 0) {
        isDisabled.value = false
    } else {
        isDisabled.value = true
    }
})

// data pa la nueva tabla
const headers2 = ref([
    { text: 'Producto', value: 'product' },
    { text: 'Detalles', value: 'details' },
])

const search = ref('')

const filteredItems = computed(() => {
    if (!search.value) {
        return items.value
    }
    return items.value.filter(item =>
        item.product.toLowerCase().includes(search.value.toLowerCase())
    )
})
// s 
</script>

<template>
    <Nav></Nav> <!--v-if="isAuthenticate" -->
    <span v-if="isLoadingPdf" class="loaderPdf"></span>
    <h1>PROMO DAKA</h1>
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

    <!-- nuevo template de pruebas para la segunda tabla -->
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
            
            <v-btn size="small" class="btn-generate-pdf"  append-icon="mdi-download" color="red"
                width="160" @click="fGeneratePdf">
                Generar .PDF
            </v-btn>
        </div>
    </div>
    <!--<Footer v-if="isAuthenticate"></Footer>-->
    <!-- <GreenjsTable /> -->
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
