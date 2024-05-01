<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
import router from '@/router';
import PanelSuperMercado from '@/components/PanelSuperMercado.vue';
import Image from '@/components/Image.vue';

const items = ref([])

const isLoading = ref(false)
const isAuthenticate = ref(false)
const selectData = ref({ typeList: '', sizeTalker: '' })
const selectDataSuperMarket = ref({ typeList: '', sizeTalker: '' })

const userSucursal = ref("")

// API AND PORT
const api = `${window.location.hostname}`;
const portApi = 3001;

onMounted(async () => {
    // quitar tema degradado
    document.body.classList.remove("body-gradiet")
    document.body.classList.add("body-white")

    // agregar nav en caso de que el usuaurio este autenticado
    if (location.pathname === "/select-list") {
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

// SISTEMA PARA EL TABS
const tab = ref(null);
const tabOptions = {
    one: 'estandar',
    two: 'supermercado',
    three: 'cdd',
};

const btnSend = () => {
    // enviar los datos al backend para hacer la consulta que se encargara de traer la data (Pruebas de performance)
    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
        // location.href = `/table-data/${selectData.value.typeList}/${selectData.value.sizeTalker}/${userSucursal.value}`
        router.push(`/table-data/${selectData.value.typeList}/${selectData.value.sizeTalker}/${userSucursal.value}`)
    }, 1000)
}

const btnSend_2 = () => {
    // enviar los datos al backend para hacer la consulta que se encargara de traer la data (Pruebas de performance)
    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
        // location.href = `/table-data/${selectData.value.typeList}/${selectData.value.sizeTalker}/${userSucursal.value}`
        router.push(`/table-data-supermarket/${selectDataSuperMarket.value.typeList}/${selectDataSuperMarket.value.sizeTalker}/${userSucursal.value}`)
    }, 1000)
}
</script>

<template>
    <Nav v-if="isAuthenticate"></Nav>

    <v-tabs v-model="tab" align-tabs="center"> <!--color="deep-purple-accent-4" -->
        <v-tab value="estandar" color="#50C878"> <v-icon>mdi-mdi-android</v-icon> Estandar</v-tab>
        <v-tab value="supermercado" color="#50C878">Supermercado</v-tab>
        <v-tab value="cdd" color="#50C878">CDD</v-tab>
    </v-tabs>

    <v-card-text>
        <v-window v-model="tab">
            <v-window-item :value="tabOptions.one" class="display">
                <v-card class="card-select-list" width="600" height="400" color="#000" variant="text" elevation="8">
                    <v-card-item>
                        <div>
                            <!-- <div class="text-overline mb-3">
                                HABLADOR DE PRECIO WEB
                                </div> -->
                            <div class="text-h10 mb-1">
                                Seleccione lista de precio y tipo de hablador.
                            </div>
                            <div class="text-caption separador">Paso 1:</div>
                        </div>
                        <v-autocomplete class="combo-select-list separador-text" label="Listas de precios"
                            :items="items" v-model="selectData.typeList" variant="outlined"></v-autocomplete>

                        <div class="text-caption">Paso 2:</div>
                        <v-radio-group v-model="selectData.sizeTalker" :disabled="selectData.typeList === ''">
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

                <!-- IMAGE -->
                <Image imagen="/hablador_estandar.png" />
            </v-window-item>
            <v-window-item :value="tabOptions.two" class="display">
                <PanelSuperMercado class="card-select-list" v-model:typeList="selectDataSuperMarket.typeList"
                    v-model:sizeTalker="selectDataSuperMarket.typeList" v-model:sucursal="userSucursal"
                    @send-form="btnSend_2" />
                <Image imagen="/hablador_supermercado.png" />
            </v-window-item>
            <v-window-item :value="tabOptions.three" class="display">
                <PanelSuperMercado class="card-select-list" v-model:typeList="selectDataSuperMarket.typeList"
                    v-model:sizeTalker="selectDataSuperMarket.typeList" v-model:sucursal="userSucursal"
                    @send-form="btnSend_2" />
                <Image imagen="/habladorCDD.png" />
            </v-window-item>
        </v-window>
    </v-card-text>

    <!--Footer v-if="isAuthenticate"></Footer-->
</template>

<style scoped>
.card-select-list {
    margin: 0px;
    margin-left: 30%;
    background-color: white;
}

.display {
    margin-right: 10%;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.v-tab:focus-within {
    text-decoration: underline;
    text-decoration-color: #50C878;
    /* Color esmeralda */
    text-decoration-thickness: 2px;
    /* Grosor de la línea */
    /* Color del texto  color: #50C878;*/
}

.v-tab {
    transition: color 0.3s ease, text-decoration-color 0.3s ease;
    font-weight: bold;
}
</style>