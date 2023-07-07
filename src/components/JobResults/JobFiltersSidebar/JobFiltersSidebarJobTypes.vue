<template>
  <job-filters-sidebar-checkbox-group
    :unique-value="UNIQUE_JOB_TYPES"
    :action="userStore.ADD_SELECTED_JOB_TYPES"
  />
</template>
<script lang="ts" setup>
import { computed } from 'vue'

import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

const jobStore = useJobsStore()
const UNIQUE_JOB_TYPES = computed(() => jobStore.UNIQUE_JOB_TYPES)

const userStore = useUserStore()
</script>
