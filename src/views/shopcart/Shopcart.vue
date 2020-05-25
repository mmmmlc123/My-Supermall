<template>
    <div class="cart">
        <!-- 导航 -->
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
        <!-- 商品列表 -->
        <cart-list/>

        <!-- 底部汇总 -->
        <cart-bottom-bar/>
    </div>
</template>


<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import { mapGetters } from 'vuex'

export default {
    name: "Shopcart",
    data() {
        return {}
    },
    components: {
        NavBar,
        CartList,
        CartBottomBar
    },
    methods: {
        backClick() {
            this.$router.back()
        },
    },
    computed: {
        /* cartLength() {
            return this.$store.getters.cartLength
        } */
        //映射的两种语法：一一对应和重新命名
        ...mapGetters(['cartLength','cartList'])
        /* ...mapGetters({
            length: 'cartLength'
        }) */
    },
}
</script>

<style scoped>
    .cart {
        height: 100vh;
        background-color: #f5f5f5;
    }

    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
        font-size: 16px;
        font-weight: 600;
    }
    
    .back img {
        margin-top: 12px
    }
</style>
