import nextElementInList from '@/utils/nextElementInList'

describe('nextElementInList', () => {
  it('находит элемент в списке и возвращает следующий элемент', () => {
    const list = ['A', 'B', 'C', 'D', 'E']
    const value = 'C'
    const result = nextElementInList(list, value)
    expect(result).toBe('D')
  })

  describe('когда элемент находится в конце списка', () => {
    it('следующий элемент возвращается в начало списка', () => {
      const list = ['A', 'B', 'C', 'D', 'E']
      const value = 'E'
      const result = nextElementInList(list, value)
      expect(result).toBe('A')
    })
  })
})
