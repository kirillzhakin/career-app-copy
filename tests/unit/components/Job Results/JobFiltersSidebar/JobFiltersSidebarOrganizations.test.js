import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'

import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue'

import { useJobsStore } from '@/stores/jobs.js'
import { useUserStore } from '@/stores/user.js'

describe('JobFiltersSidebarOrganizations', () => {
  const renderJobFiltersSidebarOrganizations = () => {
    const pinia = createTestingPinia()
    const userStore = useUserStore()
    const jobsStore = useJobsStore()
    const $router = { push: vi.fn() }

    render(JobFiltersSidebarOrganizations, {
      global: {
        mocks: {
          $router
        },
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
    return { jobsStore, userStore, $router }
  }

  it('отображает уникальный лист организаций из вакансий', async () => {
    const { jobsStore } = renderJobFiltersSidebarOrganizations()
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Ozon', 'Yandex'])

    const button = screen.getByRole('button', { name: /organizations/i })
    await userEvent.click(button)

    const organizationListItems = screen.getAllByRole('listitem')
    const organizations = organizationListItems.map(node => node.textContent)
    expect(organizations).toEqual(['Ozon', 'Yandex'])
  })
  describe('пользователь кликает на checkbox', () => {
    it('пользователь делает выбор организации', async () => {
      const { jobsStore, userStore } = renderJobFiltersSidebarOrganizations()
      jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Ozon', 'Yandex'])

      const button = screen.getByRole('button', { name: /organizations/i })
      await userEvent.click(button)

      const ozonCheckbox = screen.getByRole('checkbox', {
        name: /ozon/i
      })
      await userEvent.click(ozonCheckbox)

      expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith(['Ozon'])
    })

    it('навигация пользователя на первую страницу вакансий при изменении данных выборки', async () => {
      const { jobsStore, $router } = renderJobFiltersSidebarOrganizations()
      jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Ozon'])

      const button = screen.getByRole('button', { name: /organizations/i })
      await userEvent.click(button)

      const ozonCheckbox = screen.getByRole('checkbox', {
        name: /ozon/i
      })
      await userEvent.click(ozonCheckbox)

      expect($router.push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })
})
