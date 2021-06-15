import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop";
import { POP, NEW, SELL } from "./const";

export const imgListenerMixin = {
    data() {
        return {
            // 监听图片
            imgListener: null,
            newRefresh: null
        };
    },
    mounted() {
        // 给防抖函数赋值一个新的函数
        this.newRefresh = debounce(this.$refs.scroll.refresh, 100);

        // 接收发射的事件总线,并用监听图片变量保存
        this.imgListener = () => {
            this.newRefresh();
        };
        this.$bus.$on("imgLoad", this.imgListener);
    }
};

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            // 当前滚动的位置
            isShowBackTop: false
        };
    },
    methods: {
        // 回到顶部
        backClick() {
            // 调用子组件里面封装的scrollTo方法即可
            this.$refs.scroll.scrollTo(0, 0, 300);
        }
    }
};


export const tabControlMixin = {
    data: function() {
        return {
            currentType: POP
        }
    },
    methods: {
        tabClick(index) {
            switch (index) {
                case 0:
                    this.currentType = POP
                    break
                case 1:
                    this.currentType = NEW
                    break
                case 2:
                    this.currentType = SELL
                    break
            }
            // console.log(this.currentType);
        }
    }
}
