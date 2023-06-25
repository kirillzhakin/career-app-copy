import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'
import JobListings from '@/components/JobResults/JobListings.vue'

import { useJobsStore } from '@/stores/jobs'

describe('JobListings', () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: '5',
      ...queryParams
    }
  })

  const renderJobListings = $route => {
    const pinia = createTestingPinia()

    render(JobListings, {
      global: {
        plugins: [pinia],
        mocks: {
          $route
        },
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
  }

  it('запрос на сервер вакасий', () => {
    const $route = createRoute()
    renderJobListings($route)
    const jobsStore = useJobsStore()
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled()
  })

  it('отобразить 10 вакансий', async () => {
    const queryParams = { page: '1' }
    const $route = createRoute(queryParams)
    renderJobListings($route)

    const jobsStore = useJobsStore()
    jobsStore.jobs = Array(15).fill({})

    const jobListings = await screen.findAllByRole('listitem')
    expect(jobListings).toHaveLength(10)
  })

  describe('когда параметры исключают номер страницы', () => {
    it('отображает номер страницы 1', () => {
      const queryParams = { page: undefined }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      expect(screen.getByText('Page 1')).toBeInTheDocument()
    })
  })
  describe('когда параметры исключают номер страницы', () => {
    it('отображает номер страницы 3', () => {
      const queryParams = { page: '3' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      expect(screen.getByText('Page 3')).toBeInTheDocument()
    })
  })

  describe(' когда пользователь на 1-й странице', () => {
    it('ссылка previous page не отображается', async () => {
      const queryParams = { page: '1' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).not.toBeInTheDocument()
    })
    it('ссылка next page отображается', async () => {
      const queryParams = { page: '1' }
      const $route = createRoute(queryParams)

      renderJobListings($route)
      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).toBeInTheDocument()
    })
  })
  describe('когда пользователь на последней странице', () => {
    it('ссылка next page не отображается', async () => {
      const queryParams = { page: '2' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).not.toBeInTheDocument()
    })

    it('ссылка previous page отображается', async () => {
      const queryParams = { page: '2' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).toBeInTheDocument()
    })
  })
})
