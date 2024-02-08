<script setup>
import { ref, onMounted } from 'vue'
defineEmits(['logout']);
const isMarketing = ref(true)
// const rolMarketing = ref(true)

onMounted(()=> {
    let rolMarketing = localStorage.getItem("token")
    let { rtaEmail, rtaRol } = JSON.parse(rolMarketing);

    if(rtaRol === "MARKETING"){
        isMarketing.value = true
    } else {
        isMarketing.value = false
    }
})
</script>

<template>
    <div class="nav-container">
        <v-toolbar class="nav" dark prominent color="#00308F">
            <v-img class="img-logo" src="/logo_daka.png" alt="Logo de la empresa" contain max-width="150"
                align-self="start" />

            <ul v-if="isMarketing">
                <li class="li-logo-change">
                    <a href="/marketing/logo-change">CAMBIO DE LOGO</a>
                </li>
            </ul>

            <v-spacer></v-spacer>
            <v-btn @click="$emit('logout')" icon>
                <v-icon>mdi-export</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
</template>

<style>
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
</style>
