<template>
  <div id="app">
    <!-- 使用keep-alive开启路由缓存，保证离开页面组件时不会销毁该组件。 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
    import MainTabBar from "components/content/mainTabbar/MainTabBar";

    export default {
        name: "App",
        components: {
            MainTabBar
        }
    };
</script>

<style>
    @import "./assets/css/base.css";
</style>
