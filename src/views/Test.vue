<template>
  <div>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger" @click="dianji">Danger</el-button>
  </div>
</template>
<script setup>
import request from "@/utils/request";

function dianji() {
  const routes = [
    { path: "/", name: "homeLink", component: Home },
    { path: "/menu", name: "menuLink", component: Menu },
    { path: "/admin", name: "adminLink", component: Admin },
    {
      path: "/about",
      name: "aboutLink",
      component: About,
      redirect: "/about/contact",
      children: [
        {
          path: "/about/contact",
          name: "contactLink",
          redirect: "/about/contact/personname",
          component: Contact,
          children: [
            {
              path: "/about/contact/phone",
              name: "phoneNumber",
              component: Phone,
            },
            {
              path: "/about/contact/personname",
              name: "personName",
              component: PersonName,
            },
          ],
        },
        { path: "/about/delivery", name: "deliveryLink", component: Delivery },
        { path: "/about/history", name: "historyLink", component: History },
        {
          path: "/about/orderingGuide",
          name: "orderingGuideLink",
          component: OrderingGuide,
        },
      ],
    },
    { path: "/login", name: "loginLink", component: Login },
    { path: "/register", name: "registerLink", component: Register },
    { path: "*", redirect: "/" },
  ];
  request({
    method: "post",
    url: "...",
    headers: { 
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      name: "sss",
    },
  }).then((res) => {
    console.log(res);
  });
}
</script>