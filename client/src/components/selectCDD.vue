<template>
    <v-card class="card-select-list" width="600" height="400" color="#000" variant="text" elevation="8">
        <v-card-item>
            <div class="text-caption">SELECCIONAR DATA PARA EL CDD</div>
            <div class="contenedor-tarjeta">
                <v-text-field :rules="[vaidarInput]" label="Número (1-9)" v-model="numero"></v-text-field>
                <v-autocomplete class="selector-combo" :items="galpones" v-model="vSeleccion" label="Galpón" variant="outlined"></v-autocomplete>
                <v-card-actions>
                    <v-btn variant="elevated" color="#d0fdd7" :loading="false" :disabled="!validarNumero" @click="btnAceptar">
                        ACEPTAR
                    </v-btn>
                </v-card-actions>
            </div>
        </v-card-item>
    </v-card>
</template>

<script setup>
import router from '@/router';
import { ref, computed } from 'vue';

const numero = ref('');
const vSeleccion = ref('');
const galpones = ref(['1','2','3','4']);

const btnAceptar = () => {
    router.push(`/table-data-cdd/${numero.value}/${vSeleccion.value}`); // NUMERO - GALPON
};

function vaidarInput(value) {
    const num = parseInt(value);
    if (value.trim() === '') {
        return 'Campo obligatorio'; // No error for empty input
    }
    if (isNaN(num) || num < 1 || num > 9) {
        return 'Solo se permiten números del 1 al 9.';
    }
    return true;
}

const validarNumero = computed(() => {
    return vaidarInput(numero.value) === true;
});
</script>

<style scoped>
.contenedor-tarjeta {
    padding: 3rem;
}

.selector-combo {
    margin-top: 1rem;
}
</style>
