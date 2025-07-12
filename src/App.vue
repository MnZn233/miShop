<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useCartStore } from '@/stores/cartstore'

const cartStore = useCartStore()

// 页面加载时从 sessionStorage 中恢复购物车数据
onMounted(() => {
  cartStore.loadFromSessionStorage()

  // 在页面刷新或关闭前保存购物车数据到 sessionStorage
  window.addEventListener('beforeunload', () => {
    cartStore.saveToSessionStorage()
  })
})

// 组件卸载前移除监听器（防止内存泄漏）
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', () => {
    cartStore.saveToSessionStorage()
  })
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
