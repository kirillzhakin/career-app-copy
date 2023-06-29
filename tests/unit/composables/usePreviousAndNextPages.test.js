import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages.js'

describe('usePreviousAndNextPages', () => {
  it('вычисляет предыдущую страницу', () => {
    const currentPage = { value: 8 }
    const maxPage = { value: 10 }
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage)
    expect(previousPage.value).toBe(7)
  })

  describe('когда текущая страница является первой', () => {
    it('previous page не отображается', () => {
      const currentPage = { value: 1 }
      const maxPage = { value: 1 }
      const { previousPage } = usePreviousAndNextPages(currentPage, maxPage)
      expect(previousPage.value).toBeUndefined()
    })
  })

  it('вычисляет последующую страницу', () => {
    const currentPage = { value: 8 }
    const maxPage = { value: 10 }
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage)
    expect(nextPage.value).toBe(9)
  })

  describe('когда текущая страница является последней', () => {
    it('previous page не отображается', () => {
      const currentPage = { value: 10 }
      const maxPage = { value: 10 }
      const { nextPage } = usePreviousAndNextPages(currentPage, maxPage)
      expect(nextPage.value).toBeUndefined()
    })
  })
})
