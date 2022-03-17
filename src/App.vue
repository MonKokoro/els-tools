<!--- <template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template> --->

<template>
  <transition name="fade">
    <IceBurnerResult v-if="this.$store.state.iceBurnerResultShow" />
  </transition>
  <div class="homeWrap">
    <el-container style="height: 100%">
      <el-aside width="300px">
        <!---<div className="menu-title">
          els工具箱
        </div>--->
        
        <el-menu
          :default-active="getCurrentRouter().path"
          class="el-menu-vertical-demo"
        >
          <router-link v-for="(item, index) in menuJson" :to="item.path" :key="item.path" @click="activeUpdate(index)">
            <el-menu-item :index="item.path">
              <el-icon><icon-menu /></el-icon>
              <span>{{item.name}}</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="74px">
          <div class="header-top">
            <el-page-header :icon="ArrowLeft" :content="getCurrentRouter().name" @back="headerBack(this)" style="margin-left: 12px"/>
            <div class="header-message">
              <el-icon><chat-line-round /></el-icon>
              艾尔工具箱v1.0上线啦
            </div>
          </div>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue"
  import { useRouter } from 'vue-router'
  import router from "./router"
  import { ChatLineRound, ArrowLeft } from '@element-plus/icons-vue'
  import IceBurnerResult from "./components/IceBurnerResult.vue"
  const menuJson: object[] = [
    {name: "首页", path: "/"},
    {name: "收集册模拟器", path: "/about"},
    {name: "挫冰模拟器", path: "/ice-burners-imitater"},
  ]
  let activeIndex = ref(0)
  function activeUpdate(index: number): any {
    activeIndex.value = index
  }
  function elPageHeaderIcon(index: number): string {
    return index !== 0 ? "ArrowLeft" : ""
  }
  function headerBack(this: any) {
    activeIndex.value = 0
    router.replace('/');
  }
  function getCurrentRouter(): object {
    let currentRouter = useRouter();
    return currentRouter.currentRoute.value
  }
</script>

<script lang="ts">

export default {
  components: {
    
  },
}
</script>

<style lang="less">
a{ text-decoration: none }
.route-link-active{ text-decoration: none }

.homeWrap{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  min-width: 1080px;
  overflow: hidden;
}
.menu-title{
  width: 100%;
  height: 100px;
  text-align: center;
}
.el-header{
  padding: 0 !important;
}
.el-main{
  background: #F0F0F0;
}
.header-top{
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .el-page-header{
    line-height: 50px;
  }
  .header-message{
    width: 100%;
    height: 24px;
    font-size: 12px;
    line-height: 12px;
    padding: 6px 12px;
    color: rgba(0,21,41,.8)
  }
}

.fade-enter-from, .fade-leave-to{ opacity: 0 }
.fade-enter-active, .fade-leave-active{ transition: all 0.6s ease; }
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
