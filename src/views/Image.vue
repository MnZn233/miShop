<script setup>
import { onMounted } from 'vue'

// 轮播图初始化
const initCarousels = () => {
    const carousels = document.querySelectorAll('.carousel')
    carousels.forEach(carousel => {
        createCarousel(carousel)
    })
}

// 创建轮播图实例
const createCarousel = (container) => {
    const slides = container.querySelectorAll('.carousel-slide')
    const dots = container.querySelectorAll('.dot')
    const prevBtn = container.querySelector('.prev')
    const nextBtn = container.querySelector('.next')

    if (slides.length <= 1) return

    let currentIndex = 0
    let autoplayTimer = null
    let isAnimating = false

    // 更新幻灯片状态
    const updateSlides = () => {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next')

            if (index === currentIndex) {
                slide.classList.add('active')
            } else if (index < currentIndex) {
                slide.classList.add('prev')
            } else {
                slide.classList.add('next')
            }
        })
    }

    // 更新圆点状态
    const updateDots = () => {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex)
        })
    }

    // 切换到指定索引
    const goTo = (index) => {
        if (isAnimating) return

        isAnimating = true
        currentIndex = (index + slides.length) % slides.length

        updateSlides()
        updateDots()
        resetAutoplay()

        setTimeout(() => {
            isAnimating = false
        }, 400)
    }

    // 下一张
    const next = () => {
        goTo(currentIndex + 1)
    }

    // 上一张
    const prev = () => {
        goTo(currentIndex - 1)
    }

    // 开始自动播放
    const startAutoplay = () => {
        if (slides.length <= 1) return

        autoplayTimer = setInterval(() => {
            next()
        }, 3000)
    }

    // 重置自动播放
    const resetAutoplay = () => {
        if (autoplayTimer) {
            clearInterval(autoplayTimer)
        }
        startAutoplay()
    }

    // 绑定事件
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prev()
        })
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            next()
        })
    }

    // 绑定圆点点击事件
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goTo(index)
        })
    })

    // 设置初始状态
    updateSlides()
    updateDots()

    // 开始自动播放
    startAutoplay()
}

// 初始化回到顶部功能
const initScrollToTop = () => {
    const scrollButton = document.querySelector('.scroll-btn')
    if (scrollButton) {
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        })
    }
}

// 监听滚动事件，控制回到顶部按钮的显示/隐藏
const initScrollListener = () => {
    const scrollToTop = document.querySelector('.scroll-top')
    if (scrollToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTop.classList.add('show')
            } else {
                scrollToTop.classList.remove('show')
            }
        })
    }
}

// 监听滚动事件，控制导航栏背景变化
const initHeaderScroll = () => {
    const header = document.querySelector('.header')
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                header.classList.add('scrolled')
            } else {
                header.classList.remove('scrolled')
            }
        })
    }
}

// 组件挂载后的逻辑
onMounted(() => {
    initCarousels()
    initScrollToTop()
    initScrollListener()
    initHeaderScroll()
})
</script>

