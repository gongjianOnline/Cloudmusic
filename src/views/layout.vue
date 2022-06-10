<template>
  <div class="wrapper">
    <!-- 顶部 -->
    <Header></Header>


  </div>
  
</template>

<script setup>
import Header from "../components/Layout/header.vue"



</script>

<style scoped>
.wrapper{
  width: 100%;
  height: 100%;  
}
.headerContainer{
  width: 100%;
  height: 60px;
  background: #ec4141;
  color: #fff;
  padding: 20px;
  -webkit-app-region: drag;
}
</style>
