<template>
    <div id="home">
        <!-- 顶部nab -->
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-control class="tab-control"
                    :titles="['流行','新款','精选',]"
                    @tabClick="tabClick"
                    ref="tabControl1"
                    v-show="isTabFixed"/>
        <scroll class="content" 
                ref="scroll" 
                :probe-type="3" 
                @scroll="contentScroll" 
                :pull-up-load="true"
                @pullingUp="loadMore">
            <!-- 轮播图 -->
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
            <!-- 推荐 -->
            <home-recommend :recommends="recommends"></home-recommend>
            <!-- 推荐介绍 -->
            <home-feature></home-feature>
            <!-- 商品导航 -->
            <tab-control :titles="['流行','新款','精选',]"
                        @tabClick="tabClick"
                        ref="tabControl2"/>
            <!-- 商品列表 -->
            <good-list :goods="showGoods"></good-list>        
        </scroll>

        <!-- 返回顶部按钮 -->
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    //home子组件
    import HomeSwiper from './childComps/HomeSwiper'
    import HomeRecommend from './childComps/HomeRecommend'
    import HomeFeature from './childComps/HomeFeature'
    //公共组件
    import NavBar from 'components/common/navbar/NavBar'
    import Scroll from 'components/common/scroll/Scroll'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodList from 'components/content/goods/GoodList'
    //网络请求
    import {getHomeMultidata, getHomeGoods}from "network/home"
    //工具和混用
    import {debounce} from "common/utils"
    import {backTopMixin} from "common/mixin"

    export default {
        name: "Home",
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []},
                },
                currentType: 'pop',
                isShowBackTop: false,
                //tabOffsetTop: 0,
                isTabFixed: false,
                saveY: 0,
            }   //用于存储请求的数据
        },
        components: {
            NavBar,
            HomeSwiper,
            HomeRecommend,
            HomeFeature,
            TabControl,
            GoodList,
            Scroll,    
        },
        mixins: [ backTopMixin],
        created() {   //无法refresh 因为在created引入$可能无法找到 还有document.query
            //1.请求多个数据
            this.getHomeMultidata()

            //2.请求商品数据
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell') 
        },
        activated() {
            this.$refs.scroll.scrollTo(0, this.saveY, 0)
            this.$refs.scroll.refresh()
        },
        deactivated() {
            this.saveY = this.$refs.scroll.getScrollY
            //console.log(this.saveY)
        },
        mounted() {
            //监听item中图片加载完成
            const refresh = debounce(this.$refs.scroll.refresh, 50)

            //对监听的事件进行保存
            this.itemImageListenner = () => {
                refresh()
            }
            this.$bus.$on('itemImageLoad', this.itemImageListenner)

            //获取tabControl2中的offsetTop值（此处不准,先挂载后加载）
            //console.log(this.$refs.tabControl2.$el.offsetTop)
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        methods: {
            //事件监听相关方法

            //当轮播图加载完成后计算tabcontrol到顶部的距离
            swiperImageLoad() {
                console.log(this.$refs.tabControl2.$el.offsetTop)
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            }, 

            tabClick(index) {
                switch(index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                }
                //console.log(index)
                this.$refs.tabControl1.currentIndex = index
                this.$refs.tabControl2.currentIndex = index
                this.$refs.scroll.scrollTo(0, -this.tabOffsetTop)
            },
               
            backClick() {
                this.$refs.scroll.scrollTo(0, 0)
            }, 

            contentScroll(position){
                const positionY = -position.y
                //1.判断BackTop是否显示
                this.isShowBackTop = positionY > 800
                //2.决定tabControl是否吸顶(position: fixed)
                this.isTabFixed = positionY > this.tabOffsetTop
            },  
                
            loadMore() {
                console.log('上拉加载中')
                this.getHomeGoods(this.currentType)
                //this.$refs.scroll.refresh
            },
            

            //网络请求相关的方法
            getHomeMultidata(){
                getHomeMultidata().then(res => {
                    //console.log(res);
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;   
                })
            },
            getHomeGoods(currentType) {
                const page = this.goods[currentType].page + 1;
                getHomeGoods(currentType, page).then(res => {
                    //console.log(res)
                    this.goods[currentType].list.push(...res.data.list);
                    this.goods[currentType].page ++;
                    console.log(this.goods[currentType].list);
                    //完成上拉加载更多
                    this.$refs.scroll.finishPullUp()
                    //console.log('---')
                })
            }
        }
    } 
</script>

<style scoped>
    #home {
        padding-top: 44px;
        height: 100vh;
        position: relative;
    }
    .home-nav {
        background-color:var(--color-tint);
        color: #fff;

        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9; 
    }

    /* 当使用原生时对tabConrol的设置
        .tab-control {
        position: sticky;
        top: 44px;
        z-index: 9;
    } */
    
    .tab-control {
        position: relative;
        z-index: 9;
    }
    .content {
        overflow: hidden;
        position: absolute;
        height: auto;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;

        /* 两种设置内容方法
        height: calc(100% - 93px);
        background-color: #999;
        margin-top: 44px; */
    }

    .fixed {
        position: fixed;
        left: 0;
        right: 0;
        top: 44px;
    }
</style>
