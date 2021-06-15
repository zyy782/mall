<template>
  <div class="shopcart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list class="cart-list" :cart-list="cartList"></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import CartList from './childComps/CartList'
    import BottomBar from './childComps/BottomBar'
    import {
        mapGetters
    } from 'vuex'
    export default {
        name: "Shopcart",
        components: {
            NavBar,
            CartList,
            BottomBar
        },
        computed: {
            ...mapGetters(['cartLength', 'cartList'])
            // cartLength() {
            //     return this.$store.getters.length;
            // },
            // cartList() {
            //     return this.$store.getters.cartList
            // }

        }
    }
</script>

<style scoped>
    .shopcart {
        height: 100vh;
        /* position: relative; */
    }

    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
        /* width: 100%; */
        /* font-weight: 500; */
        /* position: fixed; */
        /* left: 0;
        top: 0;
        z-index: 9; */
    }

    .cart-list {
        position: absolute;
        top: 44px;
        bottom: 49px;
        width: 100%;
        /* overflow: hidden; */
    }
</style>
