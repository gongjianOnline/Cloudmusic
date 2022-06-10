<template>
  <div class="wrapper">
    <!-- 音乐信息 -->
    <div class="musicInfoContainer">
      <div class="musicImg"></div>
      <div class="musicInfo">
        <div class="musicTitle">水星记</div>
        <div class="musicAuthor">郭顶</div>
      </div>
    </div>
    <!-- 中间控制器 -->
    <div class="musicOperationContainer">
      <div class="musicController">
        <span class="musicBtn"></span>
        <span class="musicBtn"></span>
        <span class="musicStress"></span>
        <span class="musicBtn"></span>
        <span class="musicBtn"></span>
      </div>
      <div class="dateContainer">
        <div class="dateNumber">00:29</div>
        <div class="progressItem">
          <el-progress :percentage="10" :show-text="false"/>
        </div>
        <div class="dateNumber">05:25</div>
      </div>
    </div>
    <!-- 右边操作 -->
    <div class="extendContainer">
      <span style="margin-left:0"></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name:"footer",
  super(){
    
  }
}
</script>

<style scoped>
.wrapper{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 75px;
  border-top:1px solid #cdcdcd;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/* 左边音乐信息 */
.musicInfoContainer{
  margin-left: 14px;
  display: flex;
  
}
.musicImg{
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: #bbb;
}
.musicInfo{
  margin-left: 14px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  font-size: 15px;
  color:#333333;
}
/* 中间音乐操作 */
.musicOperationContainer{
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.musicController{
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.musicController>span{
  display: inline-block;
  cursor: pointer;
}
.musicBtn{
  width: 24px;
  height: 24px;
  background: #bbb;
  border-radius: 50%;
}
.musicStress{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background:#c3c3c3;
}
.dateContainer{
  width: 100%;
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dateNumber{
  color: #999;
  font-size:12px;
}
.progressItem{
  width: 100%;
  padding: 0px 10px;
}
/* 右侧扩展操作 */
.extendContainer{
  display: flex;
  padding-right: 20px;
}
.extendContainer>span{
  width: 24px;
  height: 24px;
  background: #bbb;
  margin-left: 10px;
  cursor: pointer;
}


</style>