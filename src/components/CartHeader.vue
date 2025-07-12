<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cartstore'

const cartStore = useCartStore()

</script>

<template>
  <div class="site-mini-header">
    <div class="container">
      <div class="header-logo">
        <router-link class="logo" title="小米官网" to="/"></router-link>
      </div>
      <div class="header-title has-more">
        <h2>我的购物车</h2>
        <span v-show="cartStore.getShangPinsInCart.length > 0">温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </div>
      <div class="info-box">
        <router-link class="info-a" to="/login">登录</router-link>
        <span class="line-a">|</span>
        <router-link class="info-a" to="/register">注册</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.site-mini-header {
  font-size: 12px;
  border-bottom: 2px solid #ff6700;
  background: #fff;
  color: #b0b0b0;
  position: relative;
  z-index: 20;
  height: 100px;
}

.site-mini-header .container {
  display: flex;
  align-items: center;
  height: 100%;
}

.site-mini-header .header-logo {
  width: 93px;
  float: left;
  margin-left: 150px;
}

.site-mini-header .header-logo .logo {
  position: relative;
  display: block;
  width: 48px;
  height: 48px;
  overflow: hidden;
}

.site-mini-header .header-logo .logo:after,
.site-mini-header .header-logo .logo:before {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 48px;
  height: 48px;
  content: '';
  transform-origin: 50% 50%;
}

.site-mini-header .header-logo .logo:after,
.site-mini-header .header-logo .logo:before {
  background: url('../../public/favicon.ico') no-repeat;
  background-size: 48px 48px;
  transform: translateZ(0);
}


.site-mini-header .header-title h2 {
  margin: 0;
}

.site-mini-header .header-title h2 {
  font-weight: 400;
  color: #424242;
}

.site-mini-header .has-more {
  height: 48px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.site-mini-header .has-more h2 {
  float: none;
  line-height: 48px;
  margin-bottom: 0;
  font-size: 28px;
  flex-shrink: 0;
  white-space: nowrap;
  margin-right: 16px;
  margin-left: 10px;
}

.site-mini-header .has-more span {
  margin-bottom: 10px;
  display: inline-block;
  margin-left: 0;
  white-space: nowrap;
  color: #757575;
}

.info-box {
  margin-left: 37%;
}

.info-a {
  color: #757575;
  text-decoration: none;
}

.info-a:hover {
  color: #ff6700;
}

.line-a {
  margin: 0 5px;
}
</style>
