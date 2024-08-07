import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // 如果路由为/
      redirect: '/login', //重定向到登录组件
      meta: {
        title: '登陆页'
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: '/404',
      component: () => import('@/views/404.vue'),
      hidden: true
    },
    {
      path: "/home",
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
          path: "/processlist",
          name: "processlist",
          component: () => import("@/views/ProcessCanvas/processlist.vue"),
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
