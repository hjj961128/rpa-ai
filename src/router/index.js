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
          path: "/schemeLibraryIndex",
          name: "schemeLibraryIndex",
          component: () =>
            import("@/views/ResultsLibrary/SchemeLibrary/index.vue"),
          redirect: "/mainList",
          children: [
            {
              path: "/mainList",
              name: "mainList",
              component: () =>
                import("@/views/ResultsLibrary/SchemeLibrary/MainList.vue"),
            },
            {
              path: "/mainListMore",
              name: "mainListMore",
              component: () =>
                import("@/views/ResultsLibrary/SchemeLibrary/MainListMore.vue"),
            },
            {
              path: "/schemeDetail",
              name: "schemeDetail",
              component: () =>
                import("@/views/ResultsLibrary/SchemeLibrary/SchemeDetail.vue"),
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
            path: "/customization",
            name: "customization",
            component: () =>
              import("@/views/ResultsLibrary/WorkBox/customization.vue"),
        },
        {
            path: "/email-system",
            name: "email",
            component: () =>
              import("@/views/ResultsLibrary/WorkBox/email-system.vue"),
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
          // redirect: '/roleList',
          children: [
            {
              path: "/roleList",
              name: "roleList",
              component: () => import("@/views/SystemManagement/roleList.vue"),
            },
            {
              path: "/userList",
              name: "userList",
              component: () => import("@/views/SystemManagement/userList.vue"),
            },
            {
              path: "/save",
              name: "save",
              component: () => import("@/views/SystemManagement/save.vue"),
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
