<template>
  <div>
    <div>fabu</div>
    <iframe
      id="my-iframe"
      :src="iframe"
      width="100%"
      height="100%"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>
<script setup>
import { onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const iframe = ref(null);
const iframeSrc = "http://106.14.149.100:8178/webCreator/creator/49527cfe80634b58b246ebc488d32498"; // 你的iframe内容的URL
onMounted(() => {
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjUtNTc2LTFkNTY5MjEwLTg5ZWMtNDdhMi1iYWQ2LWE1NzY5N2Q0MDdjMSJ9.K19O_EtzPp8ltFhE9uth2EeFGSnp_SpN6dZJxun-GyBK2lL4KMdd0T1AZJ4PqaPGOGxjh1YQBlObinw_QgyAhw";
  iframe.value = `${iframeSrc}?token=${token}`;
  console.log(iframe.value);
});
</script>
<style>
#my-iframe {
  position: fixed;
  top: 1;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>