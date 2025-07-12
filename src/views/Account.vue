<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userstore';

const router = useRouter();
const userStore = useUserStore();

const activeTab = ref('login');
const loginSuccess = ref(false);
const registerSuccess = ref(false);
const loginMessage = ref('');
const registerMessage = ref('');

const loginForm = reactive({
    username: '',
    password: ''
});

const registerForm = reactive({
    username: '',
    password: '',
    confirmPassword: ''
});

const handleLogin = () => {
    const result = userStore.login(loginForm);
    loginSuccess.value = result.success;
    loginMessage.value = result.message;

    if (result.success) {
        setTimeout(() => {
            router.push('/home');
        }, 1000);
    }
};

const handleRegister = () => {
    const result = userStore.register(registerForm);
    registerSuccess.value = result.success;
    registerMessage.value = result.message;

    if (result.success) {
        // 注册成功后切换到登录页面
        setTimeout(() => {
            activeTab.value = 'login';
            registerForm.username = '';
            registerForm.password = '';
            registerForm.confirmPassword = '';
            registerMessage.value = '';
        }, 1500);
    }
};
</script>

<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-header">
                <img src="../assets/img/white-navbar/logo-mi2.png" alt="小米logo" class="logo">
                <h2>小米账号登录</h2>
            </div>

            <div class="login-tabs">
                <div class="tab-item" :class="{ active: activeTab === 'login' }" @click="activeTab = 'login'">
                    登录
                </div>
                <div class="tab-item" :class="{ active: activeTab === 'register' }" @click="activeTab = 'register'">
                    注册
                </div>
            </div>

            <!-- 登录表单 -->
            <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="login-form">
                <div class="form-group">
                    <input type="text" v-model="loginForm.username" placeholder="用户名" required>
                </div>
                <div class="form-group">
                    <input type="password" v-model="loginForm.password" placeholder="密码" required>
                </div>
                <div class="form-group">
                    <button type="submit" class="submit-btn">登录</button>
                </div>
                <div v-if="loginMessage" class="message" :class="{ error: !loginSuccess }">
                    {{ loginMessage }}
                </div>
            </form>

            <!-- 注册表单 -->
            <form v-if="activeTab === 'register'" @submit.prevent="handleRegister" class="register-form">
                <div class="form-group">
                    <input type="text" v-model="registerForm.username" placeholder="用户名" required>
                </div>
                <div class="form-group">
                    <input type="password" v-model="registerForm.password" placeholder="密码" required>
                </div>
                <div class="form-group">
                    <input type="password" v-model="registerForm.confirmPassword" placeholder="确认密码" required>
                </div>
                <div class="form-group">
                    <button type="submit" class="submit-btn">注册</button>
                </div>
                <div v-if="registerMessage" class="message" :class="{ error: !registerSuccess }">
                    {{ registerMessage }}
                </div>
            </form>

            <div class="login-footer">
                <p>登录即表示同意小米账号<a href="#">用户协议</a>和<a href="#">隐私政策</a></p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login-container {
    min-height: 100vh;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.login-box {
    background: white;
    border-radius: 10px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 100%;
    max-width: 400px;
}

.login-header {
    text-align: center;
    margin-bottom: 30px;
}

.logo {
    width: 50px;
    height: 50px;
    margin-bottom: 15px;
}

.login-header h2 {
    color: #333;
    font-size: 24px;
    margin: 0;
}

.login-tabs {
    display: flex;
    margin-bottom: 30px;
    border-bottom: 2px solid #f0f0f0;
}

.tab-item {
    flex: 1;
    text-align: center;
    padding: 15px;
    cursor: pointer;
    color: #666;
    font-weight: 500;
    transition: all 0.3s ease;
}

.tab-item.active {
    color: #ff6700;
    border-bottom: 2px solid #ff6700;
}

.form-group {
    margin-bottom: 20px;
}

.form-group input {
    width: 100%;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
}

.form-group input:focus {
    outline: none;
    border-color: #ff6700;
}

.submit-btn {
    width: 100%;
    padding: 15px;
    background: #ff6700;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.submit-btn:hover {
    background: #e55a00;
}

.message {
    padding: 10px;
    border-radius: 5px;
    margin-top: 15px;
    text-align: center;
    font-size: 14px;
}

.message.error {
    background: #ffebee;
    color: #c62828;
    border: 1px solid #ffcdd2;
}

.message:not(.error) {
    background: #e8f5e8;
    color: #2e7d32;
    border: 1px solid #c8e6c9;
}

.login-footer {
    margin-top: 30px;
    text-align: center;
    font-size: 12px;
    color: #666;
}

.login-footer a {
    color: #ff6700;
    text-decoration: none;
}

.login-footer a:hover {
    text-decoration: underline;
}
</style>