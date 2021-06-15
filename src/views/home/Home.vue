<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">集美商城</div>
    </nav-bar>
    <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        v-show="isTabFixed"
      ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <!-- 在组件上使用监听事件需添加.native修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";

    import NavBar from "components/common/navbar/NavBar";
    import TabControl from "components/content/tabControl/TabControl";
    import GoodsList from "components/content/goods/GoodsList";
    import Scroll from "components/common/scroll/Scroll";
    // import BackTop from "components/content/backTop/BackTop";

    import {
        getHomeMultidata,
        getHomeGoods
    } from "network/home";
    import {
        debounce
    } from "common/utils"
    import {
        imgListenerMixin,
        backTopMixin
    } from "common/mixin.js"

    export default {
        name: "Home",
        components: {
            HomeSwiper,
            RecommendView,
            FeatureView,
            NavBar,
            TabControl,
            GoodsList,
            Scroll,
        },
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    pop: {
                        page: 0,
                        list: []
                    },
                    new: {
                        page: 0,
                        list: []
                    },
                    sell: {
                        page: 0,
                        list: []
                    }
                },
                currentType: "pop",
                // isShowBackTop: false,
                tabOffsetTop: 0,
                isTabFixed: false,
                saveY: 0,
            };
        },
        // computed: {
        //     showGoods() {
        //       return this.goods[this.currentType].list
        //     }
        // },
        mixins: [imgListenerMixin, backTopMixin],
        destroyed() {
            console.log("destroyed");
        },
        activated() {
            this.$refs.scroll.scrollTo(0, this.saveY, 0)
            this.$refs.scroll.refresh()
        },
        deactivated() {
            //1.保存Y值
            this.saveY = this.$refs.scroll.getScrollY()
                //2.取消全局事件的监听
            this.$bus.$off("imgLoad", this.imgListener);
        },
        created() {
            // 1.请求多个数据
            // this.getHomeMultidata();
            getHomeMultidata().then(res => {
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            })

            //2.请求分类商品数据
            this.getHomeGoods("pop");
            this.getHomeGoods("new");
            this.getHomeGoods("sell");

        },
        mounted() {

        },
        methods: {
            /**
             * 事件监听相关方法
             */
            loadMore() {
                this.getHomeGoods(this.currentType)
            },

            //防抖
            debounce(func, delay) {
                let timer = null;
                return function(...args) {
                    if (timer) clearTimeout(timer)

                    timer = setTimeout(() => {
                        func.apply(this, args)
                    }, delay)
                }
            },
            //根据index赋予商品类型
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = "pop";
                        break;
                    case 1:
                        this.currentType = "new";
                        break;
                    case 2:
                        this.currentType = "sell";
                        break;
                }
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },
            // backClick() {
            //     // 通过$refs获取到组件，在获取到该组件对象，通过scroll对象调用其内部的方法scrollTo（）
            //     this.$refs.scroll.scrollTo(0, 0);
            // },
            // 监听事件滚动位置的坐标值
            contentScroll(position) {
                this.isShowBackTop = (-position.y) > 800;
                this.isTabFixed = (-position.y) > this.tabOffsetTop
            },
            /**
             * 网络请求相关方法
             */
            getHomeMultidata() {
                getHomeMultidata().then(res => {
                    // console.log(res);
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                });
            },
            getHomeGoods(type) {
                //获得请求分类页面当前的页数
                const page = this.goods[type].page + 1;
                getHomeGoods(type, page).then(res => {
                    // console.log(res);
                    const goods = res.data.list;
                    //将每次请求到的商品数据添加到list数组中
                    this.goods[type].list.push(...goods);
                    this.goods[type].page += 1;

                    this.$refs.scroll.finishPullUp()
                });
            },
            swiperImageLoad() {
                //获取tabControl的offsetTop
                // if (this.tabOffsetTop && this.$refs.tabControl2.$el.offsetTop) {
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
                    // }
            }
        }
    };
</script>

<style scoped>
    .home {
        /* padding-top: 44px; */
        height: 100vh;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: #ffffff;
        width: 100%;
        /* 浏览器原生滚动时  为使导航栏不随着一期滚动  */
        /* position: fixed;
        left: 0;
        top: 0;
        z-index: 9; */
    }

    .tab-control {
        position: relative;
        z-index: 9;
    }

    .content {
        height: 100vh;
        overflow: hidden;
    }

    .fixed {
        position: fixed;
        left: 0;
        right: 0;
        top: 44px;
    }
</style>
