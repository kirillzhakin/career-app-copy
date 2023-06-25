import { createPinia, setActivePinia } from 'pinia'

import { useUserStore } from '@/stores/user'

describe('store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('следит за состоянием isLoggedIn', () => {
    const store = useUserStore()
    expect(store.isLoggedIn).toBe(false)
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('пользователь вошел в систему', () => {
    const store = useUserStore()
    store.loginUser()
    expect(store.isLoggedIn).toBe(true)
  })
})
