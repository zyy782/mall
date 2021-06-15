<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="select-all"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计：{{totalPrice}} ￥
    </div>
    <div class="count">
      去计算
    </div>
  </div>
</template>

<script>
    import CheckButton from './CheckButton'
    export default {
        name: "BottomBar",
        components: {
            CheckButton
        },
        computed: {
            totalPrice() {
                // return '￥' + this.$store.state.cartList.filter(item => {
                //     return item.checked
                // }).reduce((preValue, item) => {
                //     return preValue + item.count * item.newPrice
                // }, 0).toFixed(2)
            }
        }

    }
</script>

<style scoped>
    .bottom-bar {
        position: relative;
        height: 40px;
        background-color: #e6e6e6;
        position: fixed;
        bottom: 44px;
        width: 100%;
        line-height: 40px;
        display: flex;
    }

    .check-content {
        display: flex;
    }

    .select-all {
        width: 20px;
        height: 20px;
        /* margin-top: 10px; */
        margin: 10px;
    }

    .total-price {
        margin-left: 20px;
    }

    .count {
        /* margin: 0px 0px 0px 80px; */
        width: 100px;
        text-align: center;
        background-color: var(--color-tint);
        position: fixed;
        right: 0;
    }
</style>
