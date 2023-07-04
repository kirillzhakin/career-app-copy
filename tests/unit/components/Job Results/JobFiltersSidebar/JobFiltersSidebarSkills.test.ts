import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'

import { useUserStore } from '@/stores/user'
import JobFiltersSidebarSkills from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue'

describe('JobFiltersSidebarSkills', () => {
  const renderJobFiltesSidebarSkills = () => {
    const pinia = createTestingPinia()

    const userStore = useUserStore()

    render(JobFiltersSidebarSkills, {
      global: {
        plugins: [pinia]
      }
    })
    return { userStore }
  }

  it('заполняет поисковый ввод из store', async () => {
    const { userStore } = renderJobFiltesSidebarSkills()
    userStore.skillsSearchTerm = 'Progger'
    const input = await screen.findByRole<HTMLInputElement>('textbox')
    expect(input.value).toBe('Progger')
  })

  it('записывает поисковый ввод в store', async () => {
    const { userStore } = renderJobFiltesSidebarSkills()
    userStore.skillsSearchTerm = ''
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, 'V')
    await userEvent.click(document.body)
    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith('V')
  })
  it('удалить пробелы из инпута', async () => {
    const { userStore } = renderJobFiltesSidebarSkills()
    userStore.skillsSearchTerm = ''
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, '   Vue   ')
    await userEvent.click(document.body)
    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith('Vue')
  })
})
