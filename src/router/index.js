import { createRouter, createWebHashHistory } from 'vue-router'
//引入vueRouter
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
              name: "departmentalScheme",
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

export default router;
