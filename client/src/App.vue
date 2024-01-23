<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';

const isVisible = ref(false);
const pathname = ref("");

const logout = () => {
  localStorage.removeItem("token");
  location.reload();
}

onMounted(() => {
  pathname.value = location.pathname;

  const token = localStorage.getItem("token");
  if (token !== null) {
    isVisible.value = true
  } else {
    isVisible.value = false
  }
})
</script>

<template>
  <div v-if="isVisible && pathname !== '/'">
    <Nav @logout="logout" />
    <!-- <Footer /> -->
  </div>

  <RouterView />
</template>