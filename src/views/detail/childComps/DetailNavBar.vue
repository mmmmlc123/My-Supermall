<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div v-for="(item, index) in titles" :key="index" 
                class="title-item"
                :class="{active: index == currentIndex}"
                @click="titleClick(index)">{{item}}</div>
            </div>
            <div slot="right" class="cart" @click="cartClick">
                <img src="~assets/img/detail/cart.png" alt="">
            </div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
import ShopcartVue from '../../shopcart/Shopcart.vue'

    export default {
        name: "DetailNavBar",
        data() {
            return {
                titles: ['商品', '参数', '评论', '推荐'],
                currentIndex: 0
            }
        },
        components: {
            NavBar,
        },
        methods: {
            titleClick(index) {
                this.currentIndex = index
                this.$emit('click', index)
                //console.log(index)
            },
            backClick() {
                this.$router.back()
            },
            cartClick() {
                this.$router.replace('./Shopcart')
            }
        }
    }
</script>

<style scoped>
    .title {
        display: flex;  
    }
    .title-item {
        flex: 1
    }
    .active {
        color: var(--color-high-text)
    }
    .back img {
        margin-top: 12px
    }
    .cart img {
        width: 30px;
        margin-top: 11% 
    }
</style>
