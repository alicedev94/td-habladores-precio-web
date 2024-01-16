<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
const visible = ref(false)
const isLoading = ref(true)

const login = async () => {
  // replace with your api
  const api = `${window.location.hostname}`
  const portApi = 3001 // remplace with source port origin using an enviroment variable

  try {
    const response = await axios.post(`http://localhost:${portApi}/api/v1/signin`, {
      email: email.value,
      password: password.value,
    });

    const { auth } = response.data;

    if (auth) {
      localStorage.setItem('token', JSON.stringify(response.data))
      window.location.pathname = "/table-user"
    } else {
      window.location.href = "/"
    }

  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <form @submit.prevent="login">
    <v-card height="500px" class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="container-logo-login">
        <v-img class="logo-login" src="logo_daka.png"></v-img>
      </div>
      <div class="text-subtitle-1 text-medium-emphasis">Correo Electrónico</div>

      <v-text-field v-model="email" density="compact" placeholder="Ingresa tu correo corporativo"
        prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Contraseña

        <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
          Olvidó su contraseña?</a>
      </div>

      <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'" density="compact" placeholder="Ingresa tu contraseña"
        prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"></v-text-field>

      <v-card class="mb-12" color="surface-variant" variant="tonal">
        <v-card-text class="text-medium-emphasis text-caption">
          Habladores de precio v-1.0.0
        </v-card-text>
      </v-card>

      <v-btn type="submit" block class="mb-8" color="dark" size="large" variant="tonal">
        Iniciar sesión
      </v-btn>
    </v-card>
  </form>
</template>
