<script setup>
import { useCartStore } from "../stores/cartstore"
import { useRouter } from 'vue-router'
import { computed, ref, onMounted, onUnmounted } from 'vue'

const router = useRouter()

// 使用购物车 store
const cartStore = useCartStore()

const formattedTotalPrice = computed(() => {
  const price = cartStore.selectedTotalPrice
  if (Number.isInteger(price)) {
    return price
  }
  return price.toFixed(2).replace(/\.?0+$/, "")
})

const cartBarFixed = ref(false)

function checkCartBarInView() {
  const bar = document.querySelector('.list-body')
  if (!bar) return
  const rect = bar.getBoundingClientRect()
  // 只要底部结算条底部在视口下方，就吸底
  cartBarFixed.value = rect.bottom > window.innerHeight
}

onMounted(() => {
  window.addEventListener('scroll', checkCartBarInView)
  window.addEventListener('resize', checkCartBarInView)
  checkCartBarInView()
})
onUnmounted(() => {
  window.removeEventListener('scroll', checkCartBarInView)
  window.removeEventListener('resize', checkCartBarInView)
})

</script>

<template>
  <div class="mi-cart">
    <div class="container">
      <div v-if="cartStore.getShangPinsInCart.length === 0" class="empty-cart-wrap">
        <div class="empty-cart-top">
          <h2 class="login-tip">您的购物车还是空的！</h2>
          <p class="login-desc">登录后将显示您之前加入的商品</p>
          <a class="btn btn-login" href="javascript:void(0)">立即登录</a>
          <router-link class="btn btn-shoping-nologin" to="/">马上去购物
          </router-link>
        </div>
      </div>

      <div v-else class="cart-wrap">
        <div class="cart-goods-list">
          <div class="list-head">
            <div class="col col-check">
              <input type="checkbox" :checked="cartStore.isAllChecked"
                @change="cartStore.toggleAllChecked(!cartStore.isAllChecked)" />
              全选
            </div>
            <div class="col col-img">&nbsp;</div>
            <div class="col col-name">商品名称</div>
            <div class="col col-price">单价</div>
            <div class="col col-num">数量</div>
            <div class="col col-total">小计</div>
            <div class="col col-action">操作</div>
          </div>
          <div class="list-body">
            <div class="list-item" v-for="(item, index) in cartStore.getShangPinsInCart" :key="item.shangpinid">
              <div class="item-box">
                <div class="item-table">
                  <div class="item-row">
                    <div class="col col-check">
                      <input type="checkbox" :checked="item.checked" @change="cartStore.toggleChecked(index)" />
                    </div>
                    <div class="col col-img">
                      <a href="javascript:void(0)" @click="router.push(`/details/?id=${item.id}`)">
                        <img :src="item.path" height="80" width="80" />
                      </a>
                    </div>
                    <div class="col col-name">
                      <h3 class="name">
                        <a href="javascript:void(0)" @click="router.push(`/details/?id=${item.id}`)">{{ item.xinghaoname
                          }} {{ item.peizhiname }} {{ item.colorname }}</a>
                      </h3>
                    </div>
                    <div class="col col-price">
                      {{ item.money }}元
                    </div>
                    <div class="col col-num">
                      <div class="change-goods-num">
                        <a href="javascript:void(0)" @click="cartStore.reduceQuantity(index)"
                          :class="{ 'disabled': item.num <= 1 }"><i class="iconfont">-</i></a>
                        <input :value="item.num" autocomplete="off" class="goods-num" type="text" readonly />
                        <a href="javascript:void(0)" @click="cartStore.addQuantity(index)"><i class="iconfont">+</i></a>
                      </div>
                    </div>
                    <div class="col col-total">
                      {{ (item.money * item.num) }}元
                    </div>
                    <div class="col col-action">
                      <a class="del" href="javascript:void(0)" title="删除"
                        @click="cartStore.removeItem(item.shangpinid)"><i class="iconfont">×</i></a>
                    </div>
                  </div>
                </div>
                <div>
                  <div v-if="item.checked">
                    <div v-for="yiwaibaoxian in item.yiwaibaoxian" :key="yiwaibaoxian.id" class="item-sub-box">
                      <div class="extend-buy">
                        <i class="iconfont icon-plus">+</i>{{ yiwaibaoxian.name }}{{ yiwaibaoxian.jiage }}元({{
                          yiwaibaoxian.info }})<span style="color: #ff6700;">了解意外保护&gt;</span>
                      </div>
                    </div>
                    <br>
                    <div v-for="yanchangbaoxian in item.yanchangbaoxian" :key="yanchangbaoxian.id" class="item-sub-box">
                      <div class="extend-buy">
                        <i class="iconfont icon-plus">+</i>{{ yanchangbaoxian.name }}{{ yanchangbaoxian.jiage }}元({{
                          yanchangbaoxian.info }})<span style="color: #ff6700;">了解延长保修&gt;</span>
                      </div>
                    </div>
                    <br>
                    <div v-for="yunserve in item.yunserve" :key="yunserve.id" class="item-sub-box">
                      <div class="extend-buy">
                        <i class="iconfont icon-plus">+</i>{{ yunserve.name }}{{ yunserve.jiage }}元<span
                          style="color: #ff6700;">了解云空间服务&gt;</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="placeholder-div"></div>
        <div class="cart-bar" :class="{ 'cart-bar-fixed': cartBarFixed }">
          <div class="section-left">
            <router-link class="back-shopping" to="/">继续购物</router-link>
            <span class="cart-total">
              已选择 <i>{{ cartStore.selectedShangPins.length }}</i> 件</span>
          </div>
          <div>
            <div v-if="cartStore.isAllUnchecked" class="cart-tip-mask"></div>
            <div v-if="cartStore.isAllUnchecked" class="cart-tip-box-float">
              请勾选需要结算的商品
            </div>
            <span class="total-price">
              合计：<em>{{ formattedTotalPrice }}</em>元
              <a class="btn" :class="{ 'btn-disabled': cartStore.isAllUnchecked }" href="javascript:void(0)">去结算</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
