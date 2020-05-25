<template>
    <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
        <div class="info-header">
            <span class="header-title">用户评价</span>
            <span class="header-more">
                <a href="#">更多</a>
                <i class="arrow-right"></i>
            </span>
        </div>
        <!-- 用户信息 -->
        <div class="info-user">
            <img :src="commentInfo.user.avatar" alt="">
            <span>{{commentInfo.user.uname}}</span>
        </div>
        <!-- 评价内容 -->
        <div class="info-detail">
            <p>{{commentInfo.content}}</p>
            <div class="info-other">
                <span class="date">{{commentInfo.created}}</span>
                <span>{{commentInfo.style}}</span>
            </div>
        <!-- 评价图片 -->
            <div class="info-imgs">
                <img :src="item" v-for="(item, index) in commentInfo.images" :key="index">
            </div>
        </div>
    </div>
</template>

<script>
    import {fromDate} from 'common/utils'

    export default {
        name: "DetailCommentInfo",
        props: {
            commentInfo: {
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
        methods: {},
        filters: {
            showDate(value) {
                //1.将时间戳转成date对象
                const date = new Date(value*1000)

                //2.将date进行格式化
                return formateDate(date, 'yyyy-MM-dd')
            }
        }
    }
</script>

<style scoped>
    .comment-info {
        padding: 5px 12px;
        color: #333;
        border-bottom: 5px solid #f2f5f8;
    }

    .info-header {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid rgba(0,0,0,.1);
    }

    .header-title {
        float: left;
        font-size: 15px;
    }

    .header-more a {
        float: right;
        margin-right: 10px;
        font-size: 13px;
        color: salmon;
    }

    .info-user {
        padding: 10px 0 5px;
    }

    .info-user img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
    }

    .info-user span {
        position: relative;
        font-size: 15px;
        top: -15px;
        margin-left: 10px;
    }

    .info-detail {
        padding: 0 5px 15px;
    }

    .info-detail p {
        font-size: 14px;
        color: #777;
        line-height: 1.5;
    }

    .info-detail .info-other {
        font-size: 12px;
        color: #999;
        margin-top: 10px;
    }

    .info-other .date {
        margin-right: 8px;
    }

    .info-imgs {
        margin-top: 10px;
    }

    .info-imgs img {
        width: 70px;
        height: 70px;
        margin-right: 5px;
    }
</style>
