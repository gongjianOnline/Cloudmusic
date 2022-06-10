<template>
  <ul class="menuList">
    <li class="menuItem " 
      v-for="(item,index) in menuList" 
      :key="item.id"
      :class="{'menuItemSelected':index==menuIndex}"
      @click="handelMenuClick(item,index)">{{item.menuName}}</li>
  </ul>
</template>

<script>
import {reactive,ref} from "vue"
export default{
  name:"mainMenu",
  setup(){
    // 菜单列表
    const menuList = reactive([
      {
        id:0,
        menuName:"发现音乐",
        routerName:"discoverMusic",
      },
      {
        id:0,
        menuName:"每日歌单",
        routerName:"dailySongList",
      },
      {
        id:0,
        menuName:"推荐歌曲",
        routerName:"recommendMusicList",
      },
      {
        id:0,
        menuName:"私人FM",
        routerName:"privateFM",
      },
    ]);
    // 菜单高亮下表
    const menuIndex = ref(0)
    // 监听菜单选中事件
    const handelMenuClick = (row,index)=>{
      menuIndex.value = index
    }
    return {
      menuList,
      menuIndex,
      handelMenuClick,
    }
  }
}
</script>

<style scoped>
.menuList{
  margin-top: 14px;
  margin-left: 14px;
  text-align: left;
  list-style: none;
}
.menuItem{
  padding: 10px;
  color:#333333;
  font-size: 15px;
  border-radius: 4px;
  margin-bottom: 4px;
  cursor: pointer;
  transition: background 0.25s;
}
.menuItem:hover{
  background: #f6f6f7;
}
.menuItemSelected{
  font-weight: 600;
  font-size: 18px;
  background: #f6f6f7;
}
</style>