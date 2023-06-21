<template>
  <h1>JobView {{ id }}</h1>
</template>

<script>
export default {
  name: 'JobView',
  computed: {
    id() {
      return this.$route.params.id
    }
  }
}
</script>
