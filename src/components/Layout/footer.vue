<!-- 
  - @description 窗口布局--底部布局
  - @author 龚箭
  - @since 2022/06/11
-->
<template>
  <div class="footerWrapper">
    <!-- 音乐信息 -->
    <div class="musicInfoContainer">
      <div class="musicImg">
        <img :src="musicInfo.musicNews.al.picUrl" alt="">
      </div>
      <div class="musicInfo">
        <div class="musicTitle">{{musicInfo.musicNews.name}}</div>
        <div class="musicAuthor">
          <span v-for="(arItem,arIndex) in musicInfo.musicNews.ar"
            :key="arIndex">{{arItem.name}}</span>
        </div>
      </div>
    </div>
    <!-- 中间控制器 -->
    <div class="musicOperationContainer">
      <div class="musicController">
        <span class="musicBtn">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiaoxunhuan"></use>
          </svg>
        </span>
        <span class="musicBtn">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shangyishou"></use>
          </svg>
        </span>
        <span class="musicStress">
          <svg class="icon" aria-hidden="true" @click="handelPlay" v-show="!musicInfo.isPaly">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="handelStop" v-show="musicInfo.isPaly">
            <use xlink:href="#icon-zanting1"></use>
          </svg>
        </span>
        <span class="musicBtn">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiayishou"></use>
          </svg>
        </span>
        <span class="musicBtn">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-geciweidianji"></use>
          </svg>
        </span>
      </div>
      <div class="dateContainer">
        <div class="dateNumber">{{musicInfo.currentTime}}</div>
        <div class="progressItem">
          <el-progress :percentage="10" :show-text="false"/>
        </div>
        <div class="dateNumber">{{musicInfo.duration}}</div>
      </div>
    </div>
    <!-- 右边操作 -->
    <div class="extendContainer">
      <span style="margin-left:0">
        <svg class="icon extendIcon" aria-hidden="true">
          <use xlink:href="#icon-yinxiao"></use>
        </svg>
      </span>
      <span>
        <svg class="icon extendIcon" aria-hidden="true">
          <use xlink:href="#icon-yinliang"></use>
        </svg>
      </span>
      <span>
        <svg class="icon extendIcon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
import { watchEffect,watch,ref,reactive } from "vue";
import { useStore } from 'vuex'
// import dayjs from "dayjs"
import {showTime} from "../../utils/formatDate.js"
export default {
  name:"footer",
  setup(){
    /**使用vuex获取音乐URL*/
    const store = useStore()
    const music = reactive({});
    /**获取音乐播放中的信息 */
    const musicInfo = reactive({
      duration:"",
      isPaly:false,
      currentTime:"",
      musicNews:{}
    })
    let audioElement = new Audio()
    watch(()=>store.getters.getMusicInfo,(newValue)=>{
      music.data = newValue;
      handelStop();
      audioElement = new Audio();
      handelPlay()
    })
    watch(()=>store.getters.getMusicNews,(newValue)=>{
      console.log("歌曲名称",newValue)
      musicInfo.musicNews = newValue
    })
    /**播放事件*/
    const handelPlay = ()=>{
      musicInfo.isPaly = true;
      audioElement.src = music.data.url;
      audioElement.play()
      // 获取音乐总时长
      audioElement.oncanplay=()=>{
        musicInfo.duration = showTime(audioElement.duration);
        currentProgress()
      }
    }
    /**音乐暂停 */
    const handelStop = ()=>{
      musicInfo.isPaly = false
      audioElement.pause()
    }
    /**当前音乐执行进度 */
    const currentProgress = ()=>{
      setInterval(()=>{
        musicInfo.currentTime = showTime(audioElement.currentTime)
      },500)
    }
    return {
      musicInfo,
      handelPlay,
      handelStop
    }
  }
}
</script>

<style scoped>
.footerWrapper{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 75px;
  border-top:1px solid #cdcdcd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-app-region: no-drag;
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
  overflow: hidden;
}
.musicImg img{
  width: 100%;
  height: 100%;
}
.musicInfo{
  margin-left: 14px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  font-size: 15px;
  color:#333333;
}
.musicTitle{
  font-size: 16px;
  color: #373737;
  text-align: left;
}
.musicAuthor{
  font-size: 14px;
  color: #373737;
  text-align: left;
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
  border-radius: 50%;
  line-height: 24px;
}
.musicStress{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background:#f4f4f4;
  line-height: 40px;
  text-align: center;
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
  width: 60px;
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
  margin-left: 10px;
  cursor: pointer;
  text-align: center;
  line-height: 24px;
}
.extendIcon{
  width: 20px;
  height: 20px;
}


</style>