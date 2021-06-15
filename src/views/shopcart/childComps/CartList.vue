<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item,index) in $store.state.carList"
        ::key="item"
        :item-info="item"
        >{{ item }}</cart-list-item>
    </scroll>
  </div>
</template>

<script>
    import Scroll from "components/common/scroll/Scroll";
    import CartListItem from "./CartListItem.vue";
    import {
        mapGetters
    } from "vuex"

    export default {
        name: "CartList",
        components: {
            Scroll,
            CartListItem
        },
        computed: {
            ...mapGetters(['cartList'])
        },
        activated() {
            this.$refs.scroll.refresh()
        },

    };
</script>

<style scoped>
    .cart-list {
        /* height: 100vh; */
        /* height: calc(100% - 44px - 49px); */
        /* position: relative; */
    }

    .content {
        /* top: 44px; */
        height: calc(100% - 44px);
        /* position: absolute; */
        overflow: hidden;
    }
</style>
