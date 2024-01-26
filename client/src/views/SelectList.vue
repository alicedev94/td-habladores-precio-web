<script setup>
import axios from 'axios';
import { ref } from 'vue'

const items = ref([
    { title: 'Lista Para Porlamar', value: '3' },
    { title: 'Lista Especial', value: '11' },
    { title: 'Lista Verde', value: '6' }
])

const isLoading = ref(false)
const selectData = ref({ typeList: ' ', sizeTalker: '' })

const btnSend = () => {
    // enviar los datos al backend para hacer la consulta que se encargara de traer la data (Pruebas de performance)
    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
        location.href = `/table-data/${selectData.value.typeList}/${selectData.value.sizeTalker}`
    }, 1000)
}
</script>

<template>
    <v-card class="mx-auto card-select-list" width="600" height="400" color="#000" variant="outlined" elevation="8">
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
            <v-radio-group inline v-model="selectData.sizeTalker" v-bind:disabled="selectData.typeList === ' '">
                <v-radio label="Hablador Pequeño" value="0"></v-radio>
                <v-radio label="Hablador Grande" value="1"></v-radio>
                <!-- <v-radio label="Radio Three" value="three"></v-radio> -->
            </v-radio-group>

            <div class="text-caption">Paso 3:</div>
            <v-card-actions>
                <v-btn variant="elevated" color="#d0fdd7" :loading="isLoading"
                    v-bind:disabled="selectData.sizeTalker === ''" @click="btnSend">
                    ACEPTAR
                </v-btn>
            </v-card-actions>
        </v-card-item>
    </v-card>
    
</template>