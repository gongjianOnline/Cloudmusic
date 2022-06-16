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
      <div class="maskContainer" @click="handelMask" v-show="CurrentState">
      </div>
      <div class="CurrentListContainer" v-show="CurrentState">
          <CurrentList></CurrentList>
      </div>
      
    </div>
    <!-- 底部 -->
    <Footer></Footer>
  </div>
  
</template>

<script>
import Header from "../components/Layout/header.vue"
import Footer from "../components/Layout/footer.vue"
import MainMenu from "../components/mainContainer/mainMenu.vue"
import CurrentList from "../components/currency/currentList.vue"
import {useStore} from "vuex"
import {watch,ref} from "vue"
export default{
  name:"layout",
  components:{
    Header,
    Footer,
    MainMenu,
    CurrentList
  },
  setup(){
    /**获取Vuex及全局上下文 */
    const store = useStore();
    /**变量声明区 */
    const CurrentState = ref(false)

    /*事件绑定 */
    // 控制遮罩层
    const handelMask = ()=>{
      store.dispatch("setCurrentState",(!store.getters.getCurrentState))
    }

    /**监听属性*/
    watch(()=>store.getters.getCurrentState,(newValue)=>{
      CurrentState.value = newValue
    })


    return {
      CurrentState,
      handelMask
    }
  }
}


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
  position: relative;
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
/* 当前播放列表 */
.maskContainer{
  position: absolute;
  top: 0px;
  bottom:0px;
  right: 0px;
  left: 0px;
  opacity: 0;
  z-index: 3;
}
.CurrentListContainer{
  position: absolute;
  top: 0px;
  bottom:0px;
  right: 0px;
  background: #fff;
  width: 420px;
  z-index: 4;
}
</style>
