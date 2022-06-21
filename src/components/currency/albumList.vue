<!-- 
  - @description 专辑列表
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
      <div class="albumRight">天然卷夏季</div>
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
  color:#676767;
  font-size: 12px;
}
</style>