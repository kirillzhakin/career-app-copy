import { createPinia, setActivePinia } from 'pinia'

import { useUserStore } from '@/stores/user.js'

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
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  describe('loginUser', () => {
    it('пользователь вошел в систему', () => {
      const store = useUserStore()
      store.loginUser()
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
})
