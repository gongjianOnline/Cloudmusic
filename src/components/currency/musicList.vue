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
      <li class="musicDuration">时间</li>
    </ul>
    <ul class="musicListItem" v-for="(item,index) in 20" :key="index">
      <li class="musicIndex">0{{index+1}}</li>
      <li class="musicListOperation">
        <svg class="icon musicListIcon" aria-hidden="true">
          <use xlink:href="#icon-dianzanb"></use>
        </svg>
        <svg class="icon musicListIcon" aria-hidden="true">
          <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
        </svg>
      </li>
      <li class="musicTitle">孤勇者</li>
      <li class="musicAuthor">陈奕迅</li>
      <li class="musicAlbum">英雄联盟S15主题曲</li>
      <li class="musicDuration">03:02</li>
    </ul>
  </div>
</template>
<script>
export default {
  name:"musicList",
  setup(){

  }
}
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