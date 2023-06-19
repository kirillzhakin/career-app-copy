import { render, screen } from '@testing-library/vue'

import TheSubnav from '@/components/TheSubnav.vue'

describe('TheSubnav', () => {
  describe('когда пользоватуль на странице поиска работы', () => {
    it('отобразить счетчик вакансий', () => {
      render(TheSubnav, {
        global: {
          stubs: {
            FromAwesomIcon: true
          }
        },
        data() {
          return {
            onJobResultsPage: true
          }
        }
      })

      const jobCount = screen.getByText('999')

      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('когда пользователь не находится на странице поиска работы', () => {
    it('не отображаются вакансии', () => {
      render(TheSubnav, {
        global: {
          stubs: {
            FontAwesomeIcon: true
          }
        },
        data() {
          return {
            onJobResultsPage: false
          }
        }
      })

      const jobCount = screen.queryByText('999')

      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
