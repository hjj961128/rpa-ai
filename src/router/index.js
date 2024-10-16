import {createRouter, createWebHashHistory} from 'vue-router'
//引入vueRouter
import {useUserStore} from '@/stores/modules/user'
import {useTokenStore} from '@/stores/modules/auth'

import * as vueRouter from 'vue-router';

const router = vueRouter.createRouter({
    // history: createWebHashHistory(import.meta.env.BASE_URL),
    history: vueRouter.createWebHashHistory(),
    routes: [
        {
            path: '/', // 如果路由为/
            redirect: '/home', //重定向到登录组件
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/login/index.vue"),
        },
        // {
        //   path: '/404',
        //   component: () => import('@/views/404.vue'),
        //   hidden: true
        // },
        {
            path: "/home",//执行方式
            name: "home",
            component: () => import("@/views/index.vue"),
            children: [
                {
                    path: "/home",
                    name: "home",
                    component: () => import("@/views/Home.vue"),
                },
                {
                    path: "/achievementLibrary",
                    name: "achievementLibrary",
                    component: () =>
                        import("@/views/ResultsLibrary/AchievementLibrary/index.vue"),
                    redirect: "/schemeLibrary",
                    children: [
                        {
                            path: "/schemeLibrary",
                            name: "schemeLibrary",
                            component: () =>
                                import("@/views/ResultsLibrary/AchievementLibrary/schemeLibrary.vue"),
                        },
                        {
                            path: "/departmentScheme",
                            name: "departmentScheme",
                            component: () =>
                                import("@/views/ResultsLibrary/AchievementLibrary/departmentScheme.vue"),
                        },
                        {
                            path: "/schemeDetail",
                            name: "schemeDetail",
                            component: () =>
                                import("@/views/ResultsLibrary/AchievementLibrary/SchemeDetail.vue"),
                        },
                    ],
                },
                {
                    path: "/workBoxIndex",
                    name: "workBoxIndex",
                    component: () =>
                        import("@/views/ResultsLibrary/WorkBox/index.vue"),
                    redirect: "/workBoxList",
                    children: [
                        {
                            path: "/workBoxList",
                            name: "workBoxList",
                            component: () =>
                                import("@/views/ResultsLibrary/WorkBox/workBoxList.vue"),
                        },

                        {
                            path: "/boxDetail",
                            name: "boxDetail",
                            component: () =>
                                import("@/views/ResultsLibrary/WorkBox/boxDetail.vue"),
                        },
                    ]
                },
                {
                    path: "/biddingSystem",
                    name: "BiddingSystem",
                    component: () =>
                        import("@/views/ResultsLibrary/WorkBox/BiddingSystem.vue"),
                },
                {
                    path: "/emailSystem",
                    name: "email",
                    component: () =>
                        import("@/views/ResultsLibrary/WorkBox/EmailSystem.vue"),
                },
                {
                    path: "/processlist",
                    name: "processlist",
                    component: () => import("@/views/ProcessCanvas/processlist.vue"),
                },
                {
                    path: "/processCanvas",
                    name: "processCanvas",
                    component: () => import("@/views/ProcessCanvas/processCanvas.vue"),
                },
                {
                    path: "/center",
                    name: "center",
                    component: () => import("@/views/center/index.vue"),
                },
                {
                    path: "/systemManagement",
                    name: "systemManagement",
                    component: () => import("@/views/SystemManagement/index.vue"),
                    redirect: '/userList',
                    children: [
                        {
                            path: "/userList",
                            name: "userList",
                            component: () => import("@/views/SystemManagement/userList.vue"),
                        },
                        {
                            path: "/roleList",
                            name: "roleList",
                            component: () => import("@/views/SystemManagement/roleList.vue"),
                        },
                        {
                            path: "/security",
                            name: "security",
                            component: () => import("@/views/SystemManagement/security.vue"),
                        },
                    ],
                },
            ],
        },
        {
            path: "/test",
            name: "test",
            component: () => import("@/views/Test.vue"),
        },
    ],
});

const whiteList = ['/login']
// 导航守卫
router.beforeEach(async (to, from, next) => {
    window.document.title = to.meta.title == undefined ? 'RPA+AI工具箱' : to.meta.title


    //token
    const tokenStore = useTokenStore()

    //是否有token
    const has_token = tokenStore.token

    //用户信息状态
    const userStore = useUserStore()

    if (has_token) {

        if (to.path === '/login') {
            next({path: '/'})
        } else {
            const hasGetUserInfo = userStore.userInfo
            // 判断是否有用户信息
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    // get user info
                    await userStore.setUserInfo()
                    next()
                } catch (error) {
                    // remove token and go to login page to re-login
                    localStorage.clear()
                    next('/login')
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            console.log('login')
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)

        }
    }


})


export default router;
