<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <!-- 滚动区域设置插槽，业务调用该模块时自动将插槽替换为业务内容，实现业务内容的滚动 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
    import BScroll from "better-scroll";

    export default {
        name: "Scroll",
        props: {
            /**
             * probeType
             * 0,1:不侦测滚动
             * 2，手指触摸屏幕时侦测滚动
             * 3，手指离开屏幕依然侦测滚动
             */
            probeType: {
                type: Number,
                default () {
                    return 0;
                }
            },
            // 是否上拉加载更多
            pullUpLoad: {
                type: Boolean,
                default () {
                    return false;
                }
            }
        },
        data() {
            return {
                //scroll对象
                scroll: null
            };
        },
        mounted() {
            // 1.创建BScroll对象  初始化
            /**
             * ref 需要在dom渲染完成后才会有----> mounted(){} 钩子中调用
             * this.$refs.wrapper引用ref=wrapper的标签
             */
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true, //控制div是否可以点击
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad
            });

            // 2.监听滚动的位置
            this.scroll.on("scroll", position => {
                // console.log(position);
                this.$emit("scroll", position);
            });

            // 3.监听上拉加载更多事件
            this.scroll.on("pullingUp", () => {
                // console.log("pullingUp");
                this.$emit("pullingUp");
            });
        },
        methods: {
            scrollTo(x, y, time = 300) {
                this.scroll && this.scroll.scrollTo(x, y, time);
            },
            // 完成上拉加载
            finishPullUp() {
                this.scroll.finishPullUp();
            },
            //如果子元素或者父元素 DOM 结构发生改变的时候，必须重新调用 scroll.refresh() 方法重新计算来确保滚动效果的正常。
            refresh() {
                // 代理better-scroll的refresh方法
                // console.log("------------------");
                this.scroll && this.scroll.refresh();
            },
            getScrollY() {
                // 判断this.scroll是否有值，如果有返回y的值，没有返回0
                return this.scroll ? this.scroll.y : 0;
                // return this.scroll.y
            }
        }
    };
</script>

<style scoped></style>
