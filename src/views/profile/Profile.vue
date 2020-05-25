<template>
    <div id="profile">
        <nav-bar class="my-nav">
            <div slot="center">我的</div>
        </nav-bar>
        <div class="mine-top">
            <img src="~assets/img/profile/avatar.svg" alt="个人头像">
            <div class="login">
                <a href="">登录/注册</a>
                <p class="phone"><img src="~assets/img/profile/phone.svg" alt="手机号">暂无绑定的手机号</p>
            </div>
            <div class="more"> 
                <a href=""><img right src="~assets/img/common/arrow-left.svg" alt=""/></a>             
            </div>
        </div>
        <scroll class="content">
            <div class="my-money">
                <div>
                    <p><span>0.00 </span>元</p>
                    <p>我的余额</p>
                </div>
                <div>
                    <p><span>0</span>&nbsp;个</p>
                    <p>我的优惠</p>
                </div>
                <div>
                    <p><span>0</span>&nbsp;分</p>
                    <p>我的积分</p>
                </div>
            </div>
            <div class="my-module">
                <div class="my-news">
                    <img src="~assets/img/profile/message.svg" alt="">
                    <span>我的消息</span>
                </div>
                <div class="my-mall">
                    <img src="~assets/img/profile/pointer.svg" alt="">
                    <span>我的商场</span>
                </div>
                <div class="item-last">
                    <img src="~assets/img/profile/vip.svg" alt="">
                    <span>会员卡</span>
                </div>
            </div>
            <div class="my-module">
                <div class="my-news">
                    <img src="~assets/img/profile/cart.svg" alt="">
                    <span>我的购物车</span>
                </div>
                <div class="item-last">
                    <img src="~assets/img/profile/shopping.svg" alt="">
                    <span>下载购物APP</span>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
    import Scroll from 'components/common/scroll/Scroll'
    import NavBar from 'components/common/navbar/NavBar'

    export default {
        name: "Profile",
        data() {
            return {}
        },
        components: {
            Scroll,
            NavBar
        },
        methods: {
            
        }
    }
</script>

<style scoped>
    .content {
        height: 100vh;
        background-color: #f5f5f5;
        overflow: hidden;
    }
    .my-nav {
        background-color: var(--color-tint);
        color: #fff;
        font-weight: 700;
    }
    .mine-top {
        position: relative;
        bottom: 1px;
        left: 0px;
        right: 0px;
        width: 100%;
        height: 100px;
        background-color: var(--color-tint);
        display: flex;
        align-items: center;
    }
    .mine-top img {
        width: 20%;
        margin-left: 20px;
    }
    .mine-top a{
        position: relative;
        display: inline-block;
    }
    .login {
        width: 60%;
        margin-left: 12px;
        color: #fff;
    }
    .login a {
        font-size: 20px;
        color: #fff;
    } 
    .phone {
        padding-top: 5px;
        font-size: 14px;
        display: flex;
        align-items: center;
    }
    .phone img {
        width: 17px;
        height: 17px;
        padding-right: 2px;
        margin-left: 0px;
    }
    .more img {
        width: 22px;
        margin-right: 15px;
    }

    .my-money {
        display: flex;
        height: 80px;
        align-items: center;
        justify-content: space-around;
        background:#fff;
    }
    .my-money div {
        display: flex;
        flex-direction: column;   /* 将项目垂直 */
        align-items: center;
    }
    .my-money p {
        color: #111;
    }
    .my-money span {
        color: var(--color-tint);
        font-weight: 700;
        font-size: 18px;
    }

    .my-module {
        margin-top: 5px;
        display: flex;
        background:#fff;
        flex-direction: column;
        padding: 0 16px;
        color: #111;

    }
    .my-module img {
        width: 30px;
    }
    .my-module div {
        height: 56px;
        display: flex;
        align-items: center;
    }
    .my-module span {
        width: 100%;
        height: 100%;
        padding: 20px 0;
        margin-left: 10px;
        border-bottom: 1px solid #eee;
    }
    .item-last span{
        border: none;
    }
</style>