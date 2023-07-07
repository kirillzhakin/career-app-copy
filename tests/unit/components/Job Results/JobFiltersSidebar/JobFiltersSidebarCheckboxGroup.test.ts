import type { Mock } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import { useRouter } from 'vue-router'
vi.mock('vue-router')

import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'
import { useUserStore } from '@/stores/user'
const useRouterMock = useRouter as Mock

describe('JobFiltersSidebarCheckboxGroup', () => {
  interface JobFiltersSidebarCheckboxGroupProps {
    uniqueValue: Set<string>
    action: Mock
  }

  const createProps = (
    props: Partial<JobFiltersSidebarCheckboxGroupProps> = {}
  ): JobFiltersSidebarCheckboxGroupProps => ({
    uniqueValue: new Set(['ValueA', 'ValueB']),
    action: vi.fn(),
    ...props
  })

  const renderJobFiltersSidebarCheckboxGroup = (props: JobFiltersSidebarCheckboxGroupProps) => {
    const pinia = createTestingPinia({ stubActions: false })
    const userStore = useUserStore()

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props
      },
      global: {
        plugins: [pinia]
      }
    })
    return { userStore }
  }

  it('отображает уникальный список значений(value) из вакансий', () => {
    const props = createProps({
      uniqueValue: new Set(['Full-time', 'Path-time'])
    })
    renderJobFiltersSidebarCheckboxGroup(props)

    const jobTypesListItems = screen.getAllByRole('listitem')
    const jobType = jobTypesListItems.map(node => node.textContent)
    expect(jobType).toEqual(['Full-time', 'Path-time'])
  })
  describe('пользователь кликает на checkbox', () => {
    it('пользователь делает выбор значения(value)', async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() })
      const action = vi.fn()
      const props = createProps({
        uniqueValue: new Set(['Full-time', 'Path-time']),
        action
      })
      renderJobFiltersSidebarCheckboxGroup(props)

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i
      })
      await userEvent.click(fullTimeCheckbox)

      expect(action).toHaveBeenCalledWith(['Full-time'])
    })

    it('навигация пользователя на первую страницу вакансий при изменении данных выборки', async () => {
      const push = vi.fn()
      useRouterMock.mockReturnValue({ push })
      const props = createProps({
        uniqueValue: new Set(['Full-time'])
      })
      renderJobFiltersSidebarCheckboxGroup(props)

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i
      })
      await userEvent.click(fullTimeCheckbox)

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })

  describe('когда пользователь очищает фильтры', () => {
    it('вкл/выкл checkbox', async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() })
      const props = createProps({
        uniqueValue: new Set(['Full-time'])
      })
      const { userStore } = renderJobFiltersSidebarCheckboxGroup(props)

      const fullTimeCheckboxBeforeAction = screen.getByRole<HTMLInputElement>('checkbox', {
        name: /full-time/i
      })
      await userEvent.click(fullTimeCheckboxBeforeAction)

      expect(fullTimeCheckboxBeforeAction.checked).toBe(true)
      userStore.CLEAR_USER_JOB_FILTER_SELECTIONS()

      const fullTimeCheckboxAfterAction = await screen.findByRole<HTMLInputElement>('checkbox', {
        name: /full-time/i
      })
      expect(fullTimeCheckboxAfterAction.checked).toBe(false)
    })
  })
})
