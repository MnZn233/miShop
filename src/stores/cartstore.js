import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getSelectShangPinData } from "../testdata/data";

export const useCartStore = defineStore("cartstore", () => {
    // 购物车内的商品数组
    const shangpinsincart = ref([]);

    // 读取购物车内的商品数组
    const getShangPinsInCart = computed(() => shangpinsincart.value);

    // 往购物车内增加商品，其中 e 是一个封装的商品对象
    function addShangPinInCart(e) {
        let shangpindata = getSelectShangPinData(e);
        console.log(shangpindata);
        shangpinsincart.value.push(shangpindata);
    }

    function addQuantity(shangpinIndex) {
        shangpinsincart.value[shangpinIndex].num++;
    }

    function reduceQuantity(shangpinIndex) {
        if (shangpinsincart.value[shangpinIndex].num > 1) {
            shangpinsincart.value[shangpinIndex].num--;
        }
    }

    function removeItem(shangpinid) {
        for (let i = 0; i < shangpinsincart.value.length; i++) {
            if (shangpinsincart.value[i].shangpinid == shangpinid) {
                shangpinsincart.value.splice(i, 1);
                break;
            }
        }
    }

    // 切换单个商品选中
    function toggleChecked(index) {
        shangpinsincart.value[index].checked = !shangpinsincart.value[index].checked
    }

    // 全选/全不选
    function toggleAllChecked(checked) {
        shangpinsincart.value.forEach(item => item.checked = checked)
    }

    // 是否全选
    const isAllChecked = computed(() =>
        shangpinsincart.value.length > 0 && shangpinsincart.value.every(item => item.checked)
    )

    // 是否全不选
    const isAllUnchecked = computed(() =>
        shangpinsincart.value.length > 0 && shangpinsincart.value.every(item => !item.checked)
    )

    // 已选商品
    const selectedShangPins = computed(() =>
        shangpinsincart.value.filter(item => item.checked)
    )

    // 已选商品总价
    const selectedTotalPrice = computed(() =>
        shangpinsincart.value.reduce((sum, item) => item.checked ? sum + item.money * item.num : sum, 0)
    )

    // 从 sessionStorage 中读入 store
    function loadFromSessionStorage() {
        const savedData = sessionStorage.getItem("myStoreData");
        if (savedData) {
            shangpinsincart.value = JSON.parse(savedData);
        }
    }

    // 将 store 存入 sessionStorage
    function saveToSessionStorage() {
        sessionStorage.setItem("myStoreData", JSON.stringify(shangpinsincart.value));
    }

    return {
        shangpinsincart,
        getShangPinsInCart,
        addShangPinInCart,
        addQuantity,
        reduceQuantity,
        removeItem,
        loadFromSessionStorage,
        saveToSessionStorage,
        toggleChecked,
        toggleAllChecked,
        isAllChecked,
        selectedShangPins,
        selectedTotalPrice,
        isAllUnchecked
    };
});