<script setup>
const props = defineProps({
    imagen: {
        type: String,
        require: true
    }
})
</script>

<template>
    <div>
        <v-img :aspect-ratio="1" class="bg-white img-price" :src="imagen" height="254" width="340"
            cover></v-img>
    </div>
</template>

<style scoped>
.img-price {
    margin-left: 33%;
}
</style>