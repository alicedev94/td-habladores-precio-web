<script setup>
import { ref, onMounted } from 'vue'
defineEmits(['logout']);
const isMarketing = ref(true)
const back = ref(false)

import router from '@/router';
// const rolMarketing = ref(true)

const logout = () => {
    localStorage.removeItem("token");
    // router.push("/")
    location.reload();
}

onMounted(() => {
    let rolMarketing = localStorage.getItem("token")
    let { rtaRol } = JSON.parse(rolMarketing);

    if (rtaRol === "MARKETING") {
        isMarketing.value = true
    } else {
        isMarketing.value = false
    }

    // SABER LA RUTA DONDE ESTOY
    let route = location.pathname

    // Divide la ruta en segmentos
    let segmentos = route.split('/');

    // Comprueba si estás en la ruta correcta
    if ((segmentos[1] === 'table-data' && segmentos.length === 5) || (segmentos[1] === 'marketing' && segmentos[2] === 'logo-change')) {
        // RUTA CORRECTA 
        back.value = true
    } else {
        // RUTA INCORRECTA 
        back.value = false
    }

    // console.log("todo bien");
})

    // functions 
const handleClick = () => {
    router.push("/");
}

</script>

<template>
    <div class="nav-container">
        <v-toolbar class="nav" dark prominent color="#00308F">
            <v-img class="img-logo" src="/logo_daka.png" alt="Logo de la empresa" contain max-width="150" align-self="start"
                @click="handleClick" />

            <v-btn v-if="isMarketing" class="btnRedirectBack" variant="elevated">
                <a class="btn-link" href="/marketing/logo-change">CAMBIO DE LOGO</a>
                <!-- <router-link class="btn-link" to="/marketing/logo-change">CAMBIO DE LOGO</router-link> -->
            </v-btn>

            <v-btn v-if="back" variant="elevated">
                <a class="btn-link" href="/select-list">VOLVER</a>
                <!-- <router-link class="btn-link" to="/select-list">VOLVER</router-link> -->
            </v-btn>

            <!-- <ul v-if="isMarketing">
                <li class="li-logo-change">
                    <a href="/marketing/logo-change">CAMBIO DE LOGO</a>
                </li>
            </ul> -->
            <v-spacer></v-spacer>
            <!-- <v-spacer></v-spacer> -->
            <!-- <v-btn @click="$emit('logout')" icon>
                <v-icon>mdi-export</v-icon>
            </v-btn> -->
            <v-btn @click="logout" icon>
                <v-icon>mdi-export</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
</template>

<style scoped>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border-radius: 30%;
}

li {
    float: left;
}

li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-weight: bold;
}

.li-logo-change {
    background-color: #9b9b9b;
    opacity: 1;
}

.btn-link {
    color: inherit;
    text-decoration: none;
}

.btnRedirectBack {
    margin-right: 1%;
}
</style>
