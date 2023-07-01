<template>
  <h1>JobView {{ currentJobId }}</h1>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const currentJobId = computed(() => route.params.id)
</script>
