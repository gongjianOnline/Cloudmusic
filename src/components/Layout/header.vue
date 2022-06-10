<template>
    <!-- 顶部 -->
    <div class="headerContainer">
      <div class="LogoContainer">
        <div class="LogoContent"></div>
        <div class="LogoTitle">网易云音乐</div>
      </div>
      <div class="searchContainer">
        <div class="searchIcon"></div>
        <input type="text" class="searchInput">
      </div>
      <div class="operationContainer">
        <div class="userInfoCenter">
          <div class="userLogo"></div>
          <div class="userName">未登录</div>
          <div class="splitContent"></div>
        </div>
        <div class="operationContent">
          <div class="operationBtn" @click="handelHideWindow">隐</div>
          <div class="operationBtn" @click="handelRestoreWindow" v-show="windowState">还</div>
          <div class="operationBtn" @click="handelMaxWindow" v-show="!windowState">大</div>
          <div class="operationBtn" @click="handelCloseWindow">关</div>
        </div>
        
      </div>
    </div>
  
</template>

<script>
import {ref} from "vue";
const {ipcRenderer} = require("electron");
export default{
  name:"header",
  setup(){
    /**数据集合 */
    const windowState = ref(false)
    // 监听隐藏按钮
    const handelHideWindow = ()=>{
      ipcRenderer.send("hideWindow","")
    }
    // 监听窗口最大化
    const handelMaxWindow = ()=>{
      ipcRenderer.send("maxWindow","")
    }
    // 监听还原窗口
    const handelRestoreWindow = ()=>{
      ipcRenderer.send("restoreWindow","")
    }
    // 监听关闭按钮
    const handelCloseWindow = ()=>{
      ipcRenderer.send("closeWindow","")
    }
    /**监听窗口变化状态 */
    ipcRenderer.on("isMaxWindow",(event,arg)=>{
      windowState.value = arg
    })

    return{
      windowState,
      handelHideWindow,
      handelMaxWindow,
      handelRestoreWindow,
      handelCloseWindow
    }
  }
}


</script>

<style scoped>
.headerContainer{
  width: 100%;
  height: 60px;
  background: #ec4141;
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  -webkit-app-region: drag;
}
/* 左logo */
.LogoContainer{
  display: flex;
  justify-content: center;
  align-items: center;
}
.LogoContent{
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #fff;
}
.LogoTitle{
  font-size: 18px;
  color: #fff;
  margin-left: 10px;
  letter-spacing:2px
}
/* 中间搜索框 */
.searchContainer{
  -webkit-app-region: no-drag;
  position: relative;
}
.searchIcon{
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 50%;
  opacity: 0.2;
}
.searchInput{
  width: 160px;
  height: 34px;
  border: none;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  color:#fff;
  padding-left: 32px;

}
.searchInput:focus{
  outline:none
}
/* 右边操作栏 */
.operationContainer{
  display: flex;
  align-items: center;
  -webkit-app-region: no-drag;
}
.operationContent{
  display: flex;
}
.operationBtn{
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.5);
  margin-left: 6px;
  cursor: pointer;
}
/* 用户信息 */
.userInfoCenter{
  display: flex;
  align-items: center;
  cursor: pointer;
}
.userLogo{
  width: 30px;
  height: 30px;
  background: #fff;
  border-radius: 50%;
  opacity: 0.4;
}
.userName{
  font-size: 14px;
  color: #fff;
  margin-left: 6px;
}
.splitContent{
  width: 1px;
  height: 20px;
  background: #fff;
  opacity: 0.5;
  margin-left: 6px;
}

</style>
