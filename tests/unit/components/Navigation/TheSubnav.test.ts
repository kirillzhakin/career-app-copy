import type { Mock } from 'vitest'

import { render, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import { useRoute } from 'vue-router'
vi.mock('vue-router')

import TheSubnav from '@/components/Navigation/TheSubnav.vue'
import { useJobsStore } from '@/stores/jobs'

const useRouteMock = useRoute as Mock

describe('TheSubnav', () => {
  const renderTheSubnav = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()

    render(TheSubnav, {
      global: {
        plugins: [pinia],

        stubs: {
          FromAwesomIcon: true
        }
      }
    })
    return { jobsStore }
  }

  describe('когда пользоватуль на странице поиска работы', () => {
    it('отобразить счетчик вакансий', async () => {
      useRouteMock.mockReturnValue({ name: 'JobResults' })

      const { jobsStore } = renderTheSubnav()
      const numberOfJobs = 33
      // @ts-expect-error: getter is readonly
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

      const jobCount = await screen.findByText(numberOfJobs)
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('когда пользователь не находится на странице поиска работы', () => {
    it('не отображаются вакансии', () => {
      useRouteMock.mockReturnValue({ name: 'Home' })

      const { jobsStore } = renderTheSubnav()
      const numberOfJobs = 33
      // @ts-expect-error: getter is readonly
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({})
      const jobCount = screen.queryByText(numberOfJobs)
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
