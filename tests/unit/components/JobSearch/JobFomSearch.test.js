import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'vue-router'
vi.mock('vue-router')

import JobsearchForm from '@/components/JobSearch/JobsearchForm.vue'

describe('JobSearchForm', () => {
  describe('когда пользователь отправляет данные формы', () => {
    it('направляет пользователя на страницу результатов поиска с параметрами поиска пользователя', async () => {
      const push = vi.fn()
      useRouter.mockReturnValue({ push })

      render(JobsearchForm, {
        global: {
          stubs: {
            FormAwesomeIcon: true
          }
        }
      })

      const roleInput = screen.getByRole('textbox', {
        name: /role/i
      })
      await userEvent.type(roleInput, 'VueDeveloper')

      const locationInput = screen.getByRole('textbox', {
        name: /where?/i
      })
      await userEvent.type(locationInput, 'Moscow')

      const submitButton = screen.getByRole('button', {
        name: /search/i
      })
      await userEvent.click(submitButton)

      expect(push).toHaveBeenCalledWith({
        name: 'JobResults',
        query: { role: 'VueDeveloper', location: 'Moscow' }
      })
    })
  })
})
