import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import MainNav from '@/components/MainNav.vue'

describe('MainNav', () => {
  const renderMainNav = () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }

  it('Отобразить название', () => {
    renderMainNav()
    const companyName = screen.getByText('Lexicon Careers')
    expect(companyName).toBeInTheDocument()
  })

  it('Отобразить меню навигации', () => {
    renderMainNav()

    const navigationMenuItems = screen.getAllByRole('listitem')
    const navigationMenuText = navigationMenuItems.map(item => item.textContent)
    expect(navigationMenuText).toEqual([
      'Teams',
      'Locations',
      'Life at Lexicon',
      'How we hire',
      'Students',
      'Jobs'
    ])
  })
  describe('Аутентификация пользователя', () => {
    it('Отображение аватара пользователя', async () => {
      renderMainNav()

      let profileImage = screen.queryByRole('img', {
        name: /avatar/i
      })
      expect(profileImage).not.toBeInTheDocument()

      const loginButton = screen.getByRole('button', {
        name: /sign in/i
      })
      await userEvent.click(loginButton)

      // profileImage = screen.getByRole('img', {
      //   name: /avatar/i
      // })
      // expect(profileImage).toBeInTheDocument()
    })
  })
})
