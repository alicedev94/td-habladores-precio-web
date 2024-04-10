<script setup>
import { ref, watch , onMounted } from 'vue'
import axios from 'axios'

// API AND PORT
const api = `${window.location.hostname}`;
const portApi = 3001;

const items = ref([])
const selectData = ref({ typeList: '', sizeTalker: '', typeTalker: '' })

// Functions
const generarSupermercado = async () => {
    const rta = await axios.post(`http://${api}:${portApi}/api/v1/gene-supermarket/${selectData.value.typeList}/${selectData.value.sizeTalker}/${selectData.value.typeTalker}`); // varibles de la url http://etc.../${LISTA}/${TAMAÑO}/${TIPO}
    console.log(rta);
}

onMounted(async () => {
    const response = await axios.get(`http://${api}:${portApi}/api/v1/priceList`)
    items.value = response.data
})

// watch(selectData.value,()=>{
//     console.log(selectData.value);
// })
</script>

<template>
    <v-card class="card-select-list" width="600" height="400" color="#000" variant="text">
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

            <v-autocomplete class="combo-select-list separador-text" label="Listas de precios" :items="items" v-model="selectData.typeList" variant="outlined"></v-autocomplete>
          
            <div class="text-caption">Paso 2:</div>
            <v-radio-group v-model="selectData.sizeTalker" :disabled="selectData.typeList === ''" inline>
                <v-radio label="Pequeño" value="0"></v-radio>
                <v-radio label="Mediano" value="1"></v-radio>
                <v-radio label="Grande" value="2"></v-radio>
            </v-radio-group>

            <div class="text-caption">Paso 3:</div>
            <v-radio-group v-model="selectData.typeTalker" :disabled="selectData.sizeTalker === ''" inline>
                <v-radio label="Promo Daka" value="0"></v-radio>
                <v-radio label="Ultimas Existencias" value="1"></v-radio>
            </v-radio-group>
            <!-- <input hidden v-model="userSucursal" /> -->

            <div class="text-caption">Paso 4:</div>
            <v-card-actions>
                <v-btn variant="elevated" color="#d0fdd7" :loading="false" :disabled="selectData.typeTalker === ''" @click="generarSupermercado" >
                    ACEPTAR
                </v-btn>
            </v-card-actions>
        </v-card-item>
    </v-card>
</template>
