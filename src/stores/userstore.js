import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("userstore", () => {
    // 用户信息
    const user = ref(null);
    const isLoggedIn = ref(false);

    // 计算属性：是否已登录
    const getIsLoggedIn = computed(() => isLoggedIn.value);

    // 计算属性：获取用户信息
    const getUser = computed(() => user.value);

    // 计算属性：获取用户名
    const getUsername = computed(() => user.value?.username || '');

    // 登录功能
    function login(loginData) {
        // 模拟登录验证
        if (loginData.username && loginData.password) {
            // 从localStorage获取已注册的用户
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const foundUser = existingUsers.find(u =>
                u.username === loginData.username && u.password === loginData.password
            );

            if (foundUser) {
                user.value = {
                    id: foundUser.id,
                    username: foundUser.username,
                    email: foundUser.email || '',
                    avatar: foundUser.avatar || ''
                };
                isLoggedIn.value = true;

                // 保存到localStorage
                localStorage.setItem('user', JSON.stringify(user.value));
                localStorage.setItem('isLoggedIn', 'true');

                return { success: true, message: '登录成功' };
            } else {
                return { success: false, message: '用户名或密码错误' };
            }
        } else {
            return { success: false, message: '用户名和密码不能为空' };
        }
    }

    // 注册功能
    function register(registerData) {
        // 模拟注册验证
        if (registerData.username && registerData.password && registerData.confirmPassword) {
            if (registerData.password !== registerData.confirmPassword) {
                return { success: false, message: '两次输入的密码不一致' };
            }

            // 检查用户名是否已存在（这里简化处理）
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const userExists = existingUsers.find(u => u.username === registerData.username);

            if (userExists) {
                return { success: false, message: '用户名已存在' };
            }

            // 创建新用户
            const newUser = {
                id: Date.now(),
                username: registerData.username,
                password: registerData.password, // 实际项目中应该加密
                avatar: registerData.avatar || ''
            };

            // 保存用户到localStorage
            existingUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(existingUsers));

            return { success: true, message: '注册成功，请登录' };
        } else {
            return { success: false, message: '请填写完整的注册信息' };
        }
    }

    // 登出功能
    function logout() {
        user.value = null;
        isLoggedIn.value = false;

        // 清除localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
    }

    // 从localStorage加载用户状态
    function loadUserFromStorage() {
        const savedUser = localStorage.getItem('user');
        const savedIsLoggedIn = localStorage.getItem('isLoggedIn');

        if (savedUser && savedIsLoggedIn === 'true') {
            user.value = JSON.parse(savedUser);
            isLoggedIn.value = true;
        }
    }

    return {
        user,
        isLoggedIn,
        getIsLoggedIn,
        getUser,
        getUsername,
        login,
        register,
        logout,
        loadUserFromStorage
    };
}); 