<!-- 
  - @description 窗口布局
  - @author 龚箭
  - @since 2022/06/11
-->
<template>
  <div class="wrapper">
    <!-- 顶部 -->
    <Header></Header>
    <!-- 内容区 -->
    <div class="mainContainer">
      <div class="mainMenu">
        <MainMenu></MainMenu>
      </div>
      <div class="mainView">
        <router-view></router-view>
      </div>
    </div>
    <!-- 底部 -->
    <Footer></Footer>
  </div>
  
</template>

<script setup>
import Header from "../components/Layout/header.vue"
import Footer from "../components/Layout/footer.vue"
import MainMenu from "../components/mainContainer/mainMenu.vue"



</script>

<style scoped>
.wrapper{
  width: 100%;
  height: 100%;  
}
/* 主要视口 */
.mainContainer{
  display: flex;
  width: 100%;
  height: calc(100% - 75px - 60px);
}
.mainMenu{
  width: 20%;
  height: 100%;
  border-right: 1px solid #e1e1e1;
}
.mainView{
  width: 80%;
  height: 100%;
  overflow: auto;
}
</style>
