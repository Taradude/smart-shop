<template>
  <div class="registration-view">
    <h1>Registration</h1>

    <BaseInput v-model="email" label="Email" placeholder="Enter your email" id="login" />
    <BaseInput v-model="password" label="Password" placeholder="Enter your password" id="password" />
    <BaseButton text="Register" @click.native="register" />

    <span
      >Already have an account? Then
      <router-link :to="{ name: 'LoginView' }"><span>login now</span></router-link>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseInput from '@/components/BaseComponents/BaseInput.vue'
import BaseButton from '@/components/BaseComponents/BaseButton.vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
@Component({
  components: {
    BaseInput,
    BaseButton,
  },
})
export default class RegistrationView extends Vue {
  get email(): string {
    return this.$store.state.users.email
  }
  set email(value: string) {
    this.$store.commit('users/setEmail', value)
  }
  set password(value: string) {
    this.$store.commit('users/setPassword', value)
  }
  get password(): string {
    return this.$store.state.users.password
  }
  async register() {
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password)
      const user = userCredential.user
      console.log('User registered successfully:', user)
    } catch (error) {
      console.error('Registration error:', error)
    }
  }
}
</script>

<style scoped lang="scss">
.registration-view {
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
  span {
    font-size: 20px;
    font-weight: bold;
    padding-top: 12px;
  }
}
</style>
