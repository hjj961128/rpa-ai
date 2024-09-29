<template>
  <div>
    <iframe
        style="width: 100%;height: 90vh"
      id="my-iframe"
      frameborder="0"
      allowfullscreen
      :src="biddingSystemSrc"
    ></iframe>
  </div>
</template>

<script setup>

const biddingSystemSrc = `${window.location.protocol}//${window.location.hostname}:8083/#/knowledgeBase/knowledgeBase?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIzMzI1OTUyMzIxLCJzdWIiOiIwMUg1OTVNMkM5MkJBSjM2NFNQRlpKVjFYWiJ9.8VbQliLAbpjXCrlIakW7JuLWYakAh7c2NFKiL4TFHaU`

</script>

<style lang="scss" scoped>

</style>
