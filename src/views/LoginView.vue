<template>
  <div class="login-view">
    <h1>Login</h1>
    <BaseInput v-model="email" label="Email" placeholder="Enter your email" id="login" />
    <BaseInput
      v-model="password"
      label="Password"
      placeholder="Enter your password"
      id="password"
      type="password"
    />
    <BaseButton text="Login" @click.native="login" />

    <span
      >Don't have an account yet ? Then
      <router-link :to="{ name: 'RegistrationView' }">register now</router-link>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseInput from '@/components/BaseComponents/BaseInput.vue'
import BaseButton from '@/components/BaseComponents/BaseButton.vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import router from '@/router'

@Component({
  components: {
    BaseInput,
    BaseButton,
  },
})
export default class LoginView extends Vue {
  get email(): string {
    return this.$store.state.users.email
  }
  set email(value: string) {
    this.$store.commit('users/setEmail', value)
  }
  get password(): string {
    return this.$store.state.users.password
  }
  set password(value: string) {
    this.$store.commit('users/setPassword', value)
  }

  async login() {
    try {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, this.email, this.password)
      router.push('/')
    } catch (error) {
      console.error('Login error:', error)
    }
  }
}
</script>

<style scoped lang="scss">
.login-view {
  padding: 44px;
  margin: 0 auto;
  width: 50%;
  min-width: 350px;
  background-color: $orange;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;

  span,
  a {
    font-size: 20px;
    font-weight: bold;
    padding-top: 12px;
  }
}
</style>
