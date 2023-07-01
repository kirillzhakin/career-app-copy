<template>
  <img :src="imageUser" class="h-8 w-8 rounded-3xl object-contain" alt="User image" />
</template>

<script lang="ts" setup>
import imageLink from '@/assets/user.svg'
import { ref } from 'vue'
const imageUser = ref(imageLink)
</script>
