import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import MainNav from '@/components/Navigation/MainNav.vue'
import { useUserStore } from '@/stores/user.js'

describe('MainNav', () => {
  const renderMainNav = () => {
    const pinia = createTestingPinia()

    const $route = {
      name: 'Home'
    }
    render(MainNav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route
        },
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
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
      const userStore = useUserStore()

      let profileImage = screen.queryByRole('img', {
        name: /user image/i
      })
      expect(profileImage).not.toBeInTheDocument()

      const loginButton = screen.getByRole('button', {
        name: /sign in/i
      })
      userStore.isLoggedIn = true
      await userEvent.click(loginButton)

      //   profileImage = screen.getByRole('img', {
      //     name: /^user image$/i
      //   })
      //   expect(profileImage).toBeInTheDocument()
    })
  })
})
