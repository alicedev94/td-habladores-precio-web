<script setup>
defineEmits(['logout']);
</script>

<template>
    <div class="nav-container">
        <v-toolbar class="nav" dark prominent color="#00308F">
            <v-img class="img-logo" src="/logo_daka.png" alt="Logo de la empresa" contain max-width="150" align-self="start" />
            <v-spacer></v-spacer>
            <v-btn @click="$emit('logout')" icon>
                <v-icon>mdi-export</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
</template>
