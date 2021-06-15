<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
    import GoodsListItem from './GoodsListItem'

    export default {
        name: "GoodsList",
        components: {
            GoodsListItem
        },
        props: {
            goods: {
                type: Array,
                default () {
                    return []
                }
            }
        }
    };
</script>

<style>
    .goods {
        /* 弹性盒元素在必要的时候拆行 */
        display: flex;
        flex-wrap: wrap;
        /* 在弹性盒对象的 <div> 元素中的各项周围留有空白 */
        justify-content: space-around;
        padding: 2px;
    }
</style>
