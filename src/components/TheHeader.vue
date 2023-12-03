<template>
  <header class="header">
    <div class="top">
      <nav class="header__nav">
        <router-link :to="{ name: 'HomeView' }"
          ><img id="logo" src="@/assets/robot.png" alt="logo"
        /></router-link>
        <router-link :to="{ name: 'HomeView' }"> <h3>Home</h3> </router-link>
        <input id="search" type="text" placeholder="Search" />
        <router-link :to="{ name: 'ProductsView' }"> <h3>Products</h3></router-link>
        <div class="login-cart-wrap">
          <router-link :to="{ name: 'LoginView' }"
            ><img id="login" src="@/assets/user.png" alt="" />
          </router-link>
          <router-link :to="{ name: 'CartView' }">
            <img id="cart" src="@/assets/shopping-cart2.png" alt="" /> <span>{{ cartItemsLength }}</span>
          </router-link>
        </div>
      </nav>
    </div>
    <div class="bottom">
      <div>
        <p>Price from:</p>
        <BaseInputRange />
      </div>
      <div>
        <p>Price to:</p>
        <BaseInputRange />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BaseInputRange from '@/components/BaseComponents/BaseInputRange.vue'

@Component({
  components: {
    BaseInputRange,
  },
})
export default class TheHeader extends Vue {
  get productsList(): any {
    return this.$store.state.cart.cartList
  }
  get cartItemsLength(): any {
    return this.$store.state.cart.totalItems
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 32px 48px;
  background-color: $orange;
  text-align: left;
  a:hover {
    text-decoration: underline $black;
  }

  &__nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 25px;
  }
}

h3 {
  color: $blue;
}

#logo {
  height: 180px;
  position: absolute;
  left: -50px;
  top: 0;
  transition: all 0.25s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
}
.login-cart-wrap {
  display: flex;
}

#cart,
#login {
  margin-left: 5px;
  width: 50px;
  transition: all 0.25s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
}
// .top {
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   flex-wrap: wrap;
// }
.bottom {
  display: flex;
  justify-content: center;
}
#search {
  background-color: $blue;
  color: white;
  padding: 12px;
  border-radius: 15px;
  width: 30%;

  &::placeholder {
    color: $white;
    opacity: 0.8;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }
}

a:last-child {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

a span {
  position: absolute;
  color: $white;
  font-weight: bold;
  font-size: 16px;
}
</style>
