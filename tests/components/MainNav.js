import { render, screen } from '@testing-library/vue'

import MainNav from '@/components/MainNav.vue'

describe('MainNav', () => {
  it('Отобразить название', () => {
    render(MainNav)
    const companyName = screen.getByText('Lexicon Careers')
    expect(companyName).toBeInTheDocument()
  })
})
