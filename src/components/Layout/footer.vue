<!-- 
  - @description 窗口布局--底部布局
  - @author 龚箭
  - @since 2022/06/11
-->
<template>
  <div class="footerWrapper">
    <div class="relativeContainer">
      <!-- 音乐信息 -->
      <div class="musicInfoContainer">
        <div class="musicImg">
          <img :src="musicInfo.musicNews.al.picUrl" alt="" />
        </div>
        <div class="musicInfoContent">
          <div class="musicTitle">{{ musicInfo.musicNews.name }}</div>
          <div class="musicAuthor">
            <span
              v-for="(arItem, arIndex) in musicInfo.musicNews.ar"
              :key="arIndex"
              >{{ arItem.name }}</span
            >
          </div>
        </div>
      </div>
      <!-- 中间控制器 -->
      <div class="musicOperationContainer">
        <div class="musicController">
          <el-tooltip :content="loopTypeItem.data.label" placement="top">
            <span class="musicBtn" @click="handelLoopClick">
              <svg class="icon loopIcon iconHover" aria-hidden="true">
                <use v-bind:xlink:href="loopTypeItem.data.icon"></use>
              </svg>
            </span>
          </el-tooltip>
          
          <span class="musicBtn" @click="handelDirection('back')">
            <svg class="icon iconHover" aria-hidden="true">
              <use xlink:href="#icon-shangyishou"></use>
            </svg>
          </span>
          <span
            class="musicStress"
            @click="handelPlay"
            v-show="!musicInfo.isPaly"
          >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang"></use>
            </svg>
          </span>
          <span
            class="musicStress"
            @click="handelStop"
            v-show="musicInfo.isPaly"
          >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zanting1"></use>
            </svg>
          </span>
          <span class="musicBtn" @click="handelDirection('next')">
            <svg class="icon iconHover" aria-hidden="true">
              <use xlink:href="#icon-xiayishou"></use>
            </svg>
          </span>
          <span class="musicBtn">
            <svg class="icon iconHover" aria-hidden="true">
              <use xlink:href="#icon-geciweidianji"></use>
            </svg>
          </span>
        </div>
        <div class="dateContainer">
          <div class="dateNumber">{{ musicInfo.currentTime }}</div>
          <div class="progressItem">
            <el-progress
              :percentage="musicInfo.progress-0"
              :show-text="false"
            />
          </div>
          <div class="dateNumber">{{ musicInfo.duration }}</div>
        </div>
      </div>
      <!-- 右边操作 -->
      <div class="extendContainer">
        <!-- 音效模块 -->
        <span style="margin-left: 0">
          <svg class="icon extendIcon" aria-hidden="true">
            <use xlink:href="#icon-yinxiao"></use>
          </svg>
        </span>
        <!-- 音量滑块 -->
        <span>
          <el-popover placement="top" :width="50" trigger="click">
            <template #reference>
              <svg class="icon extendIcon" aria-hidden="true">
                <use xlink:href="#icon-yinliang"></use>
              </svg>
            </template>
            <div class="voiceContainer">
              <div class="voiceContent">
                <el-slider
                  v-model="musicInfo.voiceValue"
                  vertical
                  height="80px"
                  @input="handelVoice"
                  size="small"
                />
              </div>
            </div>
          </el-popover>
        </span>
        <!-- 音乐列表Icon -->
        <span @click="isCurrentState">
          <svg class="icon extendIcon" aria-hidden="true">
            <use xlink:href="#icon-liebiao"></use>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, ref, reactive, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { showTime } from "../../utils/formatDate.js";