<template>
    <!-- 此页面图片资源通过链接引入，未本地保存 -->
    <div class="page">
        <div class="layout">
            <!-- Header -->
            <header class="header">
                <div class="container">
                    <div class="logo">
                        <!-- 这里源网站是小米官网，这里改成回到小米商城 -->
                        <a href="/" class="mi-logo">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 808 808">
                                <g>
                                    <path fill="#ff6900"
                                        d="M723.79,84.42C647.55,8.48,537.94,0,404,0,269.89,0,160.12,8.58,83.92,84.72S0,270.43,0,404.39,7.74,648,84,724.14,269.9,808,404,808s243.85-7.71,320-83.86,84-185.78,84-319.75C808,270.25,800.16,160.54,723.79,84.42Z">
                                    </path>
                                    <path fill="#fff"
                                        d="M374.26,553.72a5,5,0,0,1-5.06,5H300.3a5.05,5.05,0,0,1-5.12-5V373.53a5.05,5.05,0,0,1,5.12-5h68.9a5,5,0,0,1,5.06,5Z">
                                    </path>
                                    <path fill="#fff"
                                        d="M509.18,553.72a5.05,5.05,0,0,1-5.09,5H438.5a5,5,0,0,1-5.1-5V398.26c-.07-27.15-1.62-55-15.64-69.06-12-12.09-34.51-14.86-57.88-15.44H241a5,5,0,0,0-5.07,5v235a5.07,5.07,0,0,1-5.12,5H165.16a5,5,0,0,1-5.06-5V254.31a5,5,0,0,1,5.06-5H354.52c49.49,0,101.22,2.26,126.74,27.81s27.92,77.3,27.92,126.85Z">
                                    </path>
                                    <path fill="#fff"
                                        d="M644.29,553.72a5.06,5.06,0,0,1-5.09,5H573.57a5,5,0,0,1-5.08-5V254.31a5,5,0,0,1,5.08-5H639.2a5.06,5.06,0,0,1,5.09,5Z">
                                    </path>
                                </g>
                            </svg>
                        </a>
                        <span>小米影像</span>
                    </div>

                    <nav class="nav">
                        <div class="nav-item">
                            <a href="#">首页</a>
                        </div>
                        <div class="nav-item">
                            <a href="#">影像大赛</a>
                        </div>
                        <div class="nav-item">
                            <a href="#">影像故事</a>
                        </div>
                    </nav>

                    <!-- 这里登陆注册就不做了，跟小米商城同理 -->
                    <div class="user-menu">
                        <a>登录</a>
                        <span class="divider">|</span>
                        <a>注册</a>
                    </div>
                </div>
            </header>

            <!-- Content -->
            <main class="main">
                <!-- 首页轮播图 -->
                <section class="hero">
                    <div class="carousel">
                        <div class="carousel-container">
                            <div class="carousel-slide active">
                                <img src="https://img.youpin.mi-img.com/ferriswheel/bad4946f_ac7a_40ae_90dc_c47d76044245.jpeg@base@tag=imgScale&F=webp&h=1080&q=90&w=1920"
                                    alt="Hero Image">
                                <div class="play-btn"></div>
                            </div>
                            <div class="carousel-slide">
                                <img src="https://img.youpin.mi-img.com/ferriswheel/711c4e01_68e4_4e8a_b875_555af7281362.jpeg@base@tag=imgScale&F=webp&h=1080&q=90&w=1920"
                                    alt="Gallery Image">
                                <div class="play-btn"></div>
                            </div>
                            <div class="carousel-slide">
                                <img src="https://img.youpin.mi-img.com/ferriswheel/0e0f444e_8fe3_43b7_8e78_ac4b5fe17222.png@base@tag=imgScale&F=webp&h=1080&q=90&w=1920"
                                    alt="Story Image">
                                <div class="play-btn"></div>
                            </div>
                        </div>
                        <button class="carousel-btn prev"></button>
                        <button class="carousel-btn next"></button>
                        <div class="carousel-dots">
                            <span class="dot active"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                        </div>
                    </div>
                </section>

                <section class="award">
                    <div class="award-content">
                        <div class="award-text">
                            <h2 class="award-title">2025小米徕卡影像大赛</h2>
                            <p class="award-desc">
                                影像是关于光的艺术<br>
                                让我们使用光，并通过光<br>
                                一起见证影像新时代
                            </p>
                        </div>
                        <div class="award-btn">
                            <img src="https://img.youpin.mi-img.com/ferriswheel/2e9e4ff2_4c91_4758_b346_83047dae23b0.png?w=224&h=44"
                                class="btn-normal">
                            <img src="https://img.youpin.mi-img.com/ferriswheel/5042ddee_2f5b_498e_95a2_4156f5b9e70d.png?w=224&h=44"
                                class="btn-hover">
                        </div>
                    </div>
                </section>

                <!-- 轮播图 -->
                <section class="gallery">
                    <div class="carousel">
                        <div class="carousel-container">
                            <div class="carousel-slide active">
                                <img src="https://img.youpin.mi-img.com/ferriswheel/6bd4f418_a2c7_480f_8178_1287faf01373.jpeg@base@tag=imgScale&F=webp&h=950&q=90&w=1920"
                                    alt="Gallery Image">
                            </div>
                            <div class="carousel-slide">
                                <img src="https://img.youpin.mi-img.com/ferriswheel/709bac55_f3d8_4f67_97ec_54a1436e9f61.jpeg@base@tag=imgScale&F=webp&h=950&q=90&w=1920"
                                    alt="Nature Image">
                            </div>
                            <div class="carousel-slide">
                                <img src="https://img.youpin.mi-img.com/ferriswheel/05a4e25f_8afa_45a7_a0b1_ae213a4ef45e.jpeg@base@tag=imgScale&F=webp&h=950&q=90&w=1920"
                                    alt="Architecture Image">
                            </div>
                        </div>
                        <button class="carousel-btn prev"></button>
                        <button class="carousel-btn next"></button>
                        <div class="carousel-dots">
                            <span class="dot active"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                        </div>
                    </div>
                </section>

                <section class="video">
                    <div class="carousel">
                        <div class="carousel-container">
                            <div class="carousel-slide active">
                                <img src="https://img.youpin.mi-img.com/ferriswheel/337fc87a_6bc3_4453_b48e_74404f54a5fc.jpeg@base@tag=imgScale&F=webp&h=1080&q=90&w=1920"
                                    alt="Video Image">
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <!-- Footer -->
            <footer class="footer">
                <div class="container">
                    <div class="footer-logo">
                        <a href="/" class="mi-logo">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 808 808">
                                <g>
                                    <path fill="#ff6900"
                                        d="M723.79,84.42C647.55,8.48,537.94,0,404,0,269.89,0,160.12,8.58,83.92,84.72S0,270.43,0,404.39,7.74,648,84,724.14,269.9,808,404,808s243.85-7.71,320-83.86,84-185.78,84-319.75C808,270.25,800.16,160.54,723.79,84.42Z">
                                    </path>
                                    <path fill="#fff"
                                        d="M374.26,553.72a5,5,0,0,1-5.06,5H300.3a5.05,5.05,0,0,1-5.12-5V373.53a5.05,5.05,0,0,1,5.12-5h68.9a5,5,0,0,1,5.06,5Z">
                                    </path>
                                    <path fill="#fff"
                                        d="M509.18,553.72a5.05,5.05,0,0,1-5.09,5H438.5a5,5,0,0,1-5.1-5V398.26c-.07-27.15-1.62-55-15.64-69.06-12-12.09-34.51-14.86-57.88-15.44H241a5,5,0,0,0-5.07,5v235a5.07,5.07,0,0,1-5.12,5H165.16a5,5,0,0,1-5.06-5V254.31a5,5,0,0,1,5.06-5H354.52c49.49,0,101.22,2.26,126.74,27.81s27.92,77.3,27.92,126.85Z">
                                    </path>
                                    <path fill="#fff"
                                        d="M644.29,553.72a5.06,5.06,0,0,1-5.09,5H573.57a5,5,0,0,1-5.08-5V254.31a5,5,0,0,1,5.08-5H639.2a5.06,5.06,0,0,1,5.09,5Z">
                                    </path>
                                </g>
                            </svg>
                        </a>
                    </div>
                    <div class="footer-info">
                        <p>
                            本网站图片及视频禁止在未经小米书面授权的情况下以任何形式发表和使用
                        </p>
                        <p>
                            <a href="#" target="_blank">小米隐私政策</a>
                            <a href="#" target="_blank">小米账号使用协议</a>
                            <a href="#" target="_blank">小米账号隐私政策</a>
                        </p>
                        <p>
                            © mi.com 京ICP证110507号 京ICP备10046444号 京公网安备11010802020134号 京网文[2020]0276-042号
                        </p>
                    </div>
                </div>
            </footer>

            <!-- Scroll to Top Button -->
            <div class="scroll-top">
                <div class="scroll-btn"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 全局样式重置 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    overflow-x: hidden;
}

