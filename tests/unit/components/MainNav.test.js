import { render, screen } from '@testing-library/vue'

import MainNav from '@/components/MainNav.vue'

describe('MainNav', () => {
  it('Отобразить название', () => {
    render(MainNav)
    const companyName = screen.getByText('Lexicon Careers')
    expect(companyName).toBeInTheDocument()
  })

  it('Отобразить меню навигации', () => {
    render(MainNav)
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
})
