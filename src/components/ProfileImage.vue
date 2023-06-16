<template>
  <img :src="imageUser" class="h-8 w-8 rounded-3xl object-contain" alt="avatar" />
</template>

<script>
// import imageUser from '@/assets/user.svg'
// import imageUser from 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Death_Note_L_ident.jpg'
export default {
  name: 'ProfileImage',
  data() {
    return {
      imageUser: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Death_Note_L_ident.jpg'
    }
  }
}
</script>

<style scoped></style>
