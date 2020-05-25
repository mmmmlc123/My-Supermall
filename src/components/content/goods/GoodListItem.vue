<template>
    <div class="goods-item">
        <img v-lazy="showImg" @load="imageLoad" @click="itemClick">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <div class="news">
                <span class="price">￥{{goodsItem.price}}</span>
                <span class="collect">
                    <img src="~assets/img/common/collect.svg" alt="">
                    {{goodsItem.cfav}}
            </span>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodListItem",
        props: {
            goodsItem: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {}
        },
        components: {},
        methods: {
            imageLoad() {
                //1.保存Y值
                this.$bus.$emit('itemImageLoad')
                //console.log('a')
                //2.取消全局事件的监听
                /* if (this.$route.path.indexOf('./home')) {
                    this.$bus.$emit('homeItemImageLoad')
                } else if (this.$route.path.indexOf('./detail')) {
                    this.$bus.$emit('detailItemImageLoad')
                } */
            }, 
            itemClick() {
                this.$router.push('/detail' + this.goodsItem.iid)
            }
        },
        computed: {
            showImg() {
                return this.goodsItem.image || this.goodsItem.show.img
            }
        },
    }
</script>

<style scoped>
    .goods-item {
        width: 48%;
        position: relative;
        padding-bottom: 40px;
    }

    .goods-item img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }

    .goods-info {
        font-size: 12px;
        position: absolute;
        left: 0px;
        right: 0px;
        overflow: hidden;
    }
    .goods-info p {
        overflow: hidden;
        white-space: nowrap;  /* 规定文本中的内容不换行 */
        text-overflow: ellipsis; /* 显示省略符号来代表被修剪的文本 */
        margin-bottom: 3px;
    }
    .goods-info .news {
        display: flex;
        align-items: center;
    }
    .goods-info .price {
        color: var(--color-high-text);
        margin-right: 20px;
    }
    .goods-info .collect {
        position: relative;
    }
    .goods-info .collect img {
        max-width: 10%;
        height: auto;
    }
    
</style>
