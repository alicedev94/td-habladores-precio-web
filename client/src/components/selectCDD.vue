<script setup>
import router from '@/router';
import { ref, watch, computed } from 'vue';

const numero = ref('');
const vSeleccion = ref('');
const galpones = ref(['1', '2', '3', '4']);
const btnBlock = ref(true)

const selectData = ref({ typeList: '', sizeTalker: '', typeTalker: '' })

const btnAceptar = () => {
    router.push(`/table-data-cdd/${numero.value}/${vSeleccion.value}/${selectData.value.sizeTalker}`); // NUMERO - GALPON
};

watch(() => {
    validarCampos();
});

function validarCampos() {
    if (!numero.value || !vSeleccion.value) {
        btnBlock.value = true
    } else {
        btnBlock.value = false
    }
}
</script>

<template>
    <v-card class="card-select-list" width="600" height="400" color="#000" variant="text" elevation="8">
        <v-card-item>
            <div class="text-caption">SELECCIONAR DATA PARA EL CDD</div>
            <div class="contenedor-tarjeta">
                <v-text-field type="number" placeholder="Unidades" v-model="numero"></v-text-field>

                <v-autocomplete class="selector-combo" :items="galpones" v-model="vSeleccion" :disabled="numero === ''" label="Galpón"
                    variant="outlined"></v-autocomplete>

                <v-radio-group v-model="selectData.sizeTalker" :disabled="vSeleccion === ''" inline>
                    <v-radio label="Pequeño" value="0"></v-radio>
                    <v-radio label="Mediano" value="1"></v-radio>
                    <v-radio label="Grande" value="2"></v-radio>
                </v-radio-group>

                <v-card-actions>
                    <v-btn variant="elevated" color="#d0fdd7" :loading="false" :disabled=btnBlock @click="btnAceptar">
                        ACEPTAR
                    </v-btn>
                </v-card-actions>
            </div>
        </v-card-item>
    </v-card>
</template>

<style scoped>
.contenedor-tarjeta {
    padding: 3rem;
}

.selector-combo {
    margin-top: 1rem;
}
</style>