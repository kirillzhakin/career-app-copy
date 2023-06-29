import { defineStore } from 'pinia'
import getJobs from '@/api/getJobs.js'
import { useUserStore } from './user'

import type { Job } from '@/api/types'

export const FETCH_JOBS = 'FETCH_JOBS'
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS'
export const UNIQUE_JOB_TYPES = 'UNIQUE_JOB_TYPES'
export const FILTERED_JOBS = 'FILTERED_JOBS'
export const INCLUDE_JOB_BY_ORGANIZTION = 'INCLUDE_JOB_BY_ORGANIZTION'
export const INCLUDE_JOB_BY_JOB_TYPE = 'INCLUDE_JOB_BY_JOB_TYPE'

export interface JobsState {
  jobs: Job[]
}

export const useJobsStore = defineStore('jobs', {
  state: (): JobsState => ({
    jobs: []
  }),
  actions: {
    async [FETCH_JOBS]() {
      this.jobs = await getJobs()
    }
  },
  getters: {
    [UNIQUE_ORGANIZATIONS](state) {
      const uniqueOrganization = new Set<string>()
      state.jobs.forEach(job => uniqueOrganization.add(job.organization))
      return uniqueOrganization
    },
    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set<string>()
      state.jobs.forEach(job => uniqueJobTypes.add(job.jobType))
      return uniqueJobTypes
    },
    [INCLUDE_JOB_BY_ORGANIZTION]: () => (job: Job) => {
      const userStore = useUserStore()
      if (userStore.selectedOrganizations.length === 0) return true
      return userStore.selectedOrganizations.includes(job.organization)
    },
    [INCLUDE_JOB_BY_JOB_TYPE]: () => (job: Job) => {
      const userStore = useUserStore()
      if (userStore.selectedJobTypes.length === 0) return true
      return userStore.selectedJobTypes.includes(job.jobType)
    },
    [FILTERED_JOBS](state): Job[] {
      return state.jobs
        .filter(job => this.INCLUDE_JOB_BY_ORGANIZTION(job))
        .filter(job => this.INCLUDE_JOB_BY_JOB_TYPE(job))
    }
  }
})
