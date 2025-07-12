<script setup>
import { ref, onMounted } from "vue";
import { dataInJs } from "../testdata/testdata.js";

const guanggaoimg = ref([]);
const service = ref([]);

onMounted(() => {
    const data = dataInJs();
    guanggaoimg.value = data.guanggaoimg;
    service.value = data.service;
});
</script>

<template>
    <div class="four-img-main">
        <div class="main-content-b">
            <div class="main-left-b">
                <div class="service">
                    <div class="service-info" v-for="(item, index) in service" :key="index">
                        <div :class="`service-img-${item.id}`"></div>
                        <p class="service-name">{{ item.name }}</p>
                    </div>
                </div>
            </div>
            <div class="main-right-b">
                <div class="three-img-box">
                    <div class="three-img-div" v-for="(item, index) in guanggaoimg" :key="index">
                        <img class="three-img" :src="item.src" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 四图部分样式 */
.four-img-main {
    margin-top: 20px;
    width: 100%;
    height: 160px;
    margin-bottom: 20px;
}

div.main-content-b {
    position: relative;
    margin: 0 auto;
    width: 1226px;
    height: 100%;
}

div.main-left-b,
.service {
    position: absolute;
    top: 0;
    left: 0;
    margin-left: 0;
    width: 240px;
    height: 160px;
}

.service {
    width: 240px;
    height: 160px;
    background-color: #5f5750;
    display: flex;
    flex-wrap: wrap;
}

.service-info {
    margin: 0 auto;
    width: 80px;
    height: 80px;
}

.service-img-1,
.service-img-2,
.service-img-3,
.service-img-4,
.service-img-5,
.service-img-6 {
    width: 80px;
    height: 40px;
    background: center bottom;
    background-size: 30%;
    background-repeat: no-repeat;
}

/* 为服务1增加右面缩小的边框 */
.service-img-1::after {
    position: absolute;
    content: "";
    height: 70px;
    border-left: 1px solid #7c7474;
    top: 5px;
    right: 160px;
}

/* 为服务2增加右面缩小的边框 */
.service-img-2::after {
    position: absolute;
    content: "";
    height: 70px;
    border-left: 1px solid #7c7474;
    top: 5px;
    right: 80px;
}

/* 为服务4增加右面缩小的边框 */
.service-img-4::after {
    position: absolute;
    content: "";
    height: 70px;
    border-left: 1px solid #7c7474;
    top: 85px;
    right: 160px;
}

/* 为服务5增加右面缩小的边框 */
.service-img-5::after {
    position: absolute;
    content: "";
    height: 70px;
    border-left: 1px solid #7c7474;
    top: 85px;
    right: 80px;
}

/* 为服务1增加水平缩小的边框 */
.service-img-1::before {
    position: absolute;
    content: "";
    width: 70px;
    border-bottom: 1px solid #7c7474;
    top: 78px;
    left: 5px;
}

/* 为服务2增加水平缩小的边框 */
.service-img-2::before {
    position: absolute;
    content: "";
    width: 70px;
    border-bottom: 1px solid #7c7474;
    top: 78px;
    left: 85px;
}

/* 为服务3增加水平缩小的边框 */
.service-img-3::before {
    position: absolute;
    content: "";
    width: 70px;
    border-bottom: 1px solid #7c7474;
    top: 78px;
    left: 165px;
}

.service-img-1 {
    background-image: url("../assets/img/main-a-img-small/4a.png");
}

.service-img-2 {
    background-image: url("../assets/img/main-a-img-small/5a.png");
}

.service-img-3 {
    background-image: url("../assets/img/main-a-img-small/6a.png");
}

.service-img-4 {
    background-image: url("../assets/img/main-a-img-small/7a.png");
}

.service-img-5 {
    background-image: url("../assets/img/main-a-img-small/8a.png");
}

.service-img-6 {
    background-image: url("../assets/img/main-a-img-small/9a.png");
}

.service-info>p {
    margin: 0 auto;
    margin-top: 10px;
    text-align: center;
    line-height: 1px;
    font-size: 12px;
    color: #C3C3C3;
}

.service-info:hover p {
    color: #FFFFFF;
    cursor: pointer;
}

/* 设置鼠标至于其上的背景图片更换 */
.service-info:hover .service-img-1 {
    background-image: url("../assets/img/main-a-img-small/4.png");
}

.service-info:hover .service-img-2 {
    background-image: url("../assets/img/main-a-img-small/5.png");
}

.service-info:hover .service-img-3 {
    background-image: url("../assets/img/main-a-img-small/6.png");
}

.service-info:hover .service-img-4 {
    background-image: url("../assets/img/main-a-img-small/7.png");
}

.service-info:hover .service-img-5 {
    background-image: url("../assets/img/main-a-img-small/8.png");
}

.service-info:hover .service-img-6 {
    background-image: url("../assets/img/main-a-img-small/9.png");
}

/* 右面三张图的相关设置 */
.main-right-b {
    position: absolute;
    top: 0px;
    left: 240px;
    width: 986px;
    height: 160px;
}

.three-img-box {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100%;
    height: 160px;
    display: flex;
    justify-content: end;
}

.three-img-div {
    margin-left: 19px;
}

.three-img {
    width: 310px;
    height: 160px;
}

.three-img-div:hover {
    cursor: pointer;
}
</style>