i {
  font-style: normal;
  font-weight: 700;
}

.mi-cart {
  padding-top: 10px;
  background-color: #f5f5f5;
}

.mi-cart .container {
  width: 1226px;
  margin: 0 auto;
}

.empty-cart-wrap {
  margin-left: 80px;
  background-color: #f5f5f5;
  text-align: center;
  padding: 80px 0;
}

.empty-cart-top {
  background-color: #f5f5f5;
  height: 200px;
  margin-bottom: 50px;
  background: url('../assets/img/shopcart/cart-empty.png') no-repeat 20px;
}

.empty-cart-top .login-tip {
  font-size: 36px;
  color: #b0b0b0;
  margin-bottom: 1px;
  padding-top: 22px;
}

.empty-cart-top .login-desc {
  margin-top: 1px;
  font-size: 20px;
  color: #b0b0b0;
  margin-bottom: 10px;
  margin-left: -80px;
}

.empty-cart-top .btn {
  width: 170px;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  margin: 0 5px;
}

.empty-cart-top .btn-login {
  text-decoration: none;
  display: inline-block;
  width: 170px;
  height: 48px;
  background-color: #ff6700;
  border-color: #ff6700;
  color: #fff;
}

.empty-cart-top .btn-shoping-nologin {
  text-decoration: none;
  display: inline-block;
  width: 170px;
  height: 48px;
  border: 1px solid #ff6700;
  color: #ff6700;
}

.cart-wrap {
  padding: 0 0 20px;
}

.cart-goods-list {
  padding-top: 30px;
}

.list-head {
  height: 70px;
  line-height: 70px;
  background-color: #fff;
  color: #424242;
  padding-right: 26px;
}

.list-head .col {
  float: left;
}

