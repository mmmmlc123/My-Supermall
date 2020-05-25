<template>
    <div class="cate-gory">
        <nav-bar class="cate-nav">
            <div slot="center">商品分类</div>
        </nav-bar>
        <cate-content :menuList="menuList"></cate-content>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import CateContent from './childComps/CateContent'
    import {getCategory} from 'network/category.js'
    export default {
        name: "Category",
        data() {
            return {
                menuList: []
            }
        },
        created() {
            getCategory().then((res) => {
                //console.log(res)
                this.menuList = res.data.category.list
                console.log(this.menuList)
            })
        },
        mounted() {
            
        },
        components: {
            NavBar,
            CateContent
        },
        methods: {
            btnClick(){
                console.log('点我')
            }
        }
    }
</script>

<style lscoped>
    .cate-gory {
       height: 100vh;
    }
    .cate-nav {
        background: var(--color-tint);
        color: #fff;
        font-weight: 700;

        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9; 
    }

</style>
