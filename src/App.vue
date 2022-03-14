<!--- <template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template> --->

<template>
  <div class="homeWrap">
    <el-container style="height: 100%">
      <el-aside width="300px">
        <!---<div className="menu-title">
          els工具箱
        </div>--->
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
        >
          <router-link v-for="(item, index) in menuJson" :to="item.path" :key="index" @click="activeUpdate(index)">
            <el-menu-item :index="item.path">
              <el-icon><icon-menu /></el-icon>
              <span>{{item.name}}</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-top">
            <el-page-header :icon="ArrowLeft" :content="menuJson[activeIndex].name" @back="headerBack(this)" style="margin-left: 12px"/>

          </div>
        </el-header>
        <el-main>
          <transition name="fade"><router-view></router-view></transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue"
  import { useRouter } from 'vue-router'
  import router from "./router"
  const menuJson: object[] = [
    {name: "首页", path: "/", key: 0},
    {name: "收集册模拟器", path: "/about", key: 1}
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
}
.menu-title{
  width: 100%;
  height: 100px;
  text-align: center;
}
.el-header{
  padding: 0 !important
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
