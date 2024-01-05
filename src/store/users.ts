export default {
  namespaced: true,
  state: {
    email: '',
    password: '',
  },
  getters: {},
  mutations: {
    setEmail(state: any, email: string) {
      state.email = email
    },
    setPassword(state: any, password: string) {
      state.password = password
    },
  },
  actions: {},
}
