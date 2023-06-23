import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'
import axios from 'axios'
import JobListings from '@/components/JobResults/JobListings.vue'

vi.mock('axios')

describe('JobListings', () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: '5',
      ...queryParams
    }
  })

  const renderJobListings = $route => {
    render(JobListings, {
      global: {
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
    axios.get.mockResolvedValue({ data: [] })
    const $route = createRoute()
    renderJobListings($route)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/jobs')
  })

  it('отобразить 10 вакансий', async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) })
    const queryParams = { page: '1' }
    const $route = createRoute(queryParams)
    renderJobListings($route)
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
      axios.get.mockResolvedValue({ data: Array(15).fill({}) })
      const queryParams = { page: '1' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).not.toBeInTheDocument()
    })
    it('ссылка next page отображается', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) })
      const queryParams = { page: '1' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).toBeInTheDocument()
    })
  })
  describe('когда пользователь на последней странице', () => {
    it('ссылка next page не отображается', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) })
      const queryParams = { page: '2' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).not.toBeInTheDocument()
    })

    it('ссылка previous page отображается', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) })
      const queryParams = { page: '2' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).toBeInTheDocument()
    })
  })
})
