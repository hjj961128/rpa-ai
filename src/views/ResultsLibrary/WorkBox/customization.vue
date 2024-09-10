<template>
  <div class="main_page">
    <iframe
      id="my-iframe"
      width="100%"
      height="100%"
      frameborder="0"
      allowfullscreen
      src="http://172.28.144.167:8083/#/knowledgeBase/knowledgeBase?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIzMzI1OTUyMzIxLCJzdWIiOiIwMUg1OTVNMkM5MkJBSjM2NFNQRlpKVjFYWiJ9.8VbQliLAbpjXCrlIakW7JuLWYakAh7c2NFKiL4TFHaU"
    ></iframe>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.main_page {
  position: relative;
  width: 100%;
  height: 100%;
  .overlay {
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
    /* 确保div在iframe上方 */
  }
}
#my-iframe {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: 9;
}
.btn{
  width: 100%;
}
</style>