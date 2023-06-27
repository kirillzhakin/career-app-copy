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

  it('пользователь фильтрует вакансии', () => {
    const store = useUserStore()
    expect(store.selectedOrganizations).toEqual([])
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
    it('пользователь получает отфильтрованные вакансии', () => {
      const store = useUserStore()
      store.ADD_SELECTED_ORGANIZATIONS(['Org1', 'Org2'])
      expect(store.selectedOrganizations).toEqual(['Org1', 'Org2'])
    })
  })
})
