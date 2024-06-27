<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import router from '@/router';

const disPromo = ref(true)
const disUlti = ref(true)

const props = defineProps({
    typeList: {
        typeList: String,
        required: true
    },
    sucursal: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['update:typeList', 'update:sizeTalker', 'update:typeTalker', 'send-form'])

// API AND PORT
const api = `${window.location.hostname}`;
const portApi = 3002;

const items = ref([])
const selectData = ref({ typeList: '', sizeTalker: '', typeTalker: '' })
const loading = ref(false)

// Functions
const generarSupermercado = async () => {
    // const response = await axios.get(`http://${api}:${portApi}/api/v1/gene-supermarket/${selectData.value.typeList}/${selectData.value.sizeTalker}/${selectData.value.typeTalker}/${props.sucursal}`);
    // varibles de la url http://etc.../${LISTA}/${TAMAÑO}/${TIPO}/${SUCURSAL}
    setTimeout(() => {
        loading.value = true
        router.push(`/table-data-supermarket/${selectData.value.typeList}/${selectData.value.sizeTalker}/${selectData.value.typeTalker}/${props.sucursal}`)
        loading.value = false
    }, 1000)
}

onMounted(async () => {
    const response = await axios.get(`http://${api}:${portApi}/api/v1/priceList`)
    items.value = response.data
    // console.log(items.value);
})

watch(selectData.value, () => {
    // DEFINIR LOGICA DEL PROCESO ANTES DE PASARLO A CODIGO
    // TIPO DE HABLADOR typeTalker
    // TAMANO DE HABLADOR sizeTalker

    let { typeTalker, sizeTalker } = selectData.value;

    // TAMANO GRANDE
    if (sizeTalker === '2') {
        disPromo.value = false
        disUlti.value = false
    }
    // TAMANAO MEDIANO
    else if (sizeTalker === '1') {
        disPromo.value = false
        disUlti.value = true
    }
    // TAMANO PEQUENO
    else if (sizeTalker === '0') {
        disPromo.value = false
        disUlti.value = true
    }
})
</script>

<template>
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

            <v-autocomplete class="combo-select-list separador-text" label="Listas de precios" :items="items"
                v-model="selectData.typeList" variant="outlined"></v-autocomplete>

            <div class="text-caption">Paso 2:</div>

            <v-radio-group v-model="selectData.sizeTalker" :disabled="selectData.typeList === ''" inline>
                <v-radio label="Pequeño" value="0"></v-radio>
                <v-radio label="Mediano" value="1"></v-radio>
                <v-radio label="Grande" value="2"></v-radio>
            </v-radio-group>

            <div class="text-caption">Paso 3:</div>
            <v-radio-group v-model="selectData.typeTalker" :disabled="selectData.sizeTalker === ''" inline>
                <v-radio :disabled="disPromo" label="Promo Daka" value="0"></v-radio>
                <v-radio :disabled="disUlti" label="Ultimas Existencias" value="1"></v-radio>
            </v-radio-group>

            <!-- :disabled="selectData.sizeTalker === ''" -->
            <!-- <input hidden :value="sucursal" /> -->

            <div class="text-caption">Paso 4:</div>
            <v-card-actions>
                <v-btn variant="elevated" color="#d0fdd7" :loading="loading" :disabled="selectData.typeTalker === ''"
                    @click="generarSupermercado">
                    ACEPTAR
                </v-btn>
            </v-card-actions>
        </v-card-item>
    </v-card>
</template>
