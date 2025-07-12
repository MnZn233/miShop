<script setup>
import CartHeader from '@/components/CartHeader.vue';
import CartRecommendation from '@/components/CartRecommendation.vue';
import CartContent from '@/components/CartContent.vue';
import MyFooter from '@/components/common/MyFooter.vue';
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cartstore';

const cartStore = useCartStore();
const number = ref(100);

onMounted(() => {
  
});
</script>

<template>
  <CartHeader />
  <CartContent />
  <CartRecommendation />
  <MyFooter />
</template>

<style scoped></style>
