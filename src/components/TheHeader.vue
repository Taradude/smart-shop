<template>
  <header class="header">
    <div class="top">
      <div class="header__top">
        <nav class="header__nav">
          <router-link :to="{ name: 'HomeView' }"
            ><img id="logo" src="@/assets/robot.png" alt="logo"
          /></router-link>
          <h1>Smart Shop</h1>
          <div class="input-wrap">
            <input id="search" type="text" placeholder="Search" @input="onInput" v-model="searchValue" />
            <!-- <button class="search-button"><img src="@/assets/search.png" alt="" /></button> -->
            <div class="filtered-items" v-if="filteredProductsBySearch.length >= 1">
              <p v-for="product in filteredProductsBySearch" @click="emitGoToItem(product)" :key="product.id">
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
            ><img id="login" src="@/assets/user.png" alt="" />
          </router-link>
          <router-link :to="{ name: 'CartView' }">
            <img id="cart" src="@/assets/shopping-cart2.png" alt="" /> <span>{{ cartItemsLength }}</span>
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { IProduct } from '@/interfaces/products'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class TheHeader extends Vue {
  // @Prop({ default: 0 }) value!: number | string

  get productsList(): any {
    return this.$store.state.cart.cartList
  }
  get cartItemsLength(): any {
    return this.$store.state.cart.totalItems
  }
  get filteredProductsBySearch(): any {
    return this.$store.state.products.filteredBySearch
  }
  searchValue = ''

  onInput() {
    this.$emit('update:searchValue', this.searchValue)
  }
  emitGoToItem(product: IProduct) {
    this.$store.commit('products/setCurrentProduct', product)
    console.log('product')
    this.$router.push({
      name: 'ProductItemView',
      params: { name: product.title.replace(/\s/g, '-').toLowerCase() },
    })
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
    gap: 25px;
  }
}

#logo {
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

#cart,
#login {
  width: 50px;
  height: 50px;
  transition: all 0.25s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
}

.input-wrap {
  width: 30%;
  position: relative;
}
#search {
  color: white;
  width: 100%;
  height: 100%;
  padding: 18px;
  font-size: 18px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
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

.filtered-items {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
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
</style>