export default {
  name: "footer",
  setup() {
    /**获取全局上下文 */
    const { proxy } = getCurrentInstance();
    const $http = proxy.$http;
    /**使用vuex获取音乐URL*/
    const store = useStore();
    const music = reactive({});
    /**变量声明 */
    //获取音乐播放中的信息
    const musicInfo = reactive({
      duration: "",
      isPaly: false,
      currentTime: "",
      musicNews: {
        al: { picUrl: "" },
        ar: {},
      },
      progress: 0, // 进度
      voiceValue: 40, // 音量
      singleLoop:true, // 单曲循环
    });
    // 初始化音视频实例
    let audioElement = new Audio();
    audioElement.volume = musicInfo.voiceValue / 100;
    audioElement.loop = musicInfo.singleLoop
    //定时器变量
    let timer = ref(null);
    //循环类型选项
    const loopType = reactive([
      {
        icon:"#icon-24gl-repeatOnce2",
        label:'单曲循环',
        id:"0"
      },
      {
        icon:"#icon-liebiaoxunhuan",
        label:'列表循环',
        id:"1"
      }
    ])
    const loopTypeItem = reactive({
      data:{
        icon:"#icon-24gl-repeatOnce2",
        label:'单曲循环',
        id:"0"
      }
    })
    /**接口调用 */
    const getMusicUrl = async (id) => {
      let response = await proxy.$axios({
        method: "get",
        url: `${$http}/song/url`,
        params: {
          id: id,
        },
      });
      let res = response.data.data[0];
      musicConfig(res.url);
    };

    /**事件声明区 */
    // 初始化音乐配置
    const musicConfig = (url) => {
      musicInfo.isPaly = true;
      audioElement.src = url;
      handelPlay();
    };
    //播放事件
    const handelPlay = () => {
      musicInfo.isPaly = true;
      audioElement.play();
      // 获取音乐总时长
      audioElement.oncanplay = () => {
        musicInfo.duration = showTime(audioElement.duration);
        if (timer.value) {
          clearInterval(timer.value);
        }
        currentProgress();
      };
    };
    //音乐暂停
    const handelStop = () => {
      musicInfo.isPaly = false;
      audioElement.pause();
    };
    //当前音乐执行进度
    const currentProgress = () => {
      timer.value = setInterval(() => {
        musicInfo.currentTime = showTime(audioElement.currentTime);
        // 计算进度条当前位置
        let current = Number.parseInt(audioElement.currentTime);
        let total = Number.parseInt(audioElement.duration);
        musicInfo.progress = Math.abs(
          Math.abs(Math.abs((total - current) / total) * 100) - 100
        ).toFixed(2);
      }, 1000);
    };
    // 监听声音大小
    const handelVoice = () => {
      audioElement.volume = musicInfo.voiceValue / 100;
    };
    // 通知当前是否显示当前列表弹框
    const isCurrentState = () => {
      store.dispatch("setCurrentState", !store.getters.getCurrentState);
    };
    // 上一首 下一首切换
    const handelDirection = (type) => {
      // 获取播放列表
      let currentList = store.getters.getSongList;
      // 获取当前播放的歌曲
      let itemMusic = store.getters.getMusicNews;
      // 遍历当前音乐在列表的下标
      let itemIndex = 0;
      for (let i = 0; i < currentList.length; i++) {
        if (currentList[i].id === itemMusic.id) {
          itemIndex = i;
          break;
        }
      }
      if (type === "back") {
        if (itemIndex === 0) {
          store.dispatch("setMusicNews", currentList[currentList.length - 1]);
        } else {
          store.dispatch("setMusicNews", currentList[itemIndex - 1]);
        }
      } else {
        if (itemIndex >= currentList.length - 1) {
          store.dispatch("setMusicNews", currentList[0]);
        } else {
          store.dispatch("setMusicNews", currentList[itemIndex + 1]);
        }
      }
    };
    // 切换循环类型
    const handelLoopClick = ()=>{
      // 切换状态
      let loopIconIndex = 0;
      for(let i = 0;i<loopType.length;i++){
      if(loopType[i].id === loopTypeItem.data.id){
          loopIconIndex = i;
        }
      }
      if(loopIconIndex >= loopType.length-1){
        loopTypeItem.data = loopType[0]
      }else{
        loopTypeItem.data = loopType[loopIconIndex+1]
      }
      // 根据状态是否为循环播放
      if(loopTypeItem.data.id === "0"){
        musicInfo.singleLoop = true;
        audioElement.loop = musicInfo.singleLoop
      }else{
        musicInfo.singleLoop = false;
        audioElement.loop = musicInfo.singleLoop
      }
    }
    // 监听音乐播放结束的事件
    audioElement.onended = ()=>{
      /**如果在列表循环模式下，获取播放列表和当前音乐的信息比较，取下标做循环列表动作 */
      if(loopTypeItem.data.id === "1"){
        handelDirection("next")
      }
    }

    // 监听vuex中数据变化
    watch(
      () => store.getters.getMusicNews,
      (newValue) => {
        if (audioElement) {
          handelStop();
          musicInfo.progress = 0
        }
        if(newValue){
          getMusicUrl(newValue.id);
          musicInfo.musicNews = newValue;
        }
        
      }
    );

    return {
      musicInfo,
      loopTypeItem,
      handelPlay,
      handelStop,
      handelVoice,
      isCurrentState,
      handelDirection,
      handelLoopClick,
    };
  },
};
</script>

<style>
.el-popover.el-popper {
  min-width: 0px;
  padding: 0px;
}
</style>

<style scoped>
.footerWrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 75px;
  border-top: 1px solid #cdcdcd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-app-region: no-drag;
}
.relativeContainer{
  position: relative;
  width: 100%;
  height: 100%;
}
/* 左边音乐信息 */
.musicInfoContainer {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 280px;
  margin-left: 14px;
  display: flex;
}
.musicImg {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
}
.musicImg img {
  width: 100%;
  height: 100%;
}
.musicInfoContent {
  margin-left: 14px;
  width: calc(100% - 64px);
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  font-size: 15px;
  color: #333333;
}
.musicTitle {
  font-size: 16px;
  color: #373737;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.musicAuthor {
  font-size: 14px;
  color: #373737;
  text-align: left;
}
/* 中间音乐操作 */
.musicOperationContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.musicController {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.musicController > span {
  display: inline-block;
  cursor: pointer;
}
.musicBtn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  line-height: 24px;
}

.iconHover {
  transition: fill 0.25s;
}
.iconHover:hover {
  fill: #ec4141;
}
.loopIcon{
  width: 18px;
  height: 18px; 
}
.musicStress {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f4f4f4;
  line-height: 40px;
  text-align: center;
}
.dateContainer {
  width: 100%;
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dateNumber {
  color: #999;
  font-size: 12px;
  width: 60px;
}
.progressItem {
  width: 100%;
  padding: 0px 10px;
}
/* 右侧扩展操作 */
.extendContainer {
  position: absolute;
  top: 50%;
  right:0px;
  transform: translateY(-50%);
  display: flex;
  padding-right: 20px;
}
.extendContainer > span {
  width: 24px;
  height: 24px;
  margin-left: 10px;
  cursor: pointer;
  text-align: center;
  line-height: 24px;
}
.extendIcon {
  width: 20px;
  height: 20px;
}
/**声音调整 */
.voiceContainer {
  height: 120px;
  position: relative;
}
.voiceContent {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>