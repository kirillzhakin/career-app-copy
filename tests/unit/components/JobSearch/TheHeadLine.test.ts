import { nextTick } from 'vue'
import { render, screen } from '@testing-library/vue'

import TheHeadLine from '@/components/JobSearch/TheHeadLine.vue'

describe('TheHeadLine', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('отобразить приветсвие', () => {
    render(TheHeadLine)
    const actionPhrase = screen.getByRole('heading', {
      name: /build for everyone/i
    })
    expect(actionPhrase).toBeInTheDocument()
  })
  it('отобразить призывы к действию actions', () => {
    const mock = vi.fn()
    vi.stubGlobal('setInterval', mock)
    render(TheHeadLine)
    expect(mock).toHaveBeenCalled()
  })

  it('отобразить следующий призыв к дейсвию', async () => {
    render(TheHeadLine)
    vi.advanceTimersToNextTimer()
    await nextTick()
    const actionPhrase = screen.getByRole('heading', {
      name: /create for everyone/i
    })
    expect(actionPhrase).toBeInTheDocument()
  })
  it('очистить интервал', () => {
    const clearInterval = vi.fn()
    vi.stubGlobal('clearInterval', clearInterval)
    const { unmount } = render(TheHeadLine)
    unmount()
    expect(clearInterval).toHaveBeenCalled()
    vi.unstubAllGlobals()
  })
})
