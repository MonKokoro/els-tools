import { createStore } from 'vuex'

export default createStore({
  state: {
    iceBurnerResultShow: false,
    iceBurnerGachaResult: [],
    resultNum: 1
  },
  getters: {
    iceBurnerResultShow(state){
      return state.iceBurnerResultShow
    },
    iceBurnerGachaResult(state){
      return state.iceBurnerGachaResult
    }
  },
  mutations: {
    iceBurnerResultChanged(state){
      state.iceBurnerResultShow = !state.iceBurnerResultShow
    },
    iceBurnerGachaResultSet(state, result){
      state.iceBurnerGachaResult = result
    },
    iceBurnerGacha(state, count){
      let result: never[] = []
      for(let i = 0; i<count; i++){
        let num = Math.random() * 100
        let item = ""
        if(num >= 0 && num < 0.3){ item = "ice-burner-weapon" } //0.3%武器
        else if(num >= 0.3 && num < 0.6 ){ item = "ice-burner-hair" } //0.3%发型
        else if(num >= 0.6 && num < 0.9 ){ item = "ice-burner-another-hair" } //0.3%另一个发型
        else if(num >= 0.9 && num < 1.5 ){ item = "ice-burner-top-piece" } //0.6%上衣
        else if(num >= 1.5 && num < 2.1 ){ item = "ice-burner-bottom-piece" } //0.6%下衣
        else if(num >= 2.1 && num < 3.2 ){ item = "ice-burner-gloves" } //1.1%手套
        else if(num >= 3.2 && num < 4.3 ){ item = "ice-burner-shoes" } //1.1%鞋子
        else if(num >= 4.3 && num < 4.65 ){ item = "ice-burner-accessory1" } //0.35%饰品1
        else if(num >= 4.65 && num < 5 ){ item = "ice-burner-accessory2" } //0.35%饰品2
        else if(num >= 5 && num < 5.0299 ){ item = "weapon-magic-amulent-9" } //0.0299%武器+9
        else if(num >= 5.0299 && num < 5.03 ){ item = "weapon-magic-amulent-10" } //0.0001%武器+10
        else if(num >= 5.03 && num < 5.0599 ){ item = "armo-magic-amulent-9" } //0.0299%防具+9
        else if(num >= 5.0599 && num < 5.06 ){ item = "armor-magic-amulent-10" } //0.0001%防具+10
        else if(num >= 5.06 && num < 7.06 ){ item = "magic-amulent-8" } //2%+8
        else if(num >= 7.06 && num < 7.061 ){ item = "glory-of-victory" } //0.001%胜利的荣耀
        else if(num >= 7.061 && num < 7.062 ){ item = "berserker" } //0.001%狂战士
        else if(num >= 7.062 && num < 7.063 ){ item = "sacrifice" } //0.001%牺牲

        else if(num >= 7.063 && num < 9.063 ){ item = "orichalcum-weapon-accessory" } //2%奥尔哈刚武饰
        else if(num >= 9.063 && num < 11.063 ){ item = "promotional-costume" } //2%晋级时装
        else if(num >= 11.063 && num < 12.563 ){ item = "additional-damage-magic-stone" } //1.5%追伤魔法石
        else if(num >= 12.563 && num < 14.063 ){ item = "damage-reduction-stone" } //1.5%减伤魔法石
        else if(num >= 14.063 && num < 15.313 ){ item = "critical-magic-stone" } //1.25%暴击魔法石
        else if(num >= 15.313 && num < 16.563 ){ item = "maximize-magic-stone" } //1.25%极大魔法石
        else if(num >= 16.563 && num < 17.813 ){ item = "action-speed-magic-stone" } //1.25%动速魔法石
        else if(num >= 17.813 && num < 19.313 ){ item = "HP-magic-stone" } //1.5%HP魔法石
        else if(num >= 19.313 && num < 20.912 ){ item = "elrianode-boss" } //1.599%艾丽阿诺德BOSS箱
        else if(num >= 20.912 && num < 21.011 ){ item = "varnimyr-boss" } //0.099%帕尼米尔BOSS箱
        else if(num >= 21.011 && num < 21.11 ){ item = "rigomor-boss" } //0.099%尼格摩尔BOSS箱
        else if(num >= 21.11 && num < 21.61 ){ item = "sage-magic-stone" } //0.5%贤者魔法石2个箱子

        else if(num >= 21.61 && num < 31.61 ){ item = "complete-recovery-100" } //10% 100全水箱
        else if(num >= 31.61 && num < 35.61 ){ item = "complete-recovery-50" } //4% 50全水箱
        else if(num >= 35.61 && num < 36.61 ){ item = "fighting-spirit" } //1%斗志
        else if(num >= 36.61 && num < 38.4 ){ item = "adaptation-elixir" } //1.79%适应药
        else if(num >= 38.4 && num < 40.4){ item = "steel-spinning-reel" } //2%钢铁钓轮
        else if(num >= 40.4 && num < 42.4 ){ item = "colorful-bobber" } //2%五颜六色的鱼漂

        else if(num >= 42.4 && num < 46.4 ){ item = "el-shard-mystery" } //4%神秘结晶
        else if(num >= 46.4 && num < 50.4 ){ item = "el-shard-fire" } //4%火结晶
        else if(num >= 50.4 && num < 54.4 ){ item = "el-shard-water" } //4%水结晶
        else if(num >= 54.4 && num < 58.4 ){ item = "el-shard-wind" } //4%风结晶
        else if(num >= 58.4 && num < 62.4 ){ item = "el-shard-nature" } //4%地结晶
        else if(num >= 62.4 && num < 66.4 ){ item = "el-shard-light" } //4%光结晶
        else if(num >= 66.4 && num < 70.4 ){ item = "el-shard-dark" } //4%暗结晶
        else if(num >= 70.4 && num < 72.4 ){ item = "fire-orbs-fire" } //2%火球
        else if(num >= 72.4 && num < 74.4 ){ item = "fire-orbs-water" } //2%水球
        else if(num >= 74.4 && num < 76.4 ){ item = "fire-orbs-wind" } //2%风球
        else if(num >= 76.4 && num < 78.4 ){ item = "fire-orbs-nature" } //2%地球
        else if(num >= 78.4 && num < 80.4 ){ item = "fire-orbs-light" } //2%光球
        else if(num >= 80.4 && num < 82.4 ){ item = "fire-orbs-dark" } //2%暗球
        else if(num >= 82.4 && num < 84.1 ){ item = "ruben-boss" } //1.7%摩奇boss箱
        else if(num >= 84.1 && num < 85.8 ){ item = "elder-boss" } //1.7%艾德boss箱
        else if(num >= 85.8 && num < 87.5 ){ item = "bethma-boss" } //1.7%贝斯马boss箱
        else if(num >= 87.5 && num < 89.2 ){ item = "altera-boss" } //1.7%厄泰拉boss箱
        else if(num >= 89.2 && num < 90.9 ){ item = "feita-boss" } //1.7%沛塔boss箱
        else if(num >= 90.9 && num < 92.6 ){ item = "velder-boss" } //1.7%拜德boss箱
        else if(num >= 92.6 && num < 94.3 ){ item = "hamel-boss" } //1.7%哈梅尔boss箱
        else if(num >= 94.3 && num < 96 ){ item = "sander-boss" } //1.7%桑德斯boss箱
        else if(num >= 96 && num < 98 ){ item = "lanox-boss" } //2%拉诺斯boss箱
        else if(num >= 98 && num < 100 ){ item = "elysion-boss" } //2%艾丽西昂boss箱

        result.push(<never>item)
      }
      state.iceBurnerGachaResult = result
      state.resultNum = count
      console.log(state.resultNum)
    }
  },
  actions: {
  },
  modules: {
  }
})
