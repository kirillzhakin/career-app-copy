import { render, screen } from '@testing-library/vue'

import HeaderContainer from '@/components/Shared/HeaderContainer.vue'

describe('HeaderContainer', () => {
  it('компонент отображает title', () => {
    render(HeaderContainer, {
      slots: {
        title: '<h1>Some title</h1>'
      }
    })
    expect(screen.getByText('Some title')).toBeInTheDocument()
  })

  it('компонент отображает subtitle', () => {
    render(HeaderContainer, {
      slots: {
        subtitle: '<h2>Some subtitle</h2>'
      }
    })
    expect(screen.getByText('Some subtitle')).toBeInTheDocument()
  })
})
