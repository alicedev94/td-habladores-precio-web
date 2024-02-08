<script setup>
import axios from 'axios';

const form = async () => {
    const formData = new FormData();
    const fileInput = document.querySelector('#file-input');
    formData.append('image', fileInput.files[0]);

    try {
        const response = await axios.post(`http://localhost:3001/api/v1/change/logo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
} 
</script>

<template>
    <form id="form-cambio-logo" class="formulario" @submit.prevent="form" method="POST" enctype="multipart/form-data">
        <span class="form-title">Selecciona tu logo</span>
        <p class="form-paragraph">
            El archivo debe ser png o jpg.
        </p>
        <label for="file-input" class="drop-container">
            <span class="drop-title">Suelte archivos aqui</span>
            o
            <input type="file" name="image" accept="image/png, image/jpeg" required id="file-input">
        </label>
        <br>
        <button type="submit" class="formulario-boton">Guardar</button>
    </form>
</template>

