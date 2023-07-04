<template>
  <img :src="imageLink" class="h-8 w-8 rounded-3xl object-contain" alt="User profile image" />
</template>

<script lang="ts" setup>
// import imageLink from '@/assets/user.svg'
import { ref } from 'vue'
// const imageUser = ref(imageLink)

const imageLink = ref(
  'https://upload.wikimedia.org/wikipedia/commons/a/a0/Na_soutoku_Vltavy_se_Sázavou%2C_foto_Jiří_Tondl.jpg'
)
</script>
