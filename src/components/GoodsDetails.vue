<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCurrentInstance } from 'vue';
import { useCartStore } from "@/stores/cartstore";

const { proxy } = getCurrentInstance();
// route 是负责接收别的组件通过路由跳转到GoodsDetails.vue组件时携带过来的参数的。
const route = useRoute();
// router 是负责让GoodsDetails.vue组件使用路由管理器跳向其它组件的。
const router = useRouter();
const cartstore = useCartStore();

const id = ref(0);
const shangpin = ref({});
const xinghao = ref({});
const peizhi = ref({});
const color = ref({});
const yiwaibaoxian = ref({});
const yanchangbaoxian = ref({});
const yunserve = ref({});

const selectedshangpian = ref({
    shangpinid: 0,      //选择的是哪个商品
    data: {             //具体的是配置信息对应id
        xinghaoid: 0,
        peizhiid: 0,
        colorid: 0,
        yiwaibaoxianid: 0,
        yanchangbaoxianid: 0,
        yunserveid: 0,
        jiage: 0,
    },
});

// 定义当前型号、配置、颜色、意外保险、延保、云服务对应的选中方法
const changSelectedXingHao = (index) => {
    if (xinghao.value.id - 1 === index) {
        xinghao.value = shangpin.value.xinghao[0];
    } else {
        xinghao.value = shangpin.value.xinghao[index];
    }
};

const changSelectedPeiZhi = (index) => {
    if (peizhi.value.id - 1 === index) {
        peizhi.value = shangpin.value.peizhi[0];
    } else {
        peizhi.value = shangpin.value.peizhi[index];
    }
};

const changSelectedColor = (index) => {
    if (color.value.id - 1 === index) {
        color.value = shangpin.value.color[0];
    } else {
        color.value = shangpin.value.color[index];
    }
};

const changSelectedYiWaiBaoXian = (index) => {
    if (yiwaibaoxian.value.id - 1 === index) {
        yiwaibaoxian.value = {};
    } else {
        yiwaibaoxian.value = shangpin.value.yiwaibaoxian[index];
    }
};

const changSelectedYanChangBaoXian = (index) => {
    if (yanchangbaoxian.value.id - 1 === index) {
        yanchangbaoxian.value = {};
    } else {
        yanchangbaoxian.value = shangpin.value.yanchangbaoxian[index];
    }
};

const changSelectedYunServe = (index) => {
    if (yunserve.value.id - 1 === index) {
        yunserve.value = {};
    } else {
        yunserve.value = shangpin.value.yunserve[index];
    }
};

const gomycart = () => {
    selectedshangpian.value.shangpinid = Number(id.value);
    selectedshangpian.value.data.xinghaoid = xinghao.value.id;
    selectedshangpian.value.data.peizhiid = peizhi.value.id;
    selectedshangpian.value.data.colorid = color.value.id;
    selectedshangpian.value.data.yiwaibaoxianid = yiwaibaoxian.value.id;
    selectedshangpian.value.data.yanchangbaoxianid = yanchangbaoxian.value.id;
    selectedshangpian.value.data.yunserveid = yunserve.value.id;
    selectedshangpian.value.data.jiage = shangpinjiage.value;
    cartstore.addShangPinInCart(selectedshangpian.value);
    // console.log(selectedshangpian.value);
    router.push({
        path: "/mycart",
    });
};

// 计算属性
const shangpindata = computed(() => {
    return shangpin.value;
});

const oldluojijiage = computed(() => {
    return xinghao.value.oldmoney + peizhi.value.jiage;
});

const shangpinjiage = computed(() => {
    return xinghao.value.jiage + peizhi.value.jiage + color.value.jiage;
});

const currentxinghao = computed(() => {
    return xinghao.value.id - 1;
});

const currentpeizhi = computed(() => {
    return peizhi.value.id - 1;
});

const currentcolor = computed(() => {
    return color.value.id - 1;
});

