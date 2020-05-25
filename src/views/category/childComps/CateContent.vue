<template>
    <div id="CateContent">
        <div class="menu">
            <div :class="{active: currentIndex == index}" 
                v-for="(item, index) in menuList" :key="index" 
                @click="indexChange(item, index)"
                >
               <p>{{item.title}}</p>
                 
            </div>
        </div>
        <div class="content">
           <div class="content-list-item"
                v-for="(item, index) in contentList" :key="index">
               <img :src="item.image" alt="">
               <p>{{item.title}}</p>
           </div>
        </div>
        
    </div>
</template>

<script>
    //import Scroll from 'components/common/scroll/Scroll'
    
    import { getSubCategory } from 'network/category.js'

    export default {
        name: "CateContent",
        props: {
            menuList: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                maitKey: 3627,
                contentList: [],
                currentIndex: 0
            }
        },
        created() {
            getSubCategory(this.maitKey).then((res) => {
                //console.log(res)
                this.contentList = res.data.list
            })
        },
        components: {
            //Scroll
        },
        methods: {
            indexChange(item, index) {
                this.currentIndex = index;
                this.maitKey = item.maitKey;
                getSubCategory(this.maitKey).then((res) => {
                    console.log(res)
                    this.contentList = res.data.list
                })
            }
        }
    }
</script>

<style scoped>
    #CateContent {
        padding-top: 44px;
        position: flex;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }
    .menu {
        width: 30%;
        height: calc(100vh - 49px - 46px);
        float: left;
        background-color: #f5f5f5;
        overflow: auto;
    }
    .menu div {
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 16px;
    }
    .menu div:hover{
        background-color: #fff;
    }
    
    .active {
            background-color: #fff;
            border-left: 3px solid #FF8A9D;
        }

    .content {
        width: 70%;
        float: left;
        overflow: auto;
        height: calc(100vh - 49px - 46px);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-bottom: 10px;
    }

    .content-list-item {
        padding-top: 10px;
        padding-bottom: 10px;
        width: 50%;
        text-align: center;
        font-size: 16px;
    }
    .content-list-item img {
        width: 50%;
        margin-bottom: 5px;
    }
</style>
