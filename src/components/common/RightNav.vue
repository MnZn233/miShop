<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useCartStore } from "../../stores/cartstore"
import { useRouter } from 'vue-router'

const router = useRouter()
const cartStore = useCartStore()

const showBackTop = ref(false)

const handleScroll = () => {
    showBackTop.value = window.scrollY > 400
}

const scrollToTop = (index) => {
    navItems[index].hover = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

const navItems = reactive([
    {
        text: '手机APP',
        staticImg: '/src/assets/img/right-Nav/1.png',
        hoverImg: '/src/assets/img/right-Nav/1-a.png',
        pop: {
            img: '/src/assets/img/right-Nav/app.png',
            desc: '扫码领取新人百元礼包',
        },
        hover: false,
    },
    {
        text: '个人中心',
        staticImg: '/src/assets/img/right-Nav/2.png',
        hoverImg: '/src/assets/img/right-Nav/2-a.png',
        hover: false,
        link: '/',
    },
    {
        text: '售后服务',
        staticImg: '/src/assets/img/right-Nav/3.png',
        hoverImg: '/src/assets/img/right-Nav/3-a.png',
        hover: false,
        link: '/',
    },
    {
        text: '人工客服',
        staticImg: '/src/assets/img/right-Nav/4.png',
        hoverImg: '/src/assets/img/right-Nav/4-a.png',
        hover: false,
        link: '/',
    },
    {
        text: '购物车',
        staticImg: '/src/assets/img/right-Nav/5.png',
        hoverImg: '/src/assets/img/right-Nav/5-a.png',
        hover: false,
        link: '/mycart',
    },
    {
        text: '回到顶部',
        staticImg: '/src/assets/img/right-Nav/totop.png',
        hoverImg: '/src/assets/img/right-Nav/totop_hover.png',
        isBackTop: true, // 标记为回到顶部
        hover: false,
    },
])

</script>

<template>
    <div class="right-nav-bar">
        <div class="nav-items">
            <!-- 前五个导航项 -->
            <div v-for="(item, idx) in navItems.slice(0, 5)" :key="idx" class="item" @mouseenter="item.hover = true"
                @mouseleave="item.hover = false">
                <router-link :to="item.link" style="text-decoration: none;">
                    <div style="position: relative;">
                        <img
                            :src="item.hover ? item.hoverImg : item.staticImg"
                            class="icon-img"
                            :style="item.text === '购物车' ? 'margin-left:0;' : ''"
                        />
                        <!-- 只在购物车项显示角标 -->
                        <span
                            v-if="item.text === '购物车' && cartStore.getShangPinsInCart.length > 0"
                            class="cart-badge"
                        >{{ cartStore.getShangPinsInCart.length }}</span>
                    </div>
                    <span class="text">{{ item.text }}</span>
                </router-link>
                <div v-if="item.pop && item.hover" class="pop-content">
                    <img :src="item.pop.img" />
                    <span class="desc">{{ item.pop.desc }}</span>
                </div>
            </div>
        </div>
        <!-- 回到顶部按钮独立盒子 -->
        <div v-if="showBackTop" class="back-top-box">
            <div class="item" @mouseenter="navItems[5].hover = true" @mouseleave="navItems[5].hover = false"
                @click="scrollToTop(5)">
                <div>
                    <img :src="navItems[5].hover ? navItems[5].hoverImg : navItems[5].staticImg" class="icon-img" />
                </div>
                <span class="text">{{ navItems[5].text }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.right-nav-bar {
    position: fixed;
    top: 80px;
    right: 0;
    font-size: 13px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.nav-items {
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.95);
}

.item {
    position: relative;
    display: flex;
    width: 55px;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 20px 14px;
    transition: background 0.2s;
    border: 1px solid #f5f5f5;
}

.icon-img {
    margin-left: 10px;
    width: 32px;
    height: 32px;
    transition: all 0.2s;
}

.text {
    color: #333;
}

.pop-content {
    position: absolute;
    border: 1px solid #f5f5f5;
    left: -140px;
    top: 0;
    width: 100px;
    background: #fff;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
}

.pop-content::after {
    content: '';
    position: absolute;
    right: -12px;
    top: 24px;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 12px solid #fff;
}

.pop-content img {
    width: 95px;
    margin-bottom: 6px;
}

.desc {
    font-size: 14px;
    text-align: center;
    margin: 0 14px 10px 14px;
    color: #666;
}

.back-top {
    margin-top: 18px;
    background: #ff6700;
    color: #fff;
    border-radius: 50px;
    padding: 8px 18px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    transition: background 0.2s;
}

.back-top:hover {
    background: #e65c00;
}

.back-top-text {
    font-size: 12px;
    margin-top: 2px;
}

.back-top-box {
    margin-top: 10px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cart-badge {
    position: absolute;
    top: -4px;
    right: -8px;
    min-width: 8px;
    height: 14px;
    background: #ff6700;
    color: #fff;
    border-radius: 9px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    font-weight: bold;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    z-index: 2;
    pointer-events: none;
}
</style>
