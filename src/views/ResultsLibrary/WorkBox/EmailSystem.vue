<template>
  <div>
    <iframe
        style="width: 100%;height: 99vh"
      id="my-iframe"
      frameborder="0"
      allowfullscreen
      :src='emailSrc'
    ></iframe>
  </div>
</template>

<script setup>


const emailSrc = `${window.location.protocol}//${window.location.hostname}:8086/#/home/homepage?token=${sessionStorage.Authorization}`





</script>

<style lang="scss" scoped>

</style>
