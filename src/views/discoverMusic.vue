<template>
  <div class="wrapper">
    <!-- 菜单栏 -->
    <div class="tabsContainer">
      <ul class="tabsListContent">
        <li v-for="(item,index) in tabsList" 
          :key="index"
          @click="handelTabsClick(item,index)">
          <div :class="{'tabsSelected':tabsIndex===index}">{{item.name}}</div>
          <div :class="{'underline':tabsIndex===index}"></div>
        </li>
      </ul>
    </div>

    <!--tabs三级路由-->
    <div>
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
import {reactive,ref} from "vue";
import {useRouter} from "vue-router"
export default{
  name:"discoverMusic",
  setup(){
    const router = useRouter()
    // 标签页列表
    const tabsIndex = ref(0);
    const tabsList = reactive([
      {
        name:"个性推荐",
        routerNumber:'recommend'
      },
      {
        name:"歌单",
        routerNumber:'songSheet'
      },
      {
        name:"排行榜",
        routerNumber:'rankingList'
      }
    ])
    //tabs点击事件
    const handelTabsClick = (row,index)=>{
      tabsIndex.value = index;
      router.replace({name:row.routerNumber})
    }
    return {
      tabsList,
      tabsIndex,
      handelTabsClick
    }

  }
}
</script>

<style scoped>
.wrapper{
  padding: 24px;
}
.tabsContainer{

}
.tabsListContent{
  list-style: none;
  display: flex;
}
.tabsListContent li{
  margin-right: 22px;
  font-size: 18px;
  color: #373737;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.tabsSelected{
  font-size: 20px;
  font-weight: 600;
  color:#373737;
}
.underline{
  width: 80%;
  height: 2px;
  background: #ec4141;
  margin-top: 4px;
}
</style>