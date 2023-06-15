<template>
  <img :src="imageUser" class="h-8 w-8 rounded-3xl object-contain" alt="Avatar" />
</template>

<script>
import imageUser from '@/assets/user.svg'
export default {
  name: 'ProfileImage',
  data() {
    return {
      imageUser
    }
  }
}
</script>

<style scoped></style>
