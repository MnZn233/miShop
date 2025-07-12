<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["id", "data"]);
const router = useRouter();

const shouji = ref([]);

const showDetails = (itemId) => {
    router.push({
        path: "/details",
        query: {
            id: itemId
        }
    });
};

onMounted(() => {
    shouji.value = props.data;
});
</script>

<template>
    <div class="shopping-group">
        <div class="content-box">
            <div class="group-content-A">
                <div class="title">手机</div>
                <div class="more">
                    <div>查看更多</div>
                    <!-- 源网站用图标库，这里用符号代替 -->
                    <div class="more-arraw">></div>
                </div>
            </div>
            <div class="group-content-B">
                <div class="leftShow">
                    <!-- v-if 此处用了没有效果，这是Vue的机制问题，V-show可以对数组索引进行判断，v-if不行 -->
                    <div class="show-big-div donghuaxiaoguoA" v-for="(item, index) in shouji" :key="index"
                        v-show="index == 0" @click="showDetails(item.id)">
                        <div><img :src="item.path" style="width: 234px;" /></div>
                    </div>
                </div>
                <div class="rightShow">
                    <div class="show-middle-div donghuaxiaoguoA" v-for="(item, index) in shouji" :key="index"
                        v-show="index != 0" @click="showDetails(item.id)">
                        <div class="shopping-img-box"><img :src="item.path" /></div>
                        <div class="shopping-name">{{ item.name }}</div>
                        <div class="shopping-info">{{ item.info }}</div>
                        <div class="shopping-moneyinfo">{{ item.moneyinfo }} <del v-if="item.oldmoney">{{ item.oldmoney
                                }}元</del></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.shopping-group {
    width: 100%;
    height: 686px;
    background-color: #f5f5f5;
    padding-top: 4px;
    display: flex;
    /* 设置该元素为弹性布局的容器*/
    justify-content: center;
    /* 设置容器的元素水平居中 */
}

.content-box {
    width: 1226px;
    height: 100%;
    display: flex;
    /* 设置该元素为弹性布局的容器*/
    flex-direction: column;
    /* 设置容器的元素上下摆放 */
}

.group-content-A {
    width: 100%;
    height: 58px;
    display: flex;
    /* 设置该元素为弹性布局的容器*/
    justify-content: space-between;
    /* 设置容器的元素两端摆放，即两端顶到头 */
}

.group-content-B {
    width: 100%;
    height: 628px;
    display: flex;
    /* 设置该元素为弹性布局的容器*/
    justify-content: space-between;
    /* 设置容器的元素两端摆放，即两端顶到头 */
}

/* 设置商品类别名称文字显示样式 */
.title {
    font-size: 22px;
    font-weight: 200;
    line-height: 58px;
    color: #333;
    align-self: flex-start;
    /* 设置该元素独自的摆放方式为左顶到头 */
}

/* 设置查看更多div样式 */
.more {
    height: 100%;
    display: flex;
    /* 设置该元素为弹性布局的容器*/
    justify-content: flex-end;
    /* 设置容器的元素水平居中 */
    align-content: center;
    font-size: 16px;
    line-height: 58px;
    color: #424242;
    transition: all 0.4s;
}

/* 设置圆形箭头样式 */
.more-arraw {
    align-self: center;
    /* 设置该元素垂直居中 */
    width: 12px;
    height: 12px;
    padding: 4px;
    margin-left: 8px;
    border-radius: 16px;
    /* 设置圆角半径 */
    font-size: 12px;
    font-weight: bold;
    line-height: 12px;
    background: #C3C3C3;
    color: #ffffff;
    text-align: center;
    vertical-align: center;
    transition: all 0.4s;
    /* 设置过度，已实现动画渐变效果*/
}

/* 设置查看更多div的鼠标进入变色效果 */
.more:hover {
    color: #ff6700;
}

/* 设置查看更多div的鼠标进入箭头div变色效果 */
.more:hover .more-arraw {
    background-color: #ff6700;
}

.leftShow {
    width: 234px;
    height: 614px;
}

.rightShow {
    width: 986px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
}

.show-big-div {
    margin: 0;
    width: 100px;
    height: 98%;
    background-color: white;
}

.show-middle-div {
    text-align: center;
    margin-top: 0;
    margin-left: 2%;
    width: 23%;
    height: 48%;
    background-color: white;
}

.shopping-img-box {
    padding-top: 20px;
}

.shopping-name {
    font-size: 14px;
}

.shopping-info {
    font-size: 10px;
    color: #C3C3C3;
}

.shopping-moneyinfo {
    display: inline-block;
    margin-top: 15px;
    margin-right: 5px;
    vertical-align: middle;
    font-size: 14px;
    color: #FF5500;
}

del {
    color: #b0b0b0;
}

.donghuaxiaoguoA {
    transition: all 0.2s ease-in;
}

.donghuaxiaoguoA:hover {
    cursor: pointer;
    box-shadow: 3px 7px 10px #a1a1a1;
    margin-top: -4px;
}
</style>
