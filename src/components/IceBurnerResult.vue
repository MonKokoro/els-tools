<template>
    <div :class="`ice-burner-result`">
        <div :class="`modal-mask`"></div>
        <div :class="`result-modal ${this.$store.state.resultNum === 1 ? 'modal-single' : 'modal-complex'}`">
            <div class="result-title">抽取结果</div>
            <div class="icon-close" @click="goBack"><el-icon :size="20"><close /></el-icon></div>
            <div class="result-content">
                <div class="result-single" v-if="this.$store.state.resultNum == 1">
                    <div class="result-single-img"><img :src="itemMap[this.$store.state.iceBurnerGachaResult[0]].path || require('../assets/no-img.png')" /></div>
                    <div>{{itemMap[this.$store.state.iceBurnerGachaResult[0]].name}}</div>
                </div>
                <div class="result-complex" v-if="this.$store.state.resultNum > 1">
                    <div v-for="(item, index) in this.$store.state.iceBurnerGachaResult" :key="index" class="result-complex-single">
                        <div class="result-single-img"><img :src="itemMap[item].path || require('../assets/no-img.png')" /></div>
                        <div class="result-single-text">{{itemMap[item].name}}</div>
                    </div>
                </div>
            </div>
            <div class="result-button">
                <el-button @click="goBack">返回</el-button>
                <el-button type="success" @click="this.$store.commit('iceBurnerGacha', 1)">再抽1次</el-button>
                <el-button type="success" @click="this.$store.commit('iceBurnerGacha', 10)">再抽10次</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import store from '@/store';
import { defineComponent, ref, watch, watchEffect } from 'vue';
import { Close } from '@element-plus/icons-vue'

const itemMap = {
    "ice-burner-weapon": {name: `神秘极光武器宝箱`, path: require('../assets/aurora-mystica-cube.png')},
    "ice-burner-hair": {name: `神秘极光发型宝箱`, path: require('../assets/aurora-mystica-cube.png')},
    "ice-burner-another-hair": {name: `神秘极光另一个发型宝箱`, path: require('../assets/aurora-mystica-cube.png')},
    "ice-burner-top-piece": {name: `神秘极光上衣宝箱`, path: require('../assets/aurora-mystica-cube.png')},
    "ice-burner-bottom-piece": {name: `神秘极光下衣宝箱`, path: require('../assets/aurora-mystica-cube.png')},
    "ice-burner-gloves": {name: `神秘极光手套宝箱`, path: require('../assets/aurora-mystica-cube.png')},
    "ice-burner-shoes": {name: `神秘极光鞋子宝箱`, path: require('../assets/aurora-mystica-cube.png')},
    "ice-burner-accessory1": {name: `神秘极光饰品（上衣）宝箱`, path: require('../assets/aurora-mystica-cube.png')},
    "ice-burner-accessory2": {name: `神秘极光饰品（项链）宝箱`, path: require('../assets/aurora-mystica-cube.png')},
    "weapon-magic-amulent-9": {name: `武器专用强化卷轴Lv.9`, path: require('../assets/magic-amulent-9.png')},
    "weapon-magic-amulent-10": {name: `武器专用强化卷轴Lv.10`, path: require('../assets/magic-amulent-10.png')},
    "armor-magic-amulent-9": {name: `防具专用强化卷轴Lv.9`, path: require('../assets/magic-amulent-9.png')},
    "armor-magic-amulent-10": {name: `防具专用强化卷轴Lv.10`, path: require('../assets/magic-amulent-10.png')},
    "magic-amulent-8": {name: `强化卷轴Lv.8`, path: require('../assets/magic-amulent-8.png')},
    "glory-of-victory": {name: `胜利的荣光`},
    "berserker": {name: `狂战士`, path: require('../assets/berserker.png')},
    "sacrifice": {name: `牺牲者`, path: require('../assets/sacrifice.png')},

    "orichalcum-weapon-accessory": {name: `奥利哈钢武器装饰宝箱`, path: require('../assets/orichalcum-weapon-accessory.png')},
    "promotional-costume": {name: `晋级时装（7日）宝箱`, path: require('../assets/promotional-costume.png')},
    "additional-damage-magic-stone": {name: `追加伤害特级魔法石`,},
    "damage-reduction-stone": {name: `减少伤害特级魔法石`},
    "critical-magic-stone": {name: `暴击特级魔法石`},
    "maximize-magic-stone": {name: `极大化特级魔法石`},
    "action-speed-magic-stone": {name: `动作速度特级魔法石`},
    "HP-magic-stone": {name: `HP增加特级魔法石`},
    "elrianode-boss": {name: `艾丽阿诺德BOSS宝箱`},
    "varnimyr-boss": {name: `帕尼米尔BOSS宝箱`},
    "rigomor-boss": {name: `尼格摩尔BOSS宝箱`},
    "sage-magic-stone": {name: `贤者的魔法石（2个）宝箱`},

    "complete-recovery-100": {name: `完全恢复药水（100个）宝箱`, path: require('../assets/complete-recovery.png')},
    "complete-recovery-50": {name: `完全恢复药水（50个）宝箱`, path: require('../assets/complete-recovery.png')},
    "fighting-spirit": {name: `斗志药水`},
    "adaptation-elixir": {name: `适应的灵药`},
    "steel-spinning-reel": {name: `钢铁钓轮`},
    "colorful-bobber": {name: `五颜六色的鱼漂`},

    "el-shard-mystery": {name: `艾尔结晶（未鉴定） 50个`, path: require('../assets/el-shard-mystery.png')},
    "el-shard-fire": {name: `艾尔结晶（火） 50个`, path: require('../assets/el-shard-fire.png')},
    "el-shard-water": {name: `艾尔结晶（水） 50个`, path: require('../assets/el-shard-water.png')},
    "el-shard-wind": {name: `艾尔结晶（风） 50个`, path: require('../assets/el-shard-wind.png')},
    "el-shard-nature": {name: `艾尔结晶（地） 50个`, path: require('../assets/el-shard-nature.png')},
    "el-shard-light": {name: `艾尔结晶（光） 50个`, path: require('../assets/el-shard-light.png')},
    "el-shard-dark": {name: `艾尔结晶（暗） 50个`, path: require('../assets/el-shard-dark.png')},
    "fire-orbs-fire": {name: `火之水晶球（250个）宝箱`, path: require('../assets/fire-orbs-fire.png')},
    "fire-orbs-water": {name: `水之水晶球（250个）宝箱`, path: require('../assets/fire-orbs-water.png')},
    "fire-orbs-wind": {name: `风之水晶球（250个）宝箱`, path: require('../assets/fire-orbs-wind.png')},
    "fire-orbs-nature": {name: `地之水晶球（250个）宝箱`, path: require('../assets/fire-orbs-nature.png')},
    "fire-orbs-light": {name: `光之水晶球（250个）宝箱`, path: require('../assets/fire-orbs-light.png')},
    "fire-orbs-dark": {name: `暗之水晶球（250个）宝箱`, path: require('../assets/fire-orbs-dark.png')},
    "ruben-boss": {name: `摩奇BOSS宝箱`, path: require('../assets/ruben-boss.png')},
    "elder-boss": {name: `艾德BOSS宝箱`, path: require('../assets/elder-boss.png')},
    "bethma-boss": {name: `贝斯马BOSS宝箱`, path: require('../assets/bethma-boss.png')},
    "altera-boss": {name: `厄泰拉BOSS宝箱`, path: require('../assets/altera-boss.png')},
    "feita-boss": {name: `沛塔BOSS宝箱`, path: require('../assets/feita-boss.png')},
    "velder-boss": {name: `拜德BOSS宝箱`, path: require('../assets/velder-boss.png')},
    "hamel-boss": {name: `哈梅尔BOSS宝箱`, path: require('../assets/hamel-boss.png')},
    "sander-boss": {name: `桑德斯BOSS宝箱`, path: require('../assets/sander-boss.png')},
    "lanox-boss": {name: `拉诺斯BOSS宝箱`, path: require('../assets/lanox-boss.png')},
    "elysion-boss": {name: `艾丽西昂BOSS宝箱`, path: require('../assets/elysion-boss.png')},
}

