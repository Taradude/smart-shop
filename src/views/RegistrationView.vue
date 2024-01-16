<template>
  <div class="registration-view">
    <h1>Registration</h1>

    <BaseInput
      v-model="email"
      label="Email"
      placeholder="Enter your email"
      id="login"
      errorMessage="Email must be valid"
      :isErrorShown="emailError"
      @blur="errorCheck('email')"
    />
    <BaseInput
      v-model="password"
      label="Password"
      placeholder="Enter your password"
      id="password"
      errorMessage="Password must be at least 8 symbols"
      :isErrorShown="passwordError"
      @blur="errorCheck('password')"
    />
    <BaseButton :isDisabled="isButtonDisabled" text="Register" @click.native="register" />

    <span
      >Already have an account? Then
      <router-link :to="{ name: 'LoginView' }">login now</router-link>
    </span>
    <BaseNotification
      :text="notificationText"
      :isShown.sync="isNotificationShown"
      @update:isShown="updateIsShown"
      ref="baseNotification"
      :isError="isError"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseInput from '@/components/BaseComponents/BaseInput.vue'
import BaseButton from '@/components/BaseComponents/BaseButton.vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import BaseNotification from '@/components/BaseComponents/BaseNotification.vue'
@Component({
  components: {
    BaseInput,
    BaseButton,
    BaseNotification,
  },
})
export default class RegistrationView extends Vue {
  emailError = false
  passwordError = false
  regExpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  isNotificationShown = false
  notificationText = ''
  isError = false

  get isButtonDisabled() {
    return !this.regExpEmail.test(this.email) || this.password.length < 8
  }
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
  async register() {
    try {
      const auth = getAuth()
      await createUserWithEmailAndPassword(auth, this.email, this.password)
      this.notificationText = 'User registered successfully'
      this.isNotificationShown = true
      this.isNotificationShown = true
      this.notificationText = 'User registered successfully'
      ;(this.$refs.baseNotification as any).resetTimeout()
      this.isError = false
    } catch (error: any) {
      this.notificationText = error
      this.isNotificationShown = true
    }
  }
  errorCheck(type: 'password' | 'email') {
    if (type === 'password') {
      this.passwordError = this.password.length < 8
    } else if (type === 'email') {
      this.emailError = !this.regExpEmail.test(this.email)
    }
  }
  updateIsShown(value: any) {
    this.isNotificationShown = value
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

  span,
  a {
    font-size: 20px;
    font-weight: bold;
    padding-top: 12px;
  }
}
</style>
