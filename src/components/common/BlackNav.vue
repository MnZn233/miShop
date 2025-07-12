<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../../stores/cartstore";

const router = useRouter();
const cartStore = useCartStore();
const showCartPopup = ref(false)

const navleft = ref([
    { name: "小米官网" },
    { name: "小米商城" },
    { name: "小米澎湃OS" },
    { name: "小米汽车" },
    { name: "云服务" },
    { name: "loT" },
    { name: "有品" },
    { name: "小爱开放平台" },
    { name: "资质证照" },
    { name: "协议规则" },
    { name: "下载app" },
    { name: "Select Location" }
]);

const navright = ref([
    { name: "登陆" },
    { name: "注册" },
    { name: "消息通知" }
]);

const showHome = () => {
    router.push({
        path: "/",
    });
};
</script>

<template>
    <div class="black-nav">
        <div class="navbar">
            <div class="navbar-left">
                <ul class="black-nav-content">
                    <!-- TODO：现在暂时每个部分都是回到主页，后续修改 -->
                    <li v-for="(item, index) in navleft" :key="index" @click="showHome()">{{ item.name }}</li>
                    <!-- <a href="https://www.xiaomiev.com/" target="_blank">小米汽车</a> -->
                </ul>
            </div>
            <div class="navbar-middle">
                <ul class="black-nav-content">
                    <!-- TODO：后续添加跳转 -->
                    <li v-for="(item, index) in navright" :key="index">{{ item.name }}</li>
                </ul>
            </div>
            <div class="navbar-right" @click="router.push('/mycart')">
                <div class="shopping" :class="{
                    'cart-has-items': cartStore.getShangPinsInCart.length > 0 && !showCartPopup,
                    'cart-has-items-hover': cartStore.getShangPinsInCart.length > 0 && showCartPopup
                }" @mouseenter="showCartPopup = true" @mouseleave="showCartPopup = false" style="position: relative;">
                    <!-- 购物车图片——源网站用的是图标库，这里用图片代替 -->
                    <div class="shopping_img"></div>
                    <p>购物车&nbsp;（{{ cartStore.getShangPinsInCart.length }}）</p>
                    <div v-if="showCartPopup" class="cart-popup">
                        <div v-if="cartStore.getShangPinsInCart.length === 0" class="cart-empty-tip">
                            购物车中还没有商品，赶紧选购吧！
                        </div>
                        <ul v-else class="cart-list">
                            <li v-for="item in cartStore.getShangPinsInCart" :key="item.shangpinid" class="cart-item">
                                <img :src="item.path" alt="" class="cart-item-img">
                                <div class="cart-item-content">
                                    <span class="cart-item-title">{{ item.xinghaoname }} {{ item.peizhiname }}</span>
                                    <span class="cart-item-price">{{ item.money }}元 × {{ item.num }}</span>
                                </div>
                            </li>
                        </ul>
                        <div v-if="cartStore.getShangPinsInCart.length > 0" class="cart-footer">
                            <div class="cart-footer-info">
                                <div class="cart-footer-count">共 {{ cartStore.getShangPinsInCart.length }} 件商品</div>
                                <div class="cart-footer-total">{{ cartStore.selectedTotalPrice }}元</div>
                            </div>
                            <a href="/mycart" class="cart-footer-btn">
                                去购物车结算
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 黑色导航条部分 */
.black-nav {
    width: 100%;
    height: 40px;
    background-color: #333;
}

.navbar {
    position: relative;
    margin: 0 auto;
    width: 1226px;
    height: 100%;
}

.navbar-left {
    position: absolute;
    left: 0;
    margin-left: 0;
    width: 800px;
    height: 100%;
}

.navbar-middle {
    position: absolute;
    right: 125px;
    width: 135px;
    height: 100%;
}

.navbar-right {
    position: absolute;
    width: 105px;
    height: 100%;
    right: 0;
}

.black-nav-content {
    position: absolute;
    margin: 0;
    top: 12px;
    padding-left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    list-style-type: none;
}

.black-nav-content li {
    height: 14px;
    padding: 0 7px;
    font-size: 12px;
    color: #b0b0b0;
    border-right: 1px solid #424242;
}

/* 让第一项与左边边距为0，即居左 */
.black-nav-content li:nth-child(1) {
    padding-left: 0;
}

/* 取消最后一个的边框 */
.black-nav-content li:last-child {
    border-right: 0;
}

/* 定义鼠标置于其上时的颜色变换 */
.black-nav-content li:hover {
    color: white;
    cursor: pointer;
}

/* 购物车 */
.shopping {
    position: absolute;
    right: 0;
    margin-right: 0;
    width: 100%;
    display: flex;
    height: 100%;
    padding-left: 10px;
    font-size: 10px;
    color: #b0b0b0;
    background-color: #424242;
    line-height: 20px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
}

.shopping.cart-has-items {
    background: #ff6700;
}

.shopping.cart-has-items p {
    color: #fff;
}

.shopping.cart-has-items-hover {
    background: #fff;
}

.shopping.cart-has-items-hover p {
    color: #ff6700;
}

.shopping_img {
    width: 18px;
    height: 18px;
    margin-top: 10px;
    margin-left: 4px;
    margin-right: 4px;
    background-size: 100% 100%;
    background-image: url(../../assets/img/black-navbar/1.png);
}

.shopping:hover {
    background-color: #FFFFFF;
    cursor: pointer;
    color: #ff6700;
}

.shopping:hover .shopping_img {
    background-image: url(../../assets/img/black-navbar/2.png);
}

.cart-popup {
    position: absolute;
    right: 0;
    top: 100%;
    z-index: 100;
    background: #fff;
    border: 1px solid #eee;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    width: 320px;
    min-height: 80px;
    padding: 16px;
    animation: fadeIn .2s;
}

.cart-empty-tip {
    height: 120px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #999;
}

.cart-list {
    max-height: 300px;
    overflow-y: auto;
    padding: 0;
    margin: 0;
}

.cart-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.cart-item-img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    margin-right: 10px;
}

.cart-item-content {
    flex: 1;
    display: flex;
    align-items: center;
    height: 40px;
}

.cart-item-title {
    font-size: 14px;
    color: #333;
}

.cart-item-price {
    font-size: 14px;
    color: #333;
    margin-left: auto;
}

.cart-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
}

.cart-footer-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.cart-footer-count {
    color: #333;
    font-size: 12px;
}

.cart-footer-total {
    color: #ff6700;
    font-size: 20px;
    margin-top: 2px;
}

.cart-footer-btn {
    font-size: 16px;
    color: #fff;
    background: #ff6700;
    padding: 6px 16px;
    border-radius: 3px;
    text-decoration: none;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
