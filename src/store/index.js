import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        carList: []
    },
    getters,
    /**
    mutations: {
        addCounter(state, payload) {
            payload.count += 1;
        },
        addCart(state, payload) {
            state.cartList.push(payload);
        }
    },
    actions: {
        addCart(context, payload) {
            return new Promise((resolve, reject) => {
                // 1.查找之前的数组中是否有该商品
                let oldProduct = null;
                // for … of遍历获取的是对象的键值,for … in 获取的是对象的键名
                for (let item of context.carList) {
                    if (item.iid === payload.iid) {
                        oldProduct = item;
                    }
                }
                // 2.判断oldProduct
                if (oldProduct) {
                    context.commit('addCounter', oldProduct);
                    resolve('当前的商品数量+1')
                } else {
                    payload.count = 1;
                    context.commit('addToCart', payload);
                    resolve('添加购物车成功')
                }
            })
        }
    }
 */
    mutations: {
        //payload新增加的商品
        addCart(state, payload) {
            return new Promise((resolve, reject) => {

                let oldProduct = null;
                // for … of遍历获取的是对象的键值,for … in 获取的是对象的键名
                for (let item of state.carList) {
                    if (item.iid === payload.iid) {
                        oldProduct = item;
                    }
                }
                // console.log(oldProduct);
                // let oldPrduct = state.carList.find(item => item.iid === payload.iid)
                if (oldProduct) {
                    oldProduct.count += 1;
                    resolve("当前商品数量+1")
                        // alert("tianjaichegng ")
                } else {
                    payload.count = 1;
                    payload.checked = true;
                    state.carList.push(payload);
                    resolve("添加购物车成功")
                }

            });

        }
    }
});

export default store;
