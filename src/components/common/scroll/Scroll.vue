<template>
    <!-- ref/children -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: "Scroll",
        props: {
            probeType: {
                type: Number,
                default: 0,
            },
            pullUpLoad:{
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                scroll: null
            }
        },
        mounted() {
            //1.创建BScroll对象
            //通过querySelect查询到的wrapper在全局可能不准确，通过ref绑定绝对
            this.scroll = new BScroll(this.$refs.wrapper,{
                click: true,
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad
            })

            //2.监听滚动的位置
            if (this.probeType ===2 || this.probeType === 3) {
                this.scroll.on('scroll', (position) => {
                    //console.log(position)
                    //发送监听的位置
                    this.$emit('scroll', position)  
                })
            }
            

            //3.监听上拉加载事件
            

            //4.监听scroll滚动到底部
            if (this.pullUpLoad) {
                this.scroll.on('pullingUp', () => {
                    //console.log('监听上拉加载事件')
                    this.$emit('pullingUp')
                })
            }
            //this.scroll.scrollTo(0, 0)
        },

        methods: {
            scrollTo(x, y, time=500) {
                //第一次使用scroll判断其是否成功挂载，找到scroll
                this.scroll && this.scroll.scrollTo(x, y, time)
                this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                //console.log('-------')
                this.scroll.finishPullUp()
            },
            refresh() {
                //console.log('已刷新')
                this.scroll && this.scroll.refresh()
            },
            getScrollY() {
                return this ? this.scroll.y : 0
                //判断有值的情况下为scroll.y,没有的时候为0
            }
        },
    }
</script>

<style scoped>
</style>
