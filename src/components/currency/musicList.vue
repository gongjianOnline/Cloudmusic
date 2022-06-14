<!-- 
  - @description 音乐列表
  - @author 龚箭
  - @since 2022/06/13
-->
<template>
  <div class="musicList-wrapper">
    <ul class="musicList">
      <li class="musicIndex"></li>
      <li class="musicListOperation">操作</li>
      <li class="musicTitle">标题</li>
      <li class="musicAuthor">歌手</li>
      <li class="musicAlbum">专辑</li>
      <!-- <li class="musicDuration">时间</li> -->
    </ul>
    <ul class="musicListItem" 
      v-for="(item,index) in dataList.data" 
      :key="item.id"
      @dblclick="handelMusicClick(item)">
      <li class="musicIndex">{{index+1}}</li>
      <li class="musicListOperation">
        <svg class="icon musicListIcon" aria-hidden="true">
          <use xlink:href="#icon-dianzanb"></use>
        </svg>
        <svg class="icon musicListIcon" aria-hidden="true">
          <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
        </svg>
      </li>
      <li class="musicTitle">{{item.name}}</li>
      <li class="musicAuthor">
        <span v-for="(arItem,arIndex) in item.ar" :key="arIndex">{{arItem.name}}</span>
      </li>
      <li class="musicAlbum">{{item.tns}}</li>
      <!-- <li class="musicDuration">{{item.publishTime}}</li> -->
    </ul>
  </div>
</template>
<script>
import { defineComponent,toRefs,getCurrentInstance} from "vue";
import { useStore } from 'vuex'
export default defineComponent({
  name:"musicList",
  props:{
    dataList:Object
  },
  setup(props){
    /**全局上下文 */
    const {proxy} = getCurrentInstance();
    const $http = proxy.$http
    const store = useStore()

    const {dataList} = toRefs(props)
    /*页面业务方法 */
    // 点击当前音乐项
    const handelMusicClick = async (item)=>{
      let response = await proxy.$axios({
        method:"get",
        url:`${$http}/song/url`,
        params:{
          id:item.id
        }
      })
      store.dispatch("setMusicInfo",response.data.data[0]);
      store.dispatch("setMusicNews",item)
    }
  
    return {
      dataList,
      handelMusicClick
    }
  }
})
</script>

<style scoped>
.musicList-wrapper{
  width: 100%;
}
.musicList,
.musicListItem{
  list-style: none;
  display: flex;
}
.musicList li,
.musicListItem li{
  height: 34px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  color: #888888;
  font-size: 14px;
  cursor: pointer;
}
.musicIndex{
  width: 5%;
}
.musicListOperation{
  width: 10%;
}
.musicTitle{
  width: 30%;
  color:#363636;
}
.musicAuthor{
  width: 25%;
}
.musicAuthor span{
  margin-right: 6px;
}
.musicAlbum{
  width: 20%;
}
.musicDuration{
  width: 10%;
}
ul:nth-child(odd){
  background: #fff;
}
ul:nth-child(even){
  background: #f9f9f9;
}
.musicListItem{
  transition: all 0.25s;
}
.musicListItem:hover{
  background: #ededed;
}
.musicListIcon{
  width: 18px;
  height: 18px;
  margin-right: 4px;
}

</style>