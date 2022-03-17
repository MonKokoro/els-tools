<template>
    <div :class="`check-box-list ${className || ''}`">
        <div v-for="(item, index) in configJson" :key="index" :class="`check-box-item transition-${animationMode}`" :style="{transitionDelay: `${0.15*index}s`}">
            <div>
                <el-checkbox v-model="item.value" :label="item.label" size="large" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from 'vue';

export default defineComponent({
    name: 'CheckboxList',
    props: {
        config: {type: Array, required: true},
        hidden: Boolean,
        className: String
    },
    setup(props){
        let hidden = ref(props.hidden || false);
        let animationMode = ref(props.hidden ? "default" : "none")
        let constructorFlag = true
        watchEffect(() => {
            hidden.value = props.hidden
            if(props.hidden){
                animationMode.value = "disappear"
            }
            else{
                animationMode.value = "appear"
            }
            if(constructorFlag){
                animationMode.value = "default"
                constructorFlag = false
            }
        })
        return {
          configJson: props.config,
          hidden,
          animationMode
      }
    }
});
</script>


<style lang="less">
    .check-box-list{
        .check-box-item{
            position: relative;
            left: 20px;
            transition: all 0.3s
        }
        .transition-appear{
            left: 0;
            opacity: 1;
        }
        .transition-disappear{
            left: 20;
            opacity: 0;
            pointer-events: none;
        }
        .transition-default{
            opacity: 0;
            pointer-events: none;
        }
    }
</style>
