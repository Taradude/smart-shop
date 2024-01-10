<template>
  <div class="login-view">
    <h1>Login</h1>
    <BaseInput v-model="email" label="Email" placeholder="Enter your email" />
    <BaseInput v-model="password" label="Password" placeholder="Enter your password" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseInput from '@/components/BaseComponents/BaseInput.vue'
@Component({
  components: {
    BaseInput,
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
}
</script>

<style scoped lang="scss">
.login-view {
  padding: 44px;
  margin: 0 auto;
  height: 400px;
  width: 50%;
  background-color: $orange;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