/* 布局容器 */
.page {
    width: 100%;
}

.layout {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
}

.container {
    max-width: 1226px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header 样式 */
.header {
    background: transparent;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: 60px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
}

.header.scrolled {
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 1226px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Logo 样式 */
.logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 16px;
    font-weight: 400;
    flex-shrink: 0;
    min-width: 120px;
}

.mi-logo {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mi-logo svg {
    width: 100%;
    height: 100%;
}

/* 导航菜单样式 */
.nav {
    display: flex;
    gap: 36px;
    align-items: center;
    justify-content: center;
    flex: 1;
    max-width: 400px;
}

.nav-item {
    position: relative;
    text-align: center;
}

.nav-item a {
    color: #fff;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    padding: 12px 10px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    white-space: nowrap;
    justify-content: center;
}

.nav-item a:hover {
    color: #ff6900;
}

/* 用户菜单样式 */
.user-menu {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    min-width: 120px;
    justify-content: flex-end;
    gap: 20px;
    margin-right: -30px;
}

.user-menu a {
    color: #fff;
    text-decoration: none;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.3s ease;
    white-space: nowrap;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    padding: 8px 10px;
}

.user-menu a:hover {
    color: #ff6900;
}

.user-menu .divider {
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

/* 主内容区域 */
.main {
    margin-top: 0;
    width: 100%;
}

/* 轮播图样式 */
.carousel {
    width: 100%;
    height: 100vh;
    min-height: 600px;
    position: relative;
    overflow: hidden;
}

.carousel-container {
    width: 100%;
    height: 100%;
    position: relative;
}

.carousel-slide {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: all 0.4s ease-out;
    pointer-events: none;
    z-index: 1;
    transform: translateX(100%);
    will-change: transform;
}

.carousel-slide.active {
    opacity: 1;
    transform: translateX(0%);
    pointer-events: auto;
    z-index: 2;
}

.carousel-slide.prev {
    transform: translateX(-100%);
    z-index: 1;
}

.carousel-slide.next {
    transform: translateX(100%);
    z-index: 1;
}

.carousel-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 0;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
}

/* 播放按钮 */
.play-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.5);
    cursor: pointer;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.play-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%) scale(1.1);
}

