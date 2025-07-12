import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("../views/HomePage.vue")   /* 主页 */
    },
    {
      path: "/details",
      name: "Details",
      component: () => import("../views/Details.vue")   /* 商品详情页 */
    },
    {
      path: '/mycart',
      name: 'Mycart',
      component: () => import('../views/Mycart.vue')   /* 购物车页面 */
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')  /* 登录页面 */
    }
  ]
})

export default router
