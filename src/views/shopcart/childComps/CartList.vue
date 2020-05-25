<template>
    <div>
        <scroll class="content" ref="scroll">
            <cart-list-item v-for="item in cartList"
            :key="item.iid"
            :itemInfo="item"/>
        </scroll>
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
    import Scroll from 'components/common/scroll/Scroll'
    import CartListItem from './CartListItem'
    import CartBottomBar from './CartBottomBar'
   
    import {mapGetters} from 'vuex'
    
    export default {
        name: "CartList",
        data() {
            return {}
        },
        components: {
            Scroll,
            CartListItem,
            CartBottomBar
        },
        computed: {
            ...mapGetters(['cartList'])
        },
        activated() {
            this.$refs.scroll.refresh()
        },
    }
</script>

<style scoped>
    .content {
       height: calc(100vh - 44px - 49px - 40px);
       overflow: hidden;
    }
</style>
