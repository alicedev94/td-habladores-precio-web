<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
import router from '@/router';

const items = ref([])

const isLoading = ref(false)
const isAuthenticate = ref(false)
const selectData = ref({ typeList: ' ', sizeTalker: '' })

const userSucursal = ref("")

// API AND PORT
const api = `${window.location.hostname}`;
const portApi = 3001;

onMounted(async () => {
    // quitar tema degradado
    document.body.classList.remove("body-gradiet");

    // agregar nav en caso de que el usuaurio este autenticado
    if(location.pathname === "/select-list") {
        isAuthenticate.value = true
    } else {
        isAuthenticate.value = false
    }

    const response = await axios.get(`http://${api}:${portApi}/api/v1/priceList`)
    items.value = response.data

    let token = localStorage.getItem("token")
    let { idSucursal, rtaRol } = JSON.parse(token)
    userSucursal.value = idSucursal
})

// watch(() => {

// })

const btnSend = () => {
    // enviar los datos al backend para hacer la consulta que se encargara de traer la data (Pruebas de performance)
    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
        // location.href = `/table-data/${selectData.value.typeList}/${selectData.value.sizeTalker}/${userSucursal.value}`
        router.push(`/table-data/${selectData.value.typeList}/${selectData.value.sizeTalker}/${userSucursal.value}`)
    }, 1000)
}
</script>

<template>
    <Nav v-if="isAuthenticate"></Nav>
    <v-card class="mx-auto card-select-list" width="600" height="465" color="#000" variant="outlined" elevation="8">
        <v-card-item>
            <div>
                <div class="text-overline mb-3">
                    HABLADOR DE PRECIO WEB
                </div>
                <div class="text-h6 mb-3">
                    Seleccione lista de precio y tipo de hablador.
                </div>
                <div class="text-caption separador">Paso 1:</div>
            </div>
            <v-autocomplete class="combo-select-list separador-text" label="Listas de precios" :items="items"
                v-model="selectData.typeList" variant="outlined"></v-autocomplete>

            <div class="text-caption">Paso 2:</div>
            <v-radio-group v-model="selectData.sizeTalker" v-bind:disabled="selectData.typeList === ' '">
                <v-radio label="Hablador Pequeño" value="0"></v-radio>
                <v-radio label="Hablador Grande" value="1"></v-radio>
                <v-radio label="Hablador Estandar" value="2"></v-radio>
                <!-- <v-radio label="Radio Three" value="three"></v-radio> -->
            </v-radio-group>

            <input hidden v-model="userSucursal" />

            <div class="text-caption">Paso 3:</div>
            <v-card-actions>
                <v-btn variant="elevated" color="#d0fdd7" :loading="isLoading"
                    v-bind:disabled="selectData.sizeTalker === ''" @click="btnSend">
                    ACEPTAR
                </v-btn>
            </v-card-actions>
        </v-card-item>
    </v-card>
    <!--Footer v-if="isAuthenticate"></Footer-->
</template>