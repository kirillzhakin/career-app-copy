import { createPinia, setActivePinia } from 'pinia'

import { useUserStore } from '@/stores/user'

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('следит за состоянием isLoggedIn', () => {
    const store = useUserStore()
    expect(store.isLoggedIn).toBe(false)
  })

  it('пользователь фильтрует вакансии по организации', () => {
    const store = useUserStore()
    expect(store.selectedOrganizations).toEqual([])
  })

  it('пользователь фильтрует вакансии по должности', () => {
    const store = useUserStore()
    expect(store.selectedJobTypes).toEqual([])
  })
  it('пользователь фильтрует вакансии по степени', () => {
    const store = useUserStore()
    expect(store.selectedDegrees).toEqual([])
  })

  it('хранение данных поиска квалификации и навыков', () => {
    const store = useUserStore()
    expect(store.skillsSearchTerm).toBe('')
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  describe('LOGIN_USER', () => {
    it('пользователь вошел в систему', () => {
      const store = useUserStore()
      store.LOGIN_USER()
      expect(store.isLoggedIn).toBe(true)
    })
  })

  describe('ADD_SELECTED_ORGANIZATIONS', () => {
    it('пользователь получает отфильтрованные вакансии по названию организации', () => {
      const store = useUserStore()
      store.ADD_SELECTED_ORGANIZATIONS(['Org1', 'Org2'])
      expect(store.selectedOrganizations).toEqual(['Org1', 'Org2'])
    })
  })
  describe('ADD_SELECTED_JOB_TYPES', () => {
    it('пользователь получает отфильтрованные вакансии по формату работы', () => {
      const store = useUserStore()
      store.ADD_SELECTED_JOB_TYPES(['Full-time', 'Part-time'])
      expect(store.selectedJobTypes).toEqual(['Full-time', 'Part-time'])
    })
  })
  describe('ADD_SELECTED_DEGREES', () => {
    it('пользователь получает отфильтрованные вакансии по степени', () => {
      const store = useUserStore()
      store.ADD_SELECTED_DEGREES(["Bachelor's", "Master's"])
      expect(store.selectedDegrees).toEqual(["Bachelor's", "Master's"])
    })
  })

  describe('UPDATE_SKILLS_SEARCH_TERM', () => {
    it('получает критерий поиска для навыков, введенных пользователем', () => {
      const store = useUserStore()
      store.skillsSearchTerm = ''
      store.UPDATE_SKILLS_SEARCH_TERM('Vue')
      expect(store.skillsSearchTerm).toBe('Vue')
    })
  })
  describe('CLEAR_USER_JOB_FILTER_SELECTIONS', () => {
    it('удалить все фильтры', () => {
      const store = useUserStore()
      store.selectedDegrees = ['Random degree']
      store.selectedJobTypes = ['Random job types']
      store.selectedOrganizations = ['Random organizations']
      store.skillsSearchTerm = 'Vue'

      store.CLEAR_USER_JOB_FILTER_SELECTIONS()

      expect(store.selectedDegrees).toEqual([])
      expect(store.selectedJobTypes).toEqual([])
      expect(store.selectedOrganizations).toEqual([])
      expect(store.skillsSearchTerm).toBe('')
    })
  })
})