export default defineComponent({
    name: 'IceBurnerResult',
    props: {
        
    },
    components: { Close },
    setup(props){
        function goBack(){
            store.commit('iceBurnerResultChanged')
        }

        return {
            itemMap,
            goBack
      }
    }
});
</script>


<style lang="less">
    .result-display{ display: inline }
    .result-none{ display: none; }
    .ice-burner-result{
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 10;
        .modal-mask{
            position: fixed;
            width: 100%;
            height: 100%;
            z-index: 10;
            background-color: rgba(0,0,0,0.6);
        }
        .modal-single{ width: 600px; height: 200px; }
        .modal-complex{ width: 1200px; height: 340px;}
        .result-modal{
            position: fixed;
            display: inline-block;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            background: white;
            border-radius: 4px;
            z-index: 20;
            .result-title{
                position: absolute;
                left: 18px;
                top: 12px;
            }
            .icon-close{
                position: absolute;
                right: 14px;
                top: 14px;
                cursor: pointer;
                z-index: 20;
            }
            .result-content{
                width: 100%;
                height: calc(100% - 92px);
                padding-top: 44px;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                float: left;
                .result-single{
                    width: 90%;
                    height: 90px;
                    border: solid 1px #CCCCCC;
                    position: relative;
                    display: flex;
                    align-items: center;
                    .result-single-img{
                        margin: 0 12px;
                    }
                }
                .result-complex{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                    .result-complex-single{
                        width: 200px;
                        height: 80px;
                        border: solid 1px #CCCCCC;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        float: left;
                        margin: 6px 12px;
                        .result-single-img{
                            // margin: 0 6px;
                            transform: scale(0.8);
                            float: left;
                        }
                        .result-single-text{
                            width: 130px;
                            // height: 100%;
                            padding: 30px 0;
                            float: left;
                        }
                    }
                }
            }
            .result-button{
                width: 100%;
                height: 32px;
                margin: 8px 0;
                text-align: center;
            }
        }
    }
    
    
</style>

function beforeUpdate() {
  throw new Error('Function not implemented.');
}

function beforeUpdate() {
  throw new Error('Function not implemented.');
}
