<script setup>
import { ref } from "vue";
import { getCurrentInstance } from "vue";
import BlackNav from "../components/common/BlackNav.vue";
import WhiteNav from "../components/common/WhiteNav.vue";
import LunBoTu from "../components/LunBoTu.vue";
import FourImgShow from "../components/FourImgShow.vue";
import GoodsList from "../components/GoodsList.vue";
import MyFooter from "../components/common/MyFooter.vue";
import RightNav from "../components/common/RightNav.vue";

const { proxy } = getCurrentInstance();
const posts = ref([
    {
        id: 1,
        data: proxy.$malldata,
        // showtype: 1 // 可以扩展用于调用不同的显示风格
    }
]);
</script>

<template>
    <BlackNav />
    <WhiteNav />
    <LunBoTu />
    <FourImgShow />
    <GoodsList v-for="post in posts" :id="post.id" :data="post.data"/>
    <RightNav />
    <MyFooter />
</template>

<style scoped></style>
