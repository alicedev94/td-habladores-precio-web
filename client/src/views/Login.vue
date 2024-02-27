<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '@/router';

const email = ref('')
const password = ref('')
const visible = ref(false)
const isLoading = ref(false)


onMounted(() => {
  document.body.classList.add("body-gradiet")
})

const login = async () => {
  // replace with your api
  const api = `${window.location.hostname}`
  const portApi = 3001 // remplace with source port origin using an enviroment variable

  try {
    isLoading.value = true
    setTimeout(async () => {

      const response = await axios.post(`http://localhost:${portApi}/api/v1/signin`, {
        email: email.value,
        password: password.value,
      });

      const { auth } = response.data;

      if (auth) {
        localStorage.setItem('token', JSON.stringify(response.data))
        isLoading.value = false
        // window.location.pathname = "/select-list"
        // router.push("/select-list")
        router.push("/select-list")
        alert("asdjasiodj")
      } else {
        // window.location.href = "/"
        isLoading.value = false
        Swal.fire({
          title: "Error",
          text: "Las credenciales proporcionadas no son válidas. Por favor, verifique e intente nuevamente.",
          icon: "error"
        });
      }
    }, 1000)

  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="container-loader" v-if="isLoading">
    <div class="loader"></div>
  </div>

  <form v-else @submit.prevent="login">
    <v-card height="500px" class="mx-auto pa-12 pb-8 mt-16" elevation="8" max-width="400" rounded="lg">
      <div class="container-logo-login">
        <v-img class="logo-login" src="logo_daka_se_feliz.png" align="center" justify="center"></v-img>
      </div>

      <h2 class="text-center hablador-precio">HABLADOR DE PRECIO WEB</h2>

      <v-text-field v-model="email" density="compact" placeholder="Ingresa tu correo corporativo"
        prepend-inner-icon="mdi-email-outline" color="primary" background-color="rgba(255, 255, 255, 0.1)"
        border="solid 1px #ccc" rounded="lg"></v-text-field>

      <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'" density="compact" placeholder="Ingresa tu contraseña"
        prepend-inner-icon="mdi-lock-outline" color="primary" background-color="rgba(255, 255, 255, 0.1)"
        border="solid 1px #ccc" rounded="lg"></v-text-field>

      <v-btn type="submit" block class="mb-8" color="#0047ab" size="large" rounded="lg" elevation="10">
        Iniciar sesión
      </v-btn>

      <label class="version-label">v-1.0.0h</label>
    </v-card>
  </form>
</template>

<style scoped>
.hablador-precio {
  font-family: 'Sofia', sans-serif;
  /* Puedes usar una fuente más elegante aquí */
  font-size: 20px;
  color: #333;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
