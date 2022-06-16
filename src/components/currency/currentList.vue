<!-- 
  - @description 当前音乐列表
  - @author 龚箭
  - @since 2022/06/16
-->
<template>
  <div>
    <div class="titleContaienr">
      <div class="title">当前播放</div>
      <div class="titleInfo">
        <span>总{{musicListData.data.length}}首</span>
      </div>
    </div>
    <!-- 音乐列表 -->
    <div class="currentListContainer">
      <ul>
        <li v-for="(item) in musicListData.data" :key="item.id">
          <div class="currentName">{{item.name}}</div>
          <div class="currentAuthor">{{item.ars}}</div>
          <div class="currentDate">{{item.dt}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {watch,reactive} from "vue";
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

    /**watch 监听 */
    watch(()=>store.getters.getSongList,(newValue)=>{
      musicListData.data = newValue
    })

    return {
      musicListData
    }
  }
}
</script>
<style scoped>
.titleContaienr{
  padding-top: 23px;
  padding-left: 20px;
  padding-bottom: 18px;
  border-bottom: 1px solid #f3f3f3;
  text-align: left;
}
.title{
  font-size: 24px;
  font-weight: 600;
  color: #333333;
}
.titleInfo{
  margin-top: 20px;
  font-size: 14px;
  color: #cccccc;
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

</style>
