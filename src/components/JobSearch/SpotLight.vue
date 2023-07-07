<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot :img="spotlight.img" :title="spotlight.title" :description="spotlight.description" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

interface Spotlight {
  id: string
  img: string
  title: string
  description: string
}

const spotlights = ref<Spotlight[]>([])

const getSpotlights = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL
  const { data } = await axios.get<Spotlight[]>(`${baseUrl}/spotlights`)
  spotlights.value = data
}

onMounted(getSpotlights)
</script>