.list-head .col-check {
  margin-left: 18px;
  width: 110px;

}

.list-head .col-check input {
  width: 18px;
  height: 18px;
  accent-color: #ff6700;
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
}

.list-head .col-check input:checked {
  background-color: #ff6700;
  border-color: #ff6700;
}

.list-head .col-check input:checked::after {
  content: '✓';
  position: absolute;
  top: -2px;
  left: 2px;
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.item-row .col-check input {
  margin-left: 14px;
  width: 18px;
  height: 18px;
  accent-color: #ff6700;
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
}

.item-row .col-check input:checked {
  background-color: #ff6700;
  border-color: #ff6700;
}

.item-row .col-check input:checked::after {
  content: '✓';
  position: absolute;
  top: -2px;
  left: 2px;
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.list-head .col-img {
  width: 100px;
}

.list-head .col-name {
  width: 360px;
}

.list-head .col-price {
  width: 140px;
  padding-right: 28px;
  text-align: center;
}

.list-head .col-num {
  width: 150px;
  padding-right: 8px;
  text-align: center;
}

.list-head .col-total {
  width: 120px;
  padding-right: 80px;
  text-align: right;
}

.list-head .col-action {
  width: 80px;
  text-align: center;
}

.col-options {
  display: flex;
  width: 100px;
  text-align: center;
}

.col-options li {
  display: block;
  white-space: nowrap;
  max-width: 600px;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid #eee;
  margin-bottom: 5px;
  padding: 5px;
}

.placeholder-div {
  margin: 20px 0;
}

.cart-bar {
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  position: relative;
  z-index: 1;
  text-align: right;
}

.cart-bar .section-left {
  float: left;
}

.cart-bar .back-shopping {
  font-size: 14px;
  text-decoration: none;
  color: #757575;
  margin-left: 32px;
  line-height: 50px;
}

.cart-bar .cart-total {
  font-size: 14px;
  color: #757575;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid #eee;
}

.cart-bar .cart-total i {
  color: #ff6700;
  font-style: normal;
  font-weight: 400;
}

.cart-bar .total-price {
  float: right;
  font-size: 14px;
  color: #ff6700;
}

.cart-bar .total-price em {
  font-style: normal;
  font-size: 30px;
}

.cart-bar .total-price .btn {
  display: inline-block;
  width: 186px;
  height: 50px;
  line-height: 48px;
  font-size: 18px;
  text-decoration: none;
  color: #fff;
  background-color: #ff6700;
  vertical-align: top;
  margin-left: 50px;
  text-align: center;
}

.cart-bar .no-select-tip {
  position: absolute;
  right: 200px;
  top: -58px;
  color: #ff6700;
  width: 200px;
  height: 48px;
  line-height: 48px;
  background-color: #fff;
  border: 1px solid #ff6700;
  text-align: center;
}

.item-box {
  padding: 15px 26px 15px 0;
  border-top: 0.5px solid #e0e0e0;
  background-color: #fff;
}

.item-table {
  display: table;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 25px;
  width: 100%;
}

.item-row {
  display: table-row;
}

.item-row .col {
  display: table-cell;
  vertical-align: middle;
}

.item-row .col-check {
  width: 50px;
  padding-left: 10px;
}

.item-row .col-check .iconfont {
  font-size: 24px;
  vertical-align: middle;
  color: #fff;
  background-color: #ff6700;
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 18px;
  border: 1px solid #e0e0e0;
  text-align: center;
  position: relative;
  top: -1px;
  cursor: pointer;
}

.item-row .col-img {
  width: 60px;
  height: 60px;
  overflow: hidden;
}

.item-row .col-img img {
  width: 60px;
  height: 60px;
}

.item-row .col-name {
  width: 380px;
}

.item-row .col-name .name {
  font-size: 18px;
  font-weight: normal;
  line-height: 1;
  margin: 8px 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.item-row .col-name .name a {
  color: #424242;
}

.item-row .col-price {
  width: 140px;
  padding-right: 18px;
  text-align: center;
  color: #424242;
  font-size: 16px;
}

.item-row .col-num {
  width: 150px;
  text-align: center;
  color: #424242;
  font-size: 16px;
}

.item-row .change-goods-num {
  display: inline-block;
  width: 148px;
  height: 38px;
  border: 1px solid #e0e0e0;
  line-height: 38px;
  text-align: center;
  background-color: #fff;
  position: relative;
  zoom: 1;
}

.item-row .change-goods-num a {
  float: left;
  width: 38px;
  height: 38px;
  line-height: 38px;
  color: #757575;
  font-size: 20px;
  transition: all 0.3s;
  text-decoration: none;
  border-bottom: none;
}

.item-row .change-goods-num a:hover {
  background-color: #e0e0e0;
}

.item-row .change-goods-num a.disabled {
  color: #b0b0b0;
  cursor: not-allowed;
  pointer-events: none;
}

.item-row .change-goods-num a.disabled:hover {
  background-color: transparent;
}

.item-row .change-goods-num input {
  float: left;
  width: 72px;
  height: 38px;
  line-height: 38px;
  padding: 0;
  border-width: 0;
  color: #424242;
  font-size: 16px;
  text-align: center;
  appearance: none;
  text-decoration: none;
  border-bottom: none;
}

.item-row .change-goods-num input:focus {
  outline: 0;
}

.item-row .col-total {
  width: 120px;
  padding-right: 81px;
  text-align: right;
  color: #ff6700;
  font-size: 16px;
}

.item-row .col-action {
  width: 80px;
  text-align: center;
}

.item-row .col-action .del {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 12px;
  color: #757575;
  font-size: 16px;
  transition: all 0.3s;
  text-decoration: none;
  border-bottom: none;
}

.item-row .col-action .del i {
  text-decoration: none;
  border-bottom: none;
}

.item-row .col-action .del:hover {
  color: #fff;
  background-color: #e53935;
}

.item-box .pre-info {
  margin: 0;
  font-size: 12px;
  color: #b0b0b0;
}

.item-sub-box {
  margin-left: 100px;
  position: relative;
  border: 1px solid #e0e0e0;
}

.item-sub-box .extend-buy {
  height: 48px;
  line-height: 48px;
  padding-left: 20px;
  color: #424242;
  transition: all 0.4s;
  cursor: pointer;
}

.item-sub-box .extend-buy:hover {
  background-color: #fafafa;
}

.item-sub-box .extend-buy .iconfont {
  font-size: 22px;
  line-height: 1;
  border-radius: 11px;
  text-align: center;
  background: #ff6700;
  color: #fff;
  vertical-align: middle;
  position: relative;
  top: -1px;
  margin-right: 15px;
  display: inline-block;
  width: 22px;
  height: 22px;
}

.item-sub-box .extend-buy span {
  margin-left: 30px;
}

.cart-tip-box {
  margin-bottom: 12px;
  padding: 10px 0;
  background: #fffbe6;
  color: #ff6700;
  border: 1px solid #ffe58f;
  border-radius: 4px;
  text-align: center;
  font-size: 15px;
}

.cart-tip-box-float {
  position: absolute;
  left: 92%;
  top: -65px;
  transform: translateX(-50%);
  min-width: 140px;
  background-color: #fff;
  padding: 0 24px;
  color: #ff6700;
  border: 0.5px solid #ff6700;
  text-align: center;
  font-size: 14px;
  pointer-events: none;
}

.cart-tip-box-float::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -10px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid #fff;
  /* 三角边框 */
  filter: drop-shadow(0 0 1px #ff6700);
}

.btn-disabled {
  background: #e0e0e0 !important;
  color: #999 !important;
  cursor: default;
  border: none;
}

.cart-bar-fixed {
  position: fixed !important;
  left: 144px;
  right: 0;
  max-width: 1226px;
  bottom: 0;
  z-index: 100;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
}
</style>
