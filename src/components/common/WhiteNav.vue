<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const time = ref(0);
const keyName = ref("");
let timerId = null;

/* 白色导航条左面内容 */
const whiteNavContent = ref([
    { name: "Xiaomi手机" },
    { name: "REDMI红米" },
    { name: "电视" },
    { name: "笔记本" },
    { name: "平板" },
    { name: "家电" },
    { name: "路由器" },
    { name: "服务中心" },
    { name: "社区" }
]);

const searchKeywords = ref([
    { name: "手机换新", id: 1 },
    { name: "空调", id: 2 },
    { name: "充电宝", id: 3 },
    { name: "风扇", id: 4 },
    { name: "Redmi K80", id: 5 },
    { name: "显示器", id: 6 },
    { name: "路由器", id: 7 },
    { name: "空气净化器", id: 8 }
]);

/*
*   搜索框鼠标进入点击及离开边框变色特效实现函数searchInputFocus()、
*   searchInputBlur()、searchInputMouseEnter()、searchInputMouseLeave()
*/
const searchInputFocus = () => {
    document.getElementById("input-search").style.borderColor = "#FF6700";
    document.getElementById("btn-search").style.borderColor = "#FF6700";
    document.getElementById("searchSelect").style.visibility = "visible";
    document.getElementById("input-search").hasFocus = true;
};

const searchInputBlur = () => {
    document.getElementById("input-search").style.borderColor = "#e0e0e0";
    document.getElementById("btn-search").style.borderColor = "#e0e0e0";
    document.getElementById("searchSelect").style.visibility = "hidden";
    document.getElementById("input-search").hasFocus = false;
};

const searchInputMouseEnter = () => {
    if (!document.getElementById("input-search").hasFocus) {
        document.getElementById("input-search").style.borderColor = "#424242";
        document.getElementById("btn-search").style.borderColor = "#424242";
    }
};

const searchInputMouseLeave = () => {
    if (!document.getElementById("input-search").hasFocus) {
        document.getElementById("input-search").style.borderColor = "#e0e0e0";
        document.getElementById("btn-search").style.borderColor = "#e0e0e0";
    }
};

const setStr = (str) => {
    keyName.value = str;
    const e = document.getElementById("input-search");
    if (!e) return;
    if (e.value) {
        e.style.opacity = "1";
    } else {
        e.style.opacity = "0.5";
    }
};

// 定义搜索框中用到的定时器
onMounted(() => {
    let ul = document.getElementById("searchSelectKey");
    let lis = ul.querySelectorAll("li");
    timerId = setInterval(() => {
        time.value++;
        if (time.value === 8) {
            time.value = 0;
        }
        setStr(lis[time.value].textContent);
    }, 2000);
});

onUnmounted(() => {
    if (timerId) clearInterval(timerId);  // 组件销毁时关闭定时器
});
</script>

<template>
    <div class="white-nav">
        <div class="white-navbar">
            <div class="white-navbar-left">
                <img class="logo-mini" src="../../assets/img/white-navbar/logo-mi2.png" />
            </div>
            <div class="white-navbar-middle">
                <ul class="white-nav-content">
                    <li v-for="(item, index) in whiteNavContent" :key="index">{{ item.name }}</li>
                </ul>
            </div>
            <div class="white-navbar-right">
                <!-- 搜索条 -->
                <div id="backlable" class="backlable">{{ keyName }}</div>
                <div class="search">
                    <input id="input-search" type="text" class="search-text" @click="searchInputFocus()"
                        @blur="searchInputBlur()" @mouseenter="searchInputMouseEnter()"
                        @mouseleave="searchInputMouseLeave()" />
                    <!-- 搜索图片——源网站用的是图标库，这里用图片代替 -->
                    <button id="btn-search" class="search_btn" @mouseenter="searchInputMouseEnter()"
                        @mouseleave="searchInputMouseLeave()">
                    </button>
                    <div id="searchSelect" class="searchSelect">
                        <ul id="searchSelectKey" class="searchSelectKey">
                            <li v-for="(item, index) in searchKeywords" :id="item.id" :key="index">{{ item.name }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 白色导航条部分 */

.white-nav {
    width: 100%;
    height: 100px;
    background-color: white;
}

.white-navbar {
    position: relative;
    margin: 0 auto;
    width: 1226px;
    height: 100%;
}

.white-navbar-left {
    position: absolute;
    left: 0;
    margin-left: 0;
    width: 62px;
    height: 100%;
}

.white-navbar-middle {
    position: absolute;
    margin-left: 230px;
    width: 850px;
    height: 100%;
}

div.white-navbar-right {
    position: absolute;
    margin-right: 0;
    right: 0;
    width: 296px;
    height: 100%;
}

img.logo-mini {
    position: absolute;
    width: 56px;
    height: 56px;
    left: 0;
    top: 22px;
    vertical-align: middle;
}

.white-nav-content {
    height: 100%;
    margin: 0;
    list-style-type: none;
    display: flex;
    float: left;
    font-size: 16px;
    padding: 0;
}

.white-nav-content li {
    padding-right: 18px;
    color: #424242;
    line-height: 100px;
}

.white-nav-content li:hover {
    color: #ff6700;
    cursor: pointer;
}

.search {
    position: absolute;
    right: 0;
    top: 25px;
    width: 300px;
    height: 50px;

}

.search .search-text {
    position: absolute;
    right: 49px;
    font-size: 14px;
    color: #333333;
    border: 1px solid #e0e0e0;
    width: 245px;
    height: 46px;
    padding-left: 10px;
}

.backlable {
    position: absolute;
    top: 25px;
    right: 49px;
    font-size: 14px;
    color: #333333;
    border: 1px solid #e0e0e0;
    text-align: left;
    line-height: 48px;
    width: 247px;
    height: 48px;
    padding-left: 10px;
}

.searchSelect {
    position: absolute;
    width: 245px;
    top: 49px;
    right: 50px;
    height: 245px;
    border: 1px solid #ff6700;
    padding-left: 11px;
    visibility: hidden;
    z-index: 20;
    background: #fff;
}

ul.searchSelectKey {
    width: 100%;
    height: 100%;
    margin: 0;
    list-style-type: none;
    display: flex;
    float: left;
    flex-flow: column;
    font-size: 16px;
    padding-left: 0px;
    text-align: left;
}

.searchSelectKey li {
    width: 100%;
    height: 30px;
    color: #333333;
    font-size: 12px;
    line-height: 30px;
}

.search .search-text:hover {
    border: 1px solid #333333;
}

.search .search-text:focus {
    outline: none;
    border: 1px solid #FF6700;
}

.search_btn {
    position: absolute;
    right: 0;
    width: 50px;
    height: 50px;
    border: 1px solid #e0e0e0;
    background-image: url(../../assets/img/white-navbar/search_before.png);
    background-color: white;
    background-size: 50%;
    background-position: 10px 10px;
    background-repeat: no-repeat;
    cursor: pointer;
}

.search_btn:hover {
    background-color: #FF6700;
    background-image: url(../../assets/img/white-navbar/search_after.png);
}
</style>
