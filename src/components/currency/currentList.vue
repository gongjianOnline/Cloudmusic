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
        <span>总35首</span>
      </div>
    </div>
    <!-- 音乐列表 -->
    <div class="currentListContainer">
      <ul>
        <li v-for="(item) in 35" :key="item">
          <div class="currentName">孤勇者</div>
          <div class="currentAuthor">陈奕迅</div>
          <div class="currentDate">03:16</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name:"currentList",
  setup(){
    return {

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
}
.currentAuthor{
  width: 108px;
  color:#666666;
  font-size:  14px; 
  text-align: left;    
}
.currentDate{
  font-size:  14px; 
  color:#cccccc;
}

</style>
