<template>
  <header class="header">
    <nav class="header__nav">
      <router-link :to="{ name: 'HomeView' }"
        ><img class="logo" src="@/assets/robot.png" alt="logo"
      /></router-link>
      <h1>Smart Shop</h1>
      <div v-click-outside="hideSearchResult" class="input-wrap">
        <input
          :class="['input-wrap__search', { 'input-active': isFilteredProductsBySearchShown }]"
          type="text"
          placeholder="Search"
          @input="onSearchInput"
          v-model="searchValue"
          @click="showSearchResult"
        />
        <div class="filtered-items" v-if="isFilteredProductsBySearchShown">
          <p v-for="product in filteredProductsBySearch" @click="goToItem(product)" :key="product.id">
            {{ product.title }}
          </p>
        </div>
      </div>

      <router-link :to="{ name: 'HomeView' }"> <h3>Home</h3> </router-link>
      <router-link
        :to="{
          name: 'ProductsView',
          params: { currentPage: '1', currentOption: $store.state.products.currentOption || 'all' },
        }"
      >
        <h3>Products</h3></router-link
      >
      <router-link :to="{ name: 'LoginView' }"
        ><img class="login" :src="isUserLoggedIn" alt="" />
      </router-link>
      <router-link :to="{ name: 'CartView' }">
        <img class="cart" src="@/assets/shopping-cart2.png" alt="" /> <span>{{ cartItemsLength }}</span>
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { IProduct } from '@/interfaces/products'
import { Vue, Component } from 'vue-property-decorator'
import { instanceApi } from '@/api/mainInstance'
import vClickOutside from 'v-click-outside'

@Component
export default class TheHeader extends Vue {
  searchValue = ''
  timeOut: undefined | number = undefined
  filteredProductsBySearch: IProduct[] = []
  filteredProductSwitch = false

  get productsList(): any {
    return this.$store.state.cart.cartList
  }
  get cartItemsLength(): any {
    return this.$store.state.cart.totalItems
  }

  get isFilteredProductsBySearchShown() {
    return this.filteredProductsBySearch.length > 0 && this.filteredProductSwitch
  }

  get isUserLoggedIn() {
    return this.$store.state.users.email ? require('@/assets/loggedIn.png') : require('@/assets/user.png')
  }
  created() {
    Vue.use(vClickOutside)
  }
  hideSearchResult() {
    this.filteredProductSwitch = false
  }
  showSearchResult() {
    this.filteredProductSwitch = true
  }
  onSearchInput() {
    if (this.timeOut) clearTimeout(this.timeOut)

    this.timeOut = setTimeout(async () => {
      const {
        data: { products },
      } = await instanceApi.get(`/products/search?q=${this.searchValue}`)
      this.filteredProductsBySearch = [...products]
    }, 300)
  }
  goToItem(product: IProduct) {
    this.$store.commit('products/setCurrentProduct', product)
    this.$router.push({
      name: 'ProductItemView',
      params: { name: product.title.replace(/\s/g, '-').toLowerCase() },
    })
    this.hideSearchResult()
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
  }
  a:hover {
    text-decoration: underline $black;
  }

  &__nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  }
}

.logo {
  height: 140px;
  position: absolute;
  left: -40px;
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

.cart,
.login {
  width: 50px;
  height: 50px;
  transition: all 0.25s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
}
.loggedIn {
  background-image: url('@/assets/loggedIn.png');
  width: 100%;
  height: 100%;
}

.input-wrap {
  width: 30%;
  position: relative;

  &__search {
    color: white;
    width: 100%;
    height: 100%;
    padding: 18px;
    font-size: 18px;
    border-radius: 12px;
    background-color: $blue;

    &::placeholder {
      color: $white;
      opacity: 0.8;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
.input-active {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
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

.filtered-items {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  max-height: 600px;
  overflow: auto;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  background-color: $blue;
  opacity: 0.9;
  z-index: 100;
  border: 1px solid;
  padding: 6px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  p {
    margin: 0;
    padding: 8px;
    color: $white;

    &:hover {
      cursor: pointer;
      background-color: $white;
      opacity: 0.9;
      color: $black;
      border-radius: 6px;
    }
  }
}
@media screen and (max-width: 600px) {
  .header {
    padding: 32px 24px;
    text-align: center;

    &__nav {
      flex-direction: column;
      gap: 15px;
    }

    .logo {
      height: 80px;
      left: -20px;
    }

    .input-wrap {
      width: 90%;
      margin: 12px auto;
    }
    a {
      padding: 6px;
    }
  }
}
</style>
