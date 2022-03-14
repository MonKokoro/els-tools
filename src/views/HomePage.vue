<template>
  <div class="common-layout home-page">
    <div class="home-welcome">
      <div>艾尔工具箱上线啦！</div>
    </div>
    <div class="home-update-log"></div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    // HelloWorld,
  },
});
</script>

<style lang="less">
.home-page{
  width: 100%;
  height: 100%;
  .home-welcome{
    display: flex;
    width: 100%;
    height: 500px;
    justify-content: center;
    align-items: center;
  }
  .home-update-log{
    display: flex;
    width: 100%;
    height: 300px;
  }
}
</style>