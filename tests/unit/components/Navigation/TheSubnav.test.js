import { render, screen } from '@testing-library/vue'

import { createTestingPinia } from '@pinia/testing'

import TheSubnav from '@/components/Navigation/TheSubnav.vue'
import { useJobsStore } from '@/stores/jobs.js'

describe('TheSubnav', () => {
  const renderTheSubnav = routeName => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()

    render(TheSubnav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route: {
            name: routeName
          }
        },
        stubs: {
          FromAwesomIcon: true
        }
      }
    })
    return { jobsStore }
  }

  describe('когда пользоватуль на странице поиска работы', () => {
    it('отобразить счетчик вакансий', async () => {
      const { jobsStore } = renderTheSubnav('JobResults')
      const numberOfJobs = 33
      jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS = Array(numberOfJobs).fill({})

      const jobCount = await screen.findByText(numberOfJobs)
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('когда пользователь не находится на странице поиска работы', () => {
    it('не отображаются вакансии', () => {
      const { jobsStore } = renderTheSubnav('Home')
      const numberOfJobs = 33
      jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS = Array(numberOfJobs).fill({})
      const jobCount = screen.queryByText(numberOfJobs)
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
