import type { Mock } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import { useRouter } from 'vue-router'
vi.mock('vue-router')

import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'

const useRouterMock = useRouter as Mock

describe('JobFiltersSidebarCheckboxGroup', () => {
  interface JobFiltersSidebarCheckboxGroupProps {
    header: string
    uniqueValue: Set<string>
    action: Mock
  }

  const createProps = (
    props: Partial<JobFiltersSidebarCheckboxGroupProps> = {}
  ): JobFiltersSidebarCheckboxGroupProps => ({
    header: 'Some header',
    uniqueValue: new Set(['ValueA', 'ValueB']),
    action: vi.fn(),
    ...props
  })

  const renderJobFiltersSidebarCheckboxGroup = (props: JobFiltersSidebarCheckboxGroupProps) => {
    const pinia = createTestingPinia()

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props
      },
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }

  it('отображает уникальный список значений(value) из вакансий', async () => {
    const props = createProps({
      header: 'Job Types',
      uniqueValue: new Set(['Full-time', 'Path-time'])
    })
    renderJobFiltersSidebarCheckboxGroup(props)

    const button = screen.getByRole('button', { name: /job types/i })
    await userEvent.click(button)

    const jobTypesListItems = screen.getAllByRole('listitem')
    const jobType = jobTypesListItems.map(node => node.textContent)
    expect(jobType).toEqual(['Full-time', 'Path-time'])
  })
  describe('пользователь кликает на checkbox', () => {
    it('пользователь делает выбор значения(value)', async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() })
      const action = vi.fn()
      const props = createProps({
        header: 'Job Types',
        uniqueValue: new Set(['Full-time', 'Path-time']),
        action
      })
      renderJobFiltersSidebarCheckboxGroup(props)

      const button = screen.getByRole('button', { name: /job types/i })
      await userEvent.click(button)

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
        header: 'Job Types',
        uniqueValue: new Set(['Full-time'])
      })
      renderJobFiltersSidebarCheckboxGroup(props)

      const button = screen.getByRole('button', { name: /job types/i })
      await userEvent.click(button)

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i
      })
      await userEvent.click(fullTimeCheckbox)

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })
})
