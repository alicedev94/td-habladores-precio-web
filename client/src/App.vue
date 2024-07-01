<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'

const isVisible = ref(false);
const pathname = ref("");

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
  <RouterView />
</template>