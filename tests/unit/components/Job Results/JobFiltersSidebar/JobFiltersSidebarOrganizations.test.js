import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'

import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue'

import { useJobsStore } from '@/stores/jobs.js'
import { useUserStore } from '@/stores/user.js'

describe('JobFiltersSidebarOrganizations', () => {
  const renderJobFiltersSidebarOrganizations = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    const userStore = useUserStore()
    render(JobFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
    return { jobsStore, userStore }
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
})
