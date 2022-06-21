<!-- 
  - @description 歌单列表
  - @author 龚箭
  - @since 2022/06/21
-->
<template>
  <div>
    <div class="albumItem">
      <div class="albumLeft">
        <div class="albumImg"><img src="" alt="" ></div>
        <div class="albumName">wangzihui</div>
      </div>
      <div class="albumRight">
        <div class="albumRightInfo">
          <div class="albumRightNumber">322首</div>
          <div class="albumRightAuthor">鹿白川</div>
        </div>
        <div class="albumRightPlayback">
          <span>
            <svg class="icon playbackIcon" aria-hidden="true">
              <use xlink:href="#icon-yunhang"></use>
            </svg>
          </span>
          <span>920万</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name:"albumList",
  setup(){
    return {

    }
  }
}
</script>

<style scoped>
.albumItem{
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 33px;
}
.albumItem:nth-child(even){
  background: #f9f9f9;
}
.albumItem>div{
  width: 50%;
  text-align: left;
}
.albumLeft{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.albumImg{
  width: 62px;
  height: 62px;
  border-radius: 10px;
  background: red;
  margin-right: 12px;
}
.albumName{
  font-size: 14px;
  color:#373737 
}
.albumRight{
  display: flex;
  justify-content: space-between;
}
.albumRightInfo{
  display: flex;
}
.albumRightNumber{
  color:#9f9f9f;
}
.albumRightAuthor{
  margin-left: 30px;
  color:#676767
}
.albumRight>div{
  width: 50%;
  font-size: 12px;
}
.albumRightPlayback{
  text-align: center;
  color:#9f9f9f;
  display: flex;
  justify-content: center;
  align-items: center;
}
.albumRightPlayback span{
  display: block;
  margin-left: 2px;
}
.playbackIcon{
  fill:#9f9f9f
}
</style>