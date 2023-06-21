<template>
  <div>
    <h1>JobResultsView</h1>
    <button @click="goHome">Go Home</button>
  </div>
</template>

<script>
export default {
  name: 'JobResultsView',
  methods: {
    goHome() {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
