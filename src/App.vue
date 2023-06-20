<template>
  <div>
    <main-nav />
    <the-hero />
  </div>
</template>
<script>
import MainNav from '@/components/MainNav.vue'
import TheHero from '@/components/TheHero.vue'

export default {
  name: 'App',
  components: {
    MainNav,
    TheHero
  }
}
</script>

<style scoped></style>
