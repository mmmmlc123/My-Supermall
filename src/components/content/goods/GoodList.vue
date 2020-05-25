<template>
    <div class="goods">
        <good-list-item v-for="(item, index) in goods" :goodsItem="item" :key="index"/>
    </div>
    
</template>

<script>
    import GoodListItem from './GoodListItem'

    export default {
        name: "GoodList",
        props: {
            goods: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {}
        },
        components: {
            GoodListItem
        },
        methods: {}
    }
</script>

<style scoped>
    .goods {
        display: flex;
        flex-wrap: wrap;  /*让弹性盒元素在必要的时候拆行 */
        justify-content: space-around; /* 让周围留有间隙 */

        padding: 4px;  /* 左右边距 */
    }

</style>
