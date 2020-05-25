<template>
    <div class="tab-bar-item" @click="itemClick">
        <slot v-if="!isActive" name="item-icon"></slot>
        <slot v-else name="item-icon-actived"></slot>
        <div :style="activeStyle">
            <slot name="item-text"></slot>     
        </div>
    </div>
</template>

<script>
export default {
    name: "TabBarItem",
    props: {
        path: String,   //传进来的路径类型是字符串
        activeColor: {    //设置传入的activeColor类型是字符串，预设值为red
            type: String,
            default: 'red'
        }
    },
    data() {
        return {
            //isActive: true 
        }
    },
    computed: {
        isActive(){
            return this.$route.path.indexOf(this.path) !== -1
            //判断当前路由的路径是否包含我的路径 
            // /home -> item(/home) = true
            // /home -> item(/category) = false
            //indexof == 1 找到了 indexof == -1 没找到
        },
        activeStyle() {
            return this.isActive ? {color: this.activeColor} : {}
            //先判断是否被激活，激活后颜色设置为activeColor
        }  
    },
    components: {},
    methods: {
        itemClick() {
            this.$router.replace(this.path)
        }
    }
}
</script>

<style scoped>
    .tab-bar-item {
        height: 49px;
        flex: 1;
        text-align: center;
        font-size: 14px;
    }
    .tab-bar-item img {
        height: 24px;
        width: 24px;
        margin-top: 2px;
        vertical-align: middle;
        margin-bottom: 5px;
    }

</style>
