<template>
  <header class="header">
    <div class="top">
      <nav>
        <router-link to=""> Home Page</router-link>
        <router-view />
      </nav>
      <div class="header__top">
        <nav class="header__nav">
          <router-link :to="{ name: 'HomeView' }"
            ><img id="logo" src="@/assets/robot.png" alt="logo"
          /></router-link>
          <h1>Smart Shop</h1>
          <div class="input-wrap">
            <input id="search" type="text" placeholder="Search" />
            <button class="search-button"><img src="@/assets/search.png" alt="" /></button>
          </div>

          <router-link :to="{ name: 'HomeView' }"> <h3>Home</h3> </router-link>
          <router-link :to="{ name: 'ProductsView' }"> <h3>Products</h3></router-link>
          <router-link :to="{ name: 'LoginView' }"
            ><img id="login" src="@/assets/user.png" alt="" />
          </router-link>
          <router-link :to="{ name: 'CartView' }">
            <img id="cart" src="@/assets/shopping-cart2.png" alt="" /> <span>{{ cartItemsLength }}</span>
          </router-link>
        </nav>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom__select">
        <select name="" id="">
          <option value="Category" selected>Category</option>
        </select>
      </div>
      <div class="bottom__price">
        <p>Price from:</p>
        <BaseInputRange />
      </div>
      <div class="bottom__price">
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
  a {
    display: flex;
    align-items: center;
    margin-left: 12px;
  }
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
  flex-wrap: wrap;
}

#cart,
#login {
  width: 50px;
  transition: all 0.25s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
}

.bottom {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
#search {
  background-color: $blue;
  color: white;
  padding: 12px;
  border-radius: 15px;
  width: 30%;
  background-color: $blue;

  &::placeholder {
    color: $white;
    opacity: 0.8;
    font-weight: bold;
    font-size: 16px;
  }
}
.search-button {
  position: absolute;
  top: 0;
  right: 12px;
  bottom: 0;
  color: $orange;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 0 15px 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 25px;
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
