import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  store: () => ({
    isLoggedIn: false
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true
    }
  }
})
