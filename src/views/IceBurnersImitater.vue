<template>
  <!---<transition name="fade">
    <IceBurnerResult v-if="resultVisible" :visibleClose="visibleClose"/>
  </transition>--->
  <div class="ice-burners-imilater">
    <div class="ice-burner">
      <div class="ice-burner-set">
        <el-icon :class="`ice-burner-set-icon ${settingJson.settingVisibility ? 'ice-burner-set-icon-rotation' : ''}`" :size="50" color="#ccc" @click="optionClick('settingVisibility')"><setting /></el-icon>
        <CheckboxList :config="configJson" :className="`ice-burner-set-list`" :hidden="!settingJson.settingVisibility"/>
      </div>
      <div class="ice-burner-center">
        <div class="ice-burner-img">
          <div class="img-burner"><img src="../assets/ice-burner.png" /></div>
          <div class="img-key"><img src="../assets/ice-sculpture-key.png" /></div>
        </div>
        <div class="ice-burner-button">
          <el-button size="large" type="success" @click="gacha(1)">抽1次</el-button>
          <el-button size="large" type="success" @click="gacha(10)">抽10次</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { Setting } from '@element-plus/icons-vue'
import CheckboxList from "../components/CheckboxList.vue"
import IceBurnerResult from "../components/IceBurnerResult.vue"
import store from '@/store';

interface settingJsonRule {
  [key: string]: boolean
}

let settingJsonSoutce: settingJsonRule = {
  settingVisibility: false,
  animationDisabled: true,
  seClosed: true
}
let settingJson = reactive(settingJsonSoutce)

let configJson = reactive([
  { value: settingJson["animationDisabled"], label: "禁用动画效果" },
  { value: settingJson["seClosed"], label: "禁用音效" }
])

export default defineComponent({
  name: 'IceBurnersImitater',
  setup(){
    function optionClick(str: string){
      settingJson[str] = !settingJson[str]
    }
    function gacha(num: number){
      store.commit('iceBurnerGacha', num)
      store.commit('iceBurnerResultChanged')
    }
    return { 
      settingJson,
      configJson,
      optionClick,
      gacha
    }
  },
  components: {
    Setting, CheckboxList, IceBurnerResult
  },
});
</script>

<style lang="less">
.fade-enter-from, .fade-leave-to{ opacity: 0 }
.fade-enter-active, .fade-leave-active{ transition: all 0.3s ease; }
.ice-burners-imilater{
  width: 100%;
  height: 100%;
  background: white;
  background-image: url('../assets/aurora-mystica.png');
  background-position: bottom right;
  background-size: auto 100%;
  background-repeat: no-repeat;
  .ice-burner{
    width: 100%;
    height: 100%;
    position: relative;
    .ice-burner-set{
      position: absolute;
      left: 12px;
      top: 12px;
      .ice-burner-set-icon{
        cursor: pointer;
        float: left;
        transition: all 0.3s;
      }
      .ice-burner-set-icon-rotation{
        transform: rotate(180deg);
      }
      .ice-burner-set-list{
        float: left;
        position: relative;
        left: 12px;
        top: 6px;
        .el-checkbox{
          height: 30px;
        }
      }
    }
    .ice-burner-center{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      user-select: none;
      .ice-burner-img{
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%,-50%);
        .img-burner{
          margin: 0 auto;
        }
        .img-key{
          position: absolute;
          top: 19%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }
      .ice-burner-button{
        text-align: center;
        margin-top: 12px;
        width: 100%;
      }
    }
  }
}
</style>
