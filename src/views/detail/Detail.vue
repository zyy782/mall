<template>
  <div class="detail">
    <detail-nav-bar
      class="detail-nav-bar"
      @titleClick="titleClick"
    ></detail-nav-bar>
    <scroll
      :probe-type="3"
      class="content"
      ref="scroll"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import DetailBottomBar from "./childComps/DetailBottomBar";

    import Scroll from "components/common/scroll/Scroll";
    import GoodsList from "components/content/goods/GoodsList";
    import {
        getDetail,
        Goods,
        Shop,
        getRecommend
    } from "network/detail";
    import {
        debounce
    } from "common/utils";
    import {
        imgListenerMixin,
        backTopMixin
    } from "common/mixin";

    export default {
        name: "Detail",
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            Scroll,
            GoodsList
        },
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTopYs: [],
                getThemetopY: null
            };
        },
        mixins: [imgListenerMixin, backTopMixin],
        created() {
            //1.保存传入的iid
            this.iid = this.$route.params.iid;

            //2.根据iid请求详情数据
            getDetail(this.iid).then(res => {
                console.log(res);
                const data = res.result;
                //1.获取轮播图数据
                this.topImages = res.result.itemInfo.topImages;
                //2.获取商品信息
                this.goods = new Goods(
                    data.itemInfo,
                    data.columns,
                    data.shopInfo.services
                );
                //3.创建店铺信息对象
                this.shop = new Shop(data.shopInfo);
                //4.取出详情信息
                this.detailInfo = data.detailInfo;
                //5.取出商品参数信息
                this.paramInfo = data.itemParams;
                //6.取出评论信息
                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0] || {};
                }

                /*
    //1.第一次值不对---》this.$refs.params.$el压根没有渲染
    this.themeTopYs = [];
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

    this.$nextTick(() => {
      //2.第二次获取值不对----》图片没有计算在内
      //根据最新的数据，对应的DOM已经被渲染出来，
      //但是图片依然是没有加载完（目前获取到的offsetTop不包含图片）
       //一般offsetTop值不对都是图片导致的
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);
      });
 */
            });

            //3.请求推荐数据
            getRecommend().then((res, error) => {
                // console.log(res)
                if (error) return
                this.recommends = res.data.list;
            });
            //4.给 getThemetopY赋值并进行防抖
            this.getThemetopY = debounce(() => {});
        },
        mounted() {
            // console.log('mounted')
        },
        updated() {
            this.themeTopYs = [];

            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

        },
        destroyed() {
            this.$bus.$off("imgLoad", this.imgListener);
        },
        methods: {
            imageLoad() {
                this.newRefresh();
                this.getThemetopY();
            },
            titleClick(index) {
                // console.log(index);
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
            },
            // 监听事件滚动位置的坐标值
            contentScroll(position) {
                this.isShowBackTop = -position.y > 800;
            },
            addToCart() {
                //1.获取购物车需要展示的商品信息
                const product = {}
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.realPrice;
                product.iid = this.iid;
                //2.将商品添加到购物车里
                this.$store.commit('addCart', product)
                    // this.$store.dispatch('addCart', product).then((res, err) => {
                    //     if (res) {
                    //         console.log(res);
                    //     } else {
                    //         console.log(err)
                    //     }

                // })
            }
        }
    };
</script>

<style scoped>
    .detail {
        height: 100vh;
        background-color: #fff;
        position: relative;
        z-index: 1;
    }

    .content {
        background-color: #fff;
        height: calc(100% - 44px -49px);
        position: absolute;
        top: 44px;
        right: 0;
        bottom: 50px;
        left: 0;
        overflow: hidden;
        width: 100%;
    }
</style>
