import type { Mock } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useRoute } from 'vue-router'
vi.mock('vue-router')

import JobListings from '@/components/JobResults/JobListings.vue'
import { useJobsStore } from '@/stores/jobs'

const useRouteMock = useRoute as Mock

describe('JobListings', () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    // @ts-expect-error
    jobsStore.FILTERED_JOBS = Array(15).fill({})

    render(JobListings, {
      global: {
        plugins: [pinia],

        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    return { jobsStore }
  }

  it('запрос на сервер вакасий', () => {
    useRouteMock.mockReturnValue({ query: {} })
    const { jobsStore } = renderJobListings()
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled()
  })

  it('отобразить 10 вакансий', async () => {
    useRouteMock.mockReturnValue({ query: { page: '1' } })
    const { jobsStore } = renderJobListings()
    // @ts-expect-error
    jobsStore.FILTERED_JOBS = Array(15).fill({})

    const jobListings = await screen.findAllByRole('listitem')
    expect(jobListings).toHaveLength(10)
  })

  describe('когда параметры исключают номер страницы', () => {
    it('отображает номер страницы 1', () => {
      useRouteMock.mockReturnValue({ query: {} })
      renderJobListings()
      expect(screen.getByText('Page 1')).toBeInTheDocument()
    })
  })
  describe('когда параметры исключают номер страницы', () => {
    it('отображает номер страницы 3', () => {
      useRouteMock.mockReturnValue({ query: { page: '3' } })
      renderJobListings()
      expect(screen.getByText('Page 3')).toBeInTheDocument()
    })
  })

  describe(' когда пользователь на 1-й странице', () => {
    it('ссылка previous page не отображается', async () => {
      useRouteMock.mockReturnValue({ query: { page: '1' } })
      const { jobsStore } = renderJobListings()
      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).not.toBeInTheDocument()
    })
    it('ссылка next page отображается', async () => {
      useRouteMock.mockReturnValue({ query: { oage: '1' } })
      const { jobsStore } = renderJobListings()
      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).toBeInTheDocument()
    })
  })
  describe('когда пользователь на последней странице', () => {
    it('ссылка next page не отображается', async () => {
      useRouteMock.mockReturnValue({ query: { page: '2' } })
      const { jobsStore } = renderJobListings()
      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).not.toBeInTheDocument()
    })

    it('ссылка previous page отображается', async () => {
      useRouteMock.mockReturnValue({ query: { page: '2' } })
      const { jobsStore } = renderJobListings()
      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).toBeInTheDocument()
    })
  })
})
