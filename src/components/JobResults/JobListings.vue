<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in jobs" :key="job.id" :job="job" />
    </ol>
  </main>
</template>

<script>
import axios from 'axios'
import JobListing from '@/components/JobResults/JobListing.vue'

const url = 'http://localhost:3000/jobs'
export default {
  name: 'JobListings',
  components: {
    JobListing
  },
  data() {
    return {
      jobs: []
    }
  },
  mounted() {
    this.getJobs()
  },
  methods: {
    async getJobs() {
      const { data } = await axios.get(url)
      this.jobs = data
    }
  }
}
</script>
