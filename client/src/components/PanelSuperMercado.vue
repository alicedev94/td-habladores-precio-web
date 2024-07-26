<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import router from '@/router';

const disPromo = ref(true)
const disUlti = ref(false)
const switchCombo = ref(true)

const combo = ref(false)
const paraCombo = ref('1')

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
const portApi = 3004;

const items = ref([])
const selectData = ref({ typeList: '', sizeTalker: '', typeTalker: '0' })
const loading = ref(false)

// Functions
const generarSupermercado = async () => {
    setTimeout(() => {
        loading.value = true

        let { typeList, sizeTalker, typeTalker } = selectData.value

        // DETERMINAR SI ES UN COMBO O UNA PROMO NORMAL 
        if (combo.value) {
            // PROMOCION TIPO COMBO
            router.push(`/table-data-supermarket/${typeList}/${sizeTalker}/${typeTalker}/${props.sucursal}`)
        } else {
            // PROMOCION NORMAL (PANEL ADMIN)
            if (typeTalker === '1') { // || sizeTalker === '0' || sizeTalker === '1'
                router.push(`/table-data-supermarket/${typeList}/${sizeTalker}/${typeTalker}/${props.sucursal}`)
            } else 
            { 
                router.push(`/table-data/${typeList}/${sizeTalker}/${props.sucursal}/${paraCombo.value}`) 
            }

        }

        loading.value = false
    }, 1000)
}

onMounted(async () => {
    const response = await axios.get(`http://${api}:${portApi}/api/v1/priceList`)
    items.value = response.data
})

watch(selectData.value, () => {
    // DEFINIR LOGICA DEL PROCESO ANTES DE PASARLO A CODIGO
    let { typeTalker, sizeTalker } = selectData.value;

    // TAMANO GRANDE
    if (sizeTalker === '2') {
        disPromo.value = false
        disUlti.value = false
      
        if(typeTalker === '0') {
            switchCombo.value = false
        } else {
            switchCombo.value = true
            combo.value = false
        }
    }
    // TAMANAO MEDIANO
    else if (sizeTalker === '1') {
        disPromo.value = false
        disUlti.value = true
        switchCombo.value = true
        selectData.value.typeTalker = '0'
        combo.value = false
    }
    // TAMANO PEQUENO
    else if (sizeTalker === '0') {
        disPromo.value = false
        disUlti.value = true
        switchCombo.value = true
        selectData.value.typeTalker = '0'
        combo.value = false
    }
})

watch(combo.value, () => {
    if (combo.value) {
        paraCombo.value = '1'
    } else {
        paraCombo.value = '0'
    }
}) 
</script>

<template>
    <v-card class="card-select-list" width="600" height="400" color="#000" variant="text" elevation="8">
        <v-card-item>

            <v-autocomplete class="combo-select-list separador-text" label="Listas de precios" :items="items"
                v-model="selectData.typeList" variant="outlined"></v-autocomplete>

            <v-radio-group v-model="selectData.sizeTalker" :disabled="selectData.typeList === ''" inline>
                <v-radio label="Pequeño" value="0"></v-radio>
                <v-radio label="Mediano" value="1"></v-radio>
                <v-radio label="Grande" value="2"></v-radio>
            </v-radio-group>

            <v-radio-group v-model="selectData.typeTalker" :disabled="selectData.sizeTalker === ''" inline>
                <v-radio :disabled="disPromo" label="Promo Daka" value="0"></v-radio>
                <v-radio :disabled="disUlti" label="Ultimas Existencias" value="1"></v-radio>
            </v-radio-group>

            <!-- selectData.typeTalker === '1' || selectData.sizeTalker.trim() === '' -->
<!-- 
            <v-switch label="Promo Daka Combo" color="success"
                :disabled="switchCombo" v-model="combo"> 
            </v-switch> -->


            <v-card-actions>
                <v-btn variant="elevated" color="#d0fdd7" :loading="loading" :disabled="selectData.typeTalker === ''"
                    @click="generarSupermercado">
                    ACEPTAR
                </v-btn>
            </v-card-actions>
        </v-card-item>
    </v-card>
</template>