.play-btn::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 20px solid #fff;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    margin-left: 5px;
}

/* 轮播图控制按钮 */
.carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.carousel-btn:hover::before {
    border-top-color: #ff6900;
    border-right-color: #ff6900;
}

.prev {
    left: 20px;
}

.next {
    right: 20px;
}

.prev::before,
.next::before {
    content: '';
    display: block;
    width: 18px;
    height: 18px;
    border-top: 3px solid #fff;
    border-right: 3px solid #fff;
    transition: border-color 0.3s ease;
}

.prev::before {
    transform: rotate(-135deg);
    margin-left: 5px;
}

.next::before {
    transform: rotate(45deg);
    margin-right: 5px;
}

/* 轮播图分页器 */
.carousel-dots {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    z-index: 3;
}

.dot {
    width: 100px;
    height: 3px;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: background 0.3s ease;
}

.dot.active {
    background: #ff6900;
}

.dot:hover {
    background: rgba(255, 255, 255, 0.5);
}

/* 奖项区块样式 */
.award {
    padding: 45px 0;
    text-align: center;
    background: #f5f5f5;
}

.award-content {
    max-width: 800px;
    margin: 0 auto;
}

.award-text {
    margin-bottom: 50px;
}

.award-title {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
}

.award-desc {
    font-size: 18px;
    line-height: 1.6;
    color: #666;
}

.award-btn {
    position: relative;
    cursor: pointer;
    transition: transform 0.3s ease;
    display: inline-block;
}

.award-btn img {
    height: 44px;
    display: block;
}

.btn-hover {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 0;
}

.award-btn:hover .btn-hover {
    opacity: 1;
}

/* Footer 样式 */
.footer {
    background: #fff;
    border-top: 1px solid #e5e5e5;
    color: #333;
    padding: 40px 0 0 0;
}

.footer .container {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 40px;
    max-width: 1226px;
    margin: 0 auto;
    padding: 0 20px;
}

.footer-logo {
    display: flex;
    align-items: center;
    margin-right: 20px;
}

.footer-logo .mi-logo {
    width: 48px;
    height: 48px;
    display: block;
}

.footer-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.footer-info p {
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.6;
    color: #999;
}

.footer-info a {
    color: #999;
    text-decoration: none;
    margin-right: 20px;
    transition: color 0.3s;
    font-size: 14px;
}

.footer-info a:hover {
    color: #ff6900;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .container {
        padding: 0 15px;
    }

    .header .container {
        flex-direction: column;
        height: auto;
        padding: 10px 0;
        gap: 10px;
    }

    .logo {
        min-width: auto;
    }

    .nav {
        gap: 20px;
        margin: 10px 0;
        max-width: none;
        flex: none;
    }

    .user-menu {
        min-width: auto;
        justify-content: center;
    }

    .award-title {
        font-size: 28px;
    }

    .footer .container {
        flex-direction: column;
        gap: 20px;
        padding: 0 10px;
        align-items: flex-start;
    }
}

@media (max-width: 480px) {
    .nav {
        gap: 15px;
    }

    .nav-item a {
        font-size: 14px;
        padding: 8px 0;
    }
}

/* 回到顶部按钮 */
.scroll-top {
    position: fixed;
    right: 125px;
    bottom: 140px;
    z-index: 9999;
    width: 88px;
    height: 88px;
    background: none;
    border: none;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.3s;
}

.scroll-top.show {
    display: flex;
    opacity: 1;
}

.scroll-btn {
    width: 60px;
    height: 60px;
    margin: auto;
    background: url('https://cdn.cnbj1.fds.api.mi-img.com/staticsfile/visual/top-icon.png') no-repeat center center;
    background-size: contain;
    border: none;
    display: block;
    padding: 0;
}
</style>