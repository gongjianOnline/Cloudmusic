<!-- 
  - @description 当前音乐列表
  - @author 龚箭
  - @since 2022/06/16
-->
<template>
  <div>
    <div class="titleContaienr">
      <div class="title">当前播放</div>
      <div class="introduceContainer">
        <div class="titleInfo">
          <span>总{{musicListData.data.length}}首</span>
        </div>
        <div class="clearContent" @click="handelClear">
          <span>清空列表</span>
        </div>
      </div>
      
    </div>
    <!-- 音乐列表 -->
    <div class="currentListContainer">
      <ul>
        <li v-for="(item) in musicListData.data" 
          :key="item.id" 
          @dblclick="playMusicItem(item)">
          <div v-show="playMusicInfo.item.id===item.id">
            <svg class="icon playIcon" aria-hidden="true">
              <use xlink:href="#icon-bofang"></use>
            </svg>
          </div>
          <div class="currentName" :class="{'selected':playMusicInfo.item.id===item.id}">{{item.name}}</div>
          <div class="currentAuthor" :class="{'selected':playMusicInfo.item.id===item.id}">{{item.ars}}</div>
          <div class="currentDate" :class="{'selected':playMusicInfo.item.id===item.id}">{{item.dt}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {watch,reactive,ref,onMounted} from "vue";
import {useStore} from "vuex";
import dayjs from "dayjs"
export default {
  name:"currentList",
  setup(){
    /**获取全局上下文 */
    const store = useStore()
    
    /**变量声明 */
    // 歌单数据
    const musicListData = reactive({
      data:[]
    })
    // 正在播放的歌曲
    const playMusicInfo = reactive({item:{id:""}})

    /**watch 监听 */
    watch(()=>store.getters.getSongList,(newValue)=>{
      musicListData.data = newValue
      localStorage.setItem("currentListData",JSON.stringify(newValue))
    })
    watch(()=>store.getters.getMusicNews,(newValue)=>{
      playMusicInfo.item = newValue
    })

    /**页面挂载时 */
    onMounted(()=>{
      musicListData.data = JSON.parse(localStorage.getItem("currentListData")) || []
      playMusicItem(musicListData.data[0])
    })

    /**事件声明 */
    //清空当前歌单列表
    const handelClear = ()=>{
      store.dispatch("setSongList",null)
      localStorage.removeItem("currentListData")
    }
    // 播放当前音乐
    const playMusicItem = (item)=>{
      // 向播放器发送歌曲信息
      store.dispatch("setMusicNews",item)
    }

    return {
      musicListData,
      playMusicInfo,
      handelClear,
      playMusicItem,
    }
  }
}
</script>
<style scoped>
.titleContaienr{
  padding-top: 23px;
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 18px;
  border-bottom: 1px solid #f3f3f3;
  text-align: left;
}
.title{
  font-size: 24px;
  font-weight: 600;
  color: #333333;
}
.introduceContainer{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.titleInfo{
  font-size: 14px;
  color: #cccccc;
}
.clearContent span{
  color:#507daf;
  font-size: 14px;
  cursor: pointer;
}

/* 音乐列表 */
.currentListContainer{
  height: calc(100vh - 250px);
  overflow: auto;
}
.currentListContainer ul{
  list-style: none;
}
.currentListContainer ul li{
  width: 100%;
  height: 35px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  transition: background 0.25s;
}
.currentListContainer ul li:nth-child(odd){
  background: #fff;
}
.currentListContainer ul li:nth-child(even){
  background: #fafafa;
}
.currentListContainer ul li:hover{
  background: #eee;
}

.currentName{
  width: 198px;
  color: #333333;
  font-size:  14px;
  text-align: left; 
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.currentAuthor{
  width: 108px;
  color:#666666;
  font-size:  14px; 
  text-align: left; 
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.currentDate{
  font-size:  14px; 
  color:#cccccc;
}
.selected{
  color:#ec4646;
}
.playIcon{
  fill:#ec4646;
  width:10px;
  height:14px  
}

</style>
