<template>
    <div class="bottom-bar">
        <div class="check-all"  >
            <check-button 
                :is-checked="isSelectAll" 
                @click.native="clickCheckAll"
                class="check-button"/>
            <span>全选</span>
            
            <div class="price">合计：￥{{totalPrice}}</div>
        </div>

        <div class="calculate">
            <span>结算({{checkLength}})</span>
        </div>
    </div>
</template>

<script>
    import CheckButton from 'components/content/checkButton/CheckButton'
    import {mapGetters} from 'vuex'

    export default {
        name: "CartBottomBar",
        components: {
            CheckButton
        },
        computed: {
            ...mapGetters(['cartList']),
            totalPrice() {
                return this.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue, item) => {
                    return preValue + item.price * item.count
                }, 0).toFixed(2)
            },
            checkLength() {
                return this.cartList.filter(item => item.checked).length
            },
            isSelectAll() {
                //首先判断是否购物车为空
                if(this.cartList.length === 0) return false

                //方法一：通过filter过滤器遍历完后 选择没有选中的（性能不高）
                //return !(this.$store.state.cartList.filter(item => item.checked).length)
                
                //方法二.通过find查找到未选中的（性能会高一点）
                return !this.cartList.find(item => !item.checked)
                
                //方法三.普通遍历
                /* for(let item of this.cartList) {
                    if (!item.checked) {
                        return false;
                    }
                } return ture */
            }
        },
        methods: {
            clickCheckAll() {  
                console.log('-------')
                if (this.isSelectAll) {  //全部选中
                    this.cartList.forEach(product => product.checked = true)
                } else {
                    this.cartList.forEach(product => product.checked = false)
                }

                this.cartList.forEach(product => product.checked = !this.isSelectAll)
            }

        },
    }
</script>

<style scoped>
    .bottom-bar {
        height: 42px;
        background: #fff;

        position: fixed;
        left: 0;
        right: 0;
        bottom: 50px;
        display: flex;

    }
    .check-all {
        display: flex;
        align-items: center;
        margin-left: 10px;
    }
    .check-button {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 6px;
    }
    .price {
        margin-left: 20px;
        font-size: 16px;
        width: 180px;
        white-space: nowrap;  /* 规定文本中的内容不换行 */
        text-overflow: ellipsis; /* 显示省略符号来代表被修剪的文本 */
        overflow: hidden;
    }
    .calculate {
        margin-right: 0px;
        margin-left: auto;
        padding-right: 20px;
        padding-left: 20px;
        background-color: var(--color-tint);
        display: flex;
        align-items: center;
    }
    .calculate span {
        font-size: 16px;
        font-weight: 600;
        color: #fff;
    }
</style>

