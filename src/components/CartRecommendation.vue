<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cartstore'
import { getShangPinData, getShangPinDataById } from '../testdata/data'
import { useRouter } from 'vue-router'

const router = useRouter()

const cartStore = useCartStore()

const shangpinData = getShangPinData("recommendation")

const showList = ref(Array(shangpinData.length).fill(false))

function addToCart(id, index) {
  showList.value[index] = true
  setTimeout(() => {
    showList.value[index] = false
  }, 1000)
  let shangpin = fengzhuangShangPin(id)
  console.log(shangpin)
  cartStore.addShangPinInCart(shangpin)
}

// 在推荐界面直接加入购物车，默认配置为第一个型号、第一个配置、第一个颜色
const fengzhuangShangPin = (id) => {
  let shangpin = getShangPinDataById(id)
  return {
    shangpinid: shangpin.id,
    data: {
      xinghaoid: 1,
      peizhiid: 1,
      colorid: 1,
      jiage: shangpin.money,
    },
  }
}

function jumpToDetails(id) {
  router.push({
    path: "/details",
    query: { id: id }
  })
}
</script>

<template>
  <div class="mi-recommend">
    <span class="recommend-title" v-if="cartStore.getShangPinsInCart.length > 0">买购物车中商品的人还买了</span>
    <span class="recommend-title" v-else>为您推荐</span>
    <div class="recommend-bd">
      <ul class="recommend-list">
        <li v-for="(rec, index) in shangpinData" :key="rec.id" class="recommend-item">
          <a href="javascript:void(0)" @click="jumpToDetails(rec.id)" class="recommend">
            <img :alt="rec.name" :src="rec.path" width="140px" />
            <div class="recommend-name">{{ rec.name }}</div>
            <div class="recommend-price">{{ rec.money }}元</div>
            <div class="recommend-tips">{{ rec.reviews }}</div>
          </a>
          <div class="recommend-action">
            <a class="btn" href="javascript:void(0)" @click="addToCart(rec.id, index)">加入购物车</a>
          </div>
          <div class="recommend-notice" v-if="showList[index]">
            <a class="btn">成功加入购物车</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.mi-recommend {
  background-color: #f5f5f5;
  padding-bottom: 60px;
}


.recommend-title {
  display: flex;
  font-size: 30px;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  color: #757575;
  margin-bottom: 10px;
  padding: 20px 148px;
}

.recommend-title span {
  padding: 0 24px;
  background: #f5f5f5;
  position: relative;
  z-index: 1;
}

/* 左横线 */
.recommend-title::before,
.recommend-title::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #e0e0e0;
  display: block;
}

/* 间距美化 */
.recommend-title::before {
  margin-right: 160px;
}

.recommend-title::after {
  margin-left: 160px;
}

.mi-recommend .recommend-bd {
  width: 1226px;
  margin: 0 auto;
}

.mi-recommend .recommend-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  padding: 0;
  margin: 0;
}

.recommend {
  text-decoration: none;
}

.mi-recommend .recommend-item {
  list-style: none;
  width: 18%;
  height: 300px;
  background-color: #fff;
  text-align: center;
  padding-top: 20px;
  box-sizing: border-box;
  position: relative;
  transition: all 0.2s ease;
}

.mi-recommend .recommend-item:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.mi-recommend .recommend-item img {
  display: block;
  margin: 20px auto 18px;
  width: 140px;
  height: 140px;
}

.mi-recommend .recommend-item:hover .recommend-action {
  opacity: 1;
  transform: translateZ(0);
}

.mi-recommend .recommend-item:hover .recommend-tips {
  opacity: 0;
  transition: all 0.4s;
}

.mi-recommend .recommend-name {
  margin: 0 10px 10px;
  height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #333;
}

.mi-recommend .recommend-price {
  margin-bottom: 10px;
  color: #ff6700;
}

.mi-recommend .recommend-tips {
  position: relative;
  color: #757575;
}

.mi-recommend .recommend-action {
  position: absolute;
  left: 0;
  bottom: 16px;
  width: 100%;
  opacity: 0;
  transform: translate3d(0, 200%, 0);
  transition: all 0.4s;
}

.mi-recommend .recommend-action .btn {
  display: inline-block;
  text-align: center;
  width: 140px;
  height: 25px;
  line-height: 22px;
  font-size: 12px;
  text-decoration: none;
  color: #ff6700;
  border: 1px solid #ff6700;
}

.mi-recommend .recommend-notice {
  position: absolute;
  top: -24px;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 30px;
  color: #fff;
  transform: translate3d(0, 25px, 0);
  background-color: #83c44e;
}
</style>
