<template>
    <v-card class="card-select-list" width="600" height="400" color="#000" variant="text" elevation="8">
        <v-card-item>
            <div class="text-caption">SELECCIONAR DATA PARA EL CDD</div>
            <v-radio-group inline>
                <v-radio label="CDD" value="0"></v-radio>

            </v-radio-group>

            <v-card-actions>
                <v-btn variant="elevated" color="#d0fdd7" :loading="false" @click="">
                    ACEPTAR
                </v-btn>
            </v-card-actions>
        </v-card-item>
    </v-card>
</template>

<script setup>
</script>
<style></style>