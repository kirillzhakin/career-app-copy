import { render, screen } from '@testing-library/vue'

import TheSubnav from '@/components/Navigation/TheSubnav.vue'

describe('TheSubnav', () => {
  const routeSubnav = routeName => {
    render(TheSubnav, {
      global: {
        mocks: {
          $route: {
            name: routeName
          }
        },
        stubs: {
          FromAwesomIcon: true
        }
      }
    })
  }

  describe('когда пользоватуль на странице поиска работы', () => {
    it('отобразить счетчик вакансий', () => {
      routeSubnav('JobResults')
      const jobCount = screen.getByText('999')
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('когда пользователь не находится на странице поиска работы', () => {
    it('не отображаются вакансии', () => {
      routeSubnav('Home')
      const jobCount = screen.queryByText('999')
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