const currentyiwaibaoxian = computed(() => {
    return yiwaibaoxian.value.id - 1;
});

const currentyanchangbaoxian = computed(() => {
    return yanchangbaoxian.value.id - 1;
});

const currentyunserve = computed(() => {
    return yunserve.value.id - 1;
});

onMounted(() => {
    id.value = route.query.id;
    shangpin.value = proxy.$getShangPinDataById(id.value);
    xinghao.value = shangpin.value.xinghao[0];
    peizhi.value = shangpin.value.peizhi[0];
    color.value = shangpin.value.color[0];
});
</script>

<template>
    <div class="kuang-zuiwaiceng">
        <div class="details-top">
            <div class="details-neirongqu">
                <div class="details-top-left">
                    <p class="xilienameda">{{ shangpindata.leibiexiliename }}</p>
                    <p class="line-a" v-if="shangpindata.shoujixiliename">|</p>
                    <p class="xilienamexiao">{{ shangpindata.shoujixiliename }}</p>
                </div>
                <div class="details-top-right">
                    <p class="gocanshuye">概述页</p>
                    <p class="line-b">|</p>
                    <p class="gocanshuye">参数页</p>
                    <p class="line-b">|</p>
                    <p class="gocanshuye">F码通道</p>
                    <p class="line-b">|</p>
                    <p class="gocanshuye">咨询客服</p>
                    <p class="line-b">|</p>
                    <p class="gocanshuye">用户评价</p>
                </div>
            </div>
        </div>
        <div class="details-neirongqu">
            <div class="details-bottom-left">
                <div class="shouji-img-box">
                    <img class="shouji-img-big" :src=shangpindata.infoIMgsrc />
                </div>
            </div>
            <div class="details-bottom-right">
                <div class="shoujidetails">
                    <div class="xiliemingbig">{{ shangpindata.leibiexiliename }}</div>
                    <div class="liangdian-b">
                        <span class="liangdian-text" v-for="(item, index) in shangpindata.liangdian" :key="index">{{
                            shangpindata.liangdian[index] }} <span
                                v-if="index != shangpindata.liangdian.length - 1">|</span> </span>
                    </div>
                    <div class="xiaomiziying">小米自营</div>
                    <p class="jiage-text-a">{{ shangpinjiage }}元 <del style="color: #b0b0b0;" v-if="oldluojijiage">{{
                        oldluojijiage }}元</del></p>
                </div>
                <div class="zengpin-a">
                    <p class="zengpin-btn">赠品</p>
                    <p class="zengpin-text" v-for="(item, index) in shangpindata.zengpin" :key="index">
                        {{ item.tiaojian }} ，赠价值
                        {{ item.zengpinjiage }} 元
                        {{ item.zengpinname }}，
                        {{ item.jiezhishijian }}
                    </p>
                </div>
                <div class="weizhi">
                    <div class="weizhi-left">
                        <div class="weizhi-img-box"></div>
                    </div>
                    <div class="weizhi-right">
                        <div class="weizhi-right-top">
                            <p class="weizhi-text">北京</p>
                            <p class="weizhi-text">北京市</p>
                            <p class="weizhi-text">海淀区</p>
                            <p class="weizhi-text">清河街道</p>
                            <p class="weizhi-text-red">修改</p>
                        </div>
                        <div class="weizhi-right-bottom">
                            <p class="weizhi-text-red">有现货</p>
                        </div>
                    </div>
                </div>
                <div class="select-peizhi-box">
                    <div class="select-title">选择产品</div>
                    <div class="select-btn-box">
                        <div v-for="(item, index) in shangpindata.xinghao" :key="index"
                            @click="changSelectedXingHao(index)"
                            :class="index == currentxinghao ? 'select-btn selected' : 'select-btn'">{{ item.name
                            }}</div>
                    </div>
                </div>
                <div class="select-peizhi-box">
                    <div class="select-title">选择版本</div>
                    <div class="select-btn-box">
                        <div v-for="(item, index) in shangpindata.peizhi" :key="index"
                            @click="changSelectedPeiZhi(index)"
                            :class="index == currentpeizhi ? 'select-btn selected' : 'select-btn'">{{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="select-peizhi-box">
                    <div class="select-title">选择颜色</div>
                    <div class="select-btn-box">
                        <div v-for="(item, index) in shangpindata.color" :key="index" @click="changSelectedColor(index)"
                            :class="index == currentcolor ? 'select-btn selected' : 'select-btn'">{{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="select-peizhi-box">
                    <div class="select-baohu-top">
                        <div class="select-title">选择小米提供的意外保护</div>
                        <div class="select-title-red">了解意外保护 ></div>
                    </div>
                    <div class="baohu-xiangmu-box">
                        <div v-for="(item, index) in shangpindata.yiwaibaoxian" :key="index"
                            @click="changSelectedYiWaiBaoXian(index)" class="baohu-bottom"
                            :class="{ 'selected': index == currentyiwaibaoxian }">
                            <div class="select-baohu-bottom-left">
                                <div
                                    :class="index == currentyiwaibaoxian ? 'select-baohu-point selected' : 'select-baohu-point'">
                                    √</div>
                                <div class="baohu-icon"></div>
                            </div>
                            <div class="select-baohu-bottom-right">
                                <div class="baohu-bottom-right-left">
                                    <div class="baohu-content-textrow">
                                        <div class="baohu-text-a">{{ item.name }}</div>
                                        <div class="baohu-text-b">{{ item.info }}</div>
                                    </div>
                                    <div class="baohu-text-c">{{ item.infodetails }}</div>
                                    <div class="baohu-content-textrow">
                                        <p class="baohu-text-d">购买前请阅读</p>
                                        <p class="baohu-text-e">服务条款</p>
                                        <p class="line-d">|</p>
                                        <p class="baohu-text-e">常见问题</p>
                                    </div>
                                </div>
                                <div class="baohu-bottom-right-right">
                                    <p class="baohujiage">{{ item.jiage }}元</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="select-peizhi-box">
                    <div class="select-baohu-top">
                        <div class="select-title">选择小米提供的延长保修</div>
                        <div class="select-title-red">了解延长保修 ></div>
                    </div>
                    <div class="baohu-xiangmu-box">
                        <div v-for="(item, index) in shangpindata.yanchangbaoxian" :key="index"
                            @click="changSelectedYanChangBaoXian(index)"
                            v-bind:class="index == currentyanchangbaoxian ? 'baohu-bottom selected' : 'baohu-bottom'">
                            <div class="select-baohu-bottom-left">
                                <div
                                    v-bind:class="index == currentyanchangbaoxian ? 'select-baohu-point selected' : 'select-baohu-point'">
                                    √</div>
                                <div class="baohu-icon"></div>
                            </div>
                            <div class="select-baohu-bottom-right">
                                <div class="baohu-bottom-right-left">
                                    <div class="baohu-content-textrow">
                                        <div class="baohu-text-a">{{ item.name }}</div>
                                        <div class="baohu-text-b">{{ item.info }}</div>
                                    </div>
                                    <div class="baohu-text-c">{{ item.infodetails }}</div>
                                    <div class="baohu-content-textrow">
                                        <p class="baohu-text-d">购买前请阅读</p>
                                        <p class="baohu-text-e">服务条款</p>
                                        <p class="line-d">|</p>
                                        <p class="baohu-text-e">常见问题</p>
                                    </div>
                                </div>
                                <div class="baohu-bottom-right-right">
                                    <p class="baohujiage">{{ item.jiage }}元</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="select-peizhi-box">
                    <div class="select-baohu-top">
                        <div class="select-title">选择小米提供的云空间服务</div>
                        <div class="select-title-red">了解云服务 ></div>
                    </div>
                    <div class="baohu-xiangmu-box">
                        <div v-for="(item, index) in shangpindata.yunserve" :key="index"
                            @click="changSelectedYunServe(index)"
                            v-bind:class="index == currentyunserve ? 'baohu-bottom selected' : 'baohu-bottom'">
                            <div class="select-baohu-bottom-left">
                                <div
                                    v-bind:class="index == currentyunserve ? 'select-baohu-point selected' : 'select-baohu-point'">
                                    √</div>
                                <div class="baohu-icon"></div>
                            </div>
                            <div class="select-baohu-bottom-right">
                                <div class="baohu-bottom-right-left">
                                    <div class="baohu-content-textrow">
                                        <div class="baohu-text-a">{{ item.name }}</div>
                                        <div class="baohu-text-b">{{ item.info }}</div>
                                    </div>
                                    <div class="baohu-text-c">{{ item.infodetails }}</div>
                                    <div class="baohu-content-textrow">
                                        <p class="baohu-text-d">购买前请阅读</p>
                                        <p class="baohu-text-e">服务条款</p>
                                        <p class="line-d">|</p>
                                        <p class="baohu-text-e">常见问题</p>
                                    </div>
                                </div>
                                <div class="baohu-bottom-right-right">
                                    <p class="baohujiage">{{ item.jiage }}元</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tocart-box">
                    <div class="tocart-btn">
                        <div class="jiarugouwuche" @click="gomycart()">加入购物车</div>
                        <div class="shoucang-box">
                            <div class="xin-img-box"></div>
                            <p class="xihuan">喜欢</p>
                        </div>
                    </div>
                    <div class="yuan-box">
                        <!-- 图标用图片代替 -->
                        <div class="yuan-img-box"></div>
                        <p class="yuan-text">小米自营</p>
                        <div class="yuan-img-box"></div>
                        <p class="yuan-text">发货说明</p>
                        <div class="yuan-img-box"></div>
                        <p class="yuan-text">7天无理由退货（到店自取拆封后不支持）</p>
                        <div class="yuan-img-box"></div>
                        <p class="yuan-text">运费说明</p>
                        <div class="yuan-img-box"></div>
                        <p class="yuan-text">企业信息</p>
                        <div class="yuan-img-box"></div>
                        <p class="yuan-text">7天价格保护</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.kuang-zuiwaiceng {
    width: 100%;
    /* 宽度满屏 */
    height: 100%;
    /* 让高度岁内容多少改变 */
    display: flex;
    /* 设置其为弹性布局 */
    flex-direction: column;
    /* 设置其内元素上下摆放 */
    justify-content: center;
    /* 设置其内元素水平居中 */
}

.details-top {
    width: 100%;
    /* 宽度满屏 */
    height: 63px;
    /* 让高度为60px */
    border-top: 1px solid #ccc;
    /* 设置上边框样式 */
    border-bottom: 1px solid #ccc;
    /* 设置下边框样式 */
    box-shadow: 0px 3px 5px 3px #ececec;
    /* 设置四边阴影样式 */
    display: flex;
    /* 设置其为弹性布局 */
    justify-content: center;
    /* 设置其内元素水平居中 */
}

.details-neirongqu {
    margin: 0 auto;
    width: 1240px;
    display: flex;
    justify-content: space-between;
}

.details-bottom-left {
    margin: 0;
    width: 50%;
    display: flex;
    justify-content: flex-start;
}

.details-bottom-right {
    margin: 0;
    width: 50%;
    display: flex;
    flex-direction: column;
}

.details-top-left {
    margin: 0;
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.xilienameda {
    font-size: 18px;
    font-weight: 500;
    color: #424242;
}

.line-a {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 12px;
    font-weight: 400;
    color: #616161;
}

.xilienamexiao {
    font-size: 12px;
    font-weight: 400;
    color: #616161;
}

.xilienamexiao:hover {
    color: #ff6700;
}

.details-top-right {
    margin: 0;
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.gocanshuye {
    font-size: 14px;
    font-weight: 400;
    color: #616161;
}

.line-b {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 14px;
    font-weight: 400;
    color: #616161;
}

.gocanshuye:hover {
    color: #ff6700;
}

.shouji-img-box {
    margin-top: 20px;
    margin-left: 10px;
    width: 560px;
    height: 560px;
}

.shouji-img-big {
    width: 560px;
    height: 560px;
}

.shoujidetails {
    margin-top: 40px;
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
}

.xiliemingbig {
    width: 100%;
    height: 50px;
    font-size: 24px;
    font-weight: 400;
    color: #212121;
    text-align: left;
}

.liangdian-b {
    width: 100%;
    height: 30px;
    font-size: 14px;
    font-weight: 400;
    color: #b0b0b0;
    display: flex;
    justify-content: flex-start;

}

.xiaomiziying {
    width: 100%;
    height: 30px;
    font-size: 14px;
    font-weight: 400;
    color: #ff6700;
    text-align: left;
}

.jiage-text-a {
    width: 100%;
    height: 20px;
    font-size: 18px;
    line-height: 0;
    color: #ff6700;
    text-align: left;
}

.zengpin-a {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}

.zengpin-btn {
    width: 80px;
    height: 24px;
    background-color: #ff6700;
    text-align: center;
    color: #ffffff;
}

.zengpin-text {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 400;
    color: #212121;
}

.weizhi {
    margin-top: 20px;
    width: 100%;
    height: 100px;
    border: 1px solid #e0e0e0;
    background-color: #fafafa;
    display: flex;
    flex-wrap: nowrap;
    align-content: center;
}

.weizhi-left {
    width: 50px;
    height: 100%;
}

.weizhi-img-box {
    margin-top: 30px;
    margin-left: 25px;
    width: 13px;
    height: 20px;
    background-image: url("../assets/img/details/dingwei.png");
    background-size: 100% 100%;
}

.weizhi-right {
    margin-left: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;

}

.weizhi-right-top {
    margin-top: 15px;
    width: 100%;
    height: 20px;
    display: flex;
    flex-direction: row;
}

.weizhi-right-bottom {
    width: 100%;
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.weizhi-text {
    margin-right: 15px;
    font-size: 14px;
    color: #333333;
}

.weizhi-text-red {
    margin-right: 15px;
    font-weight: 500;
    font-size: 14px;
    color: #FF6700;
}

.select-peizhi-box {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.select-title {
    margin-bottom: 10px;
    width: 100%;
    height: 30px;
    font-size: 18px;
    color: #212121;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.select-btn-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.select-btn {
    margin-top: 6px;
    margin-bottom: 6px;
    width: 49%;
    height: 42px;
    text-align: center;
    line-height: 42px;
    font-size: 16px;
    color: #616161;
    border: 1px solid #e0e0e0;
}

.select-btn:hover {
    border: 1px solid #FF6700;
}

.select-btn.selected {
    border: 1px solid #FF6700;
}

.select-baohu-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.select-title-red {
    width: 50%;
    font-size: 14px;
    color: #FF6700;
    display: flex;
    justify-content: flex-end;
}

.baohu-xiangmu-box {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.baohu-bottom {
    width: 100%;
    height: 140px;
    display: flex;
    flex-direction: row;
    border: 1px solid #e0e0e0;
}

.baohu-bottom.selected {
    width: 100%;
    height: 140px;
    display: flex;
    flex-direction: row;
    border: 1px solid #FF6700;
}

.select-baohu-bottom-left {
    width: 20%;
    display: flex;
    flex-direction: row;
}

.select-baohu-point {
    margin-top: 50px;
    margin-left: 30px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid #b0b0b0;
    font-style: normal;
    line-height: 12px;
    color: #ffffff;
    font-size: 12px;
    text-align: center;
    vertical-align: middle;
}

.select-baohu-point:hover {
    cursor: pointer;
}

.select-baohu-point.selected {
    border: 1px solid #FF6700;
    background-color: #FF6700;
}

.baohu-icon {
    margin-top: 30px;
    margin-left: 20px;
    width: 50px;
    height: 50px;
    background-image: url("../assets/img/details/baoxian.png");
    background-size: 100% 100%;
}

.select-baohu-bottom-right {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.baohu-bottom-right-left {
    width: 80%;
    display: flex;
    flex-direction: column;
}

.baohu-content-textrow {
    margin-top: 5px;
    width: 100%;
    display: flex;
    justify-content: start;
}

.baohu-text-a {
    margin-top: 25px;
    font-size: 20px;
    font-weight: 700;
    color: #212121;
    text-align: left;
}

.baohu-text-b {
    margin-top: 25px;
    margin-left: 6px;
    font-style: normal;
    height: 20px;
    font-size: 14px;
    background: #ff6700;
    display: inline-block;
    padding: 2px 6px;
    border-radius: 20px;
    color: #fff;
}

.baohu-text-c {
    margin-top: 5px;
    text-align: left;
    font-size: 14px;
    height: 18px;
    color: #b0b0b0;
}

.baohu-text-d {
    margin-top: 5px;
    font-size: 14px;
    color: #424242;
}

.baohu-text-e {
    margin-top: 5px;
    margin-left: 7px;
    font-size: 14px;
    height: 18px;
    color: #ff6700;
}

.line-d {
    margin-top: 7px;
    margin-left: 7px;
    font-size: 14px;
    height: 18px;
    font-weight: 400;
    color: #ff6700;
}

.fang-point {
    margin-top: 7px;
    margin-right: 10px;
    width: 12px;
    height: 12px;
    text-align: center;
    border: 1px solid #b0b0b0;
    font-style: normal;
    line-height: 12px;
    color: white;
    font-size: 12px;
}

.fang-point:hover {
    cursor: pointer;
}

.fang-point.selected {
    border: 1px solid #FF6700;
    background-color: #FF6700;
}

.baohu-bottom-right-right {
    width: 10%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.baohujiage {
    margin-top: 100px;
    font-size: 14px;
    height: 20px;
    color: #424242;
}

.tocart-box {
    margin-top: 30px;
    width: 100%;
    height: 160px;
    display: flex;
    flex-direction: column;
}

.tocart-btn {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
}

.jiarugouwuche {
    width: 300px;
    height: 50px;
    background-color: #FF6700;
    font-size: 16px;
    font-weight: 500;
    line-height: 50px;
    text-align: center;
    color: #ffffff;
}

.shoucang-box {
    margin-left: 10px;
    width: 150px;
    height: 50px;
    background-color: #b0b0b0;
    font-size: 16px;
    font-weight: 500;
    line-height: 50px;
    text-align: center;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in;
}

.xin-img-box {
    width: 20px;
    height: 18px;
    background-image: url("../assets/img/details/xinxing-white.png");
    background-size: 100% 100%;
    transition: all 0.2s ease-in;
}

.xihuan {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 400;
    line-height: 50px;
}

.jiarugouwuche:hover {
    background-color: #e7534b;
    cursor: pointer;
    transition: all 0.2s ease-in;
}

.shoucang-box:hover {
    background-color: #616161;
    transition: all 0.2s ease-in;
    cursor: pointer;
}

.yuan-box {
    margin-top: 10px;
    margin-bottom: 20px;
    width: 93%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
}

.yuan-img-box {
    width: 20px;
    height: 20px;
    background-image: url("../assets/img/details/yuan1.png");
    background-size: 100% 100%;
}

.yuan-text {
    margin-left: 3px;
    margin-right: 10px;
    font-size: 14px;
    height: 20px;
    font-weight: 400;
    line-height: 20px;
    color: #b0b0b0;
}
</style>
