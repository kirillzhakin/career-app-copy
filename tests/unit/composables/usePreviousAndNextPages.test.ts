import { ref } from 'vue'

import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages'

describe('usePreviousAndNextPages', () => {
  it('вычисляет предыдущую страницу', () => {
    const currentPage = ref(8)
    const maxPage = ref(10)
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage)
    expect(previousPage.value).toBe(7)
  })

  describe('когда текущая страница является первой', () => {
    it('previous page не отображается', () => {
      const currentPage = ref(1)
      const maxPage = ref(1)
      const { previousPage } = usePreviousAndNextPages(currentPage, maxPage)
      expect(previousPage.value).toBeUndefined()
    })
  })

  it('вычисляет последующую страницу', () => {
    const currentPage = ref(8)
    const maxPage = ref(10)
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage)
    expect(nextPage.value).toBe(9)
  })

  describe('когда текущая страница является последней', () => {
    it('previous page не отображается', () => {
      const currentPage = ref(10)
      const maxPage = ref(10)
      const { nextPage } = usePreviousAndNextPages(currentPage, maxPage)
      expect(nextPage.value).toBeUndefined()
    })
  })
})
