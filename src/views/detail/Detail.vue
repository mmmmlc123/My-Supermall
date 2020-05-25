<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @click="titleClick" ></detail-nav-bar>
        <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
            
            <detail-swiper :top-images="topImages" ref="goods"></detail-swiper>
            <detail-base-info :goods="goods" ></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" />
            <detail-param-info :param-info="paramInfo" ref="param"/>
            <detail-comment-info :comment-info="commentInfo" ref="comment"/>
            <div class="moreRecomend">更多推荐</div>
            <good-list :goods="recommends" ref="recomend"/>

        </scroll>
        <detail-bottom-bar @addCard="addToCard"/>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import DetailBottomBar from './childComps/DetailBottomBar'

    import Scroll from 'components/common/scroll/Scroll'
    import GoodList from 'components/content/goods/GoodList'
    import Toast from 'components/common/toast/Toast'

    import {getDetail, Goods, Shop, GetRecommend, GoodsParam} from 'network/detail'
    import { backTopMixin} from 'common/mixin.js'
    import {mapActions} from 'vuex'
    
    export default {
        name: "Detail",
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                isShowBackTop: false,
                message: '',
                isShow: false,
                itemTop: [],
                product: {}
            }
        },
        mixins: [ backTopMixin],
        created() {
            //1.保存传入的iid
            this.iid = this.$route.params.iid

            //2.根据iid请求详情页数据
            getDetail(this.iid).then(res => {
                console.log(res);
                const data = res.result
                //1.获取顶部轮播图数据
                this.topImages = data.itemInfo.topImages
                
                //2.获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services) 

                //3.创建店铺信息的对象
                this.shop = new Shop(data.shopInfo)

                //4.保存商品详情数据
                this.detailInfo = data.detailInfo

                //5.获取参数的信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

                //6.获取评论的信息
                if(data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }
            })

            //3.请求推荐数据
            GetRecommend().then(res => {
                console.log(res);
                this.recommends = res.data.list
            })
        },
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            Scroll,
            GoodList,
            Toast
        },
        computed: {
            showImage() {
                return this.product.image || this.produuct.show.img
            }
        },
        updated() {
            //需要获取四个模块到顶部的距离，用offsetTop
            this.getOffsetTop()
        },
        methods: {
            ...mapActions(['addCart']),

            getOffsetTop() {
                this.itemTop.push(this.$refs.goods.$el.offsetTop)
                this.itemTop.push(this.$refs.param.$el.offsetTop)
                this.itemTop.push(this.$refs.comment.$el.offsetTop)
                this.itemTop.push(this.$refs.recomend.$el.offsetTop - 45)
                this.itemTop.push(Number.MAX_VALUE)
            },
            
            titleClick(index) {
                //console.log(this.itemTop[index])
                this.$refs.scroll.scrollTo(0, -this.itemTop[index], 200)
            },

            contentScroll(position) {
                //1.判断BackTop是否显示
                const positionY = -position.y;
                this.isShowBackTop = positionY > 500
            }, 
            addToCard() {
                //1.获取购物车需要展示的信息（图片，标题，价格）
                getDetail(this.iid)
                const product = {}
                product.image = this.topImages[0]
                product.title = this.goods.title
                product.desc = this.goods.desc
                product.price = this.goods.realPrice
                product.iid = this.iid
                product.checked = this.addCartTips

                //2.将商品加入购物车 Vuex (两种方法：1.promise 2.mapActions)
                //this.$store.cartList.push(product)
                //this.$store.commot('addCart', product)
                //第一种
                /* this.addCart(product).then(res => {
                    console.log(res)
                })*/  
                /* this.show = true;   
                this.message = res;
                setTimeout(() => {
                    this.show = false;
                    this.message = ''
                },1500) */ 
                console.log(this.$toast)
                this.$toast.show('添加购物车成功')
                //商品状态存入状态仓库actions中的异步操作
                this.$store.dispatch('addToCard', product).then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background: #fff;
        height: 100vh;
    }

    .content {
        position: relative;
        height: calc(100% - 44px - 49px)
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background: #fff;
    }

    .detail-intro img {
        width: 100%;
    }

    .moreRecomend {
        padding: 5px 12px;
        color: #333;
        height: 50px;
        line-height: 50px;
        font-size: 15px;
    }
</style>

