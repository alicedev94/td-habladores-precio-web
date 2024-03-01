<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';

const isLoading = ref(false)
const isAuthenticate = ref(false)

// API AND PORT
const api = `${window.location.hostname}`;
const portApi = 3001;

onMounted(() => {
    // SABER LA RUTA DONDE ESTOY
    let route = location.pathname

    // Divide la ruta en segmentos
    let segmentos = route.split('/');
    // console.log(segmentos);

    // console.log(segmentos[1]);

    // Saber si estoy en la rurta que corresponde
    if (segmentos[1] === "marketing" && segmentos[2] === "logo-change") {
        isAuthenticate.value = true
        // console.log("dentro de pathnmane");
    } else {
        isAuthenticate.value = false
    }
})

const form = async () => {
    isLoading.value = true
    const formData = new FormData();
    const fileInput = document.querySelector('#file-input');
    formData.append('image', fileInput.files[0]);

    try {
        axios.post(`http://${api}:${portApi}/api/v1/change/logo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((respuesta) => {
            isLoading.value = false
            try {
                // alert(respuesta.data.originalname);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Logo actualizado con exito a\n${respuesta.data.originalname}`,
                    showConfirmButton: true,
                    timer: 1800
                });
            } catch (error) {
                alert(error);
            }
        });

        // console.log(response);
    } catch (error) {
        alert(error)
        isLoading.value = false
    }
} 
</script>

<template>
    <Nav v-if="isAuthenticate"></Nav>
    <v-form @submit.prevent="form" class="formulario">
        <span class="form-title">Selecciona tu logo</span>
        <p class="form-paragraph">
            El archivo debe ser png o jpg.
        </p>
        <label for="file-input" class="drop-container">
            <span class="drop-title">Suelte archivos aqui</span>
            <input type="file" name="image" accept="image/png, image/jpeg" required id="file-input">
        </label>
        <br>
        <div class="container-btn-change-logo"><v-btn :loading="isLoading" type="submit"
                class="formulario-boton">GUARDAR</v-btn></div>
    </v-form>
    <Footer v-if="isAuthenticate"></Footer>
</template>

<style>
.container-btn-change-logo {
    display: flex;
}
</style>
