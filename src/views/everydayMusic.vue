<!-- 
  - @description 每日推荐歌单详情
  - @author 龚箭
  - @since 2022/06/17
-->
<template>
  <div class="headerWrapper">
    <div class="infoContainer">
      <div class="infoImgContent">
        <img src="/img/everydayMusic/dayImg.png" alt="">
        <div class="dayContent">{{dateDay}}</div>
      </div>
      <div>
        <div class="infoTitle">每日歌曲推荐</div>
        <div class="infoDoc">根据你的音乐口味生成, 每天6:00更新</div>
      </div>
    </div>
    <!-- 播放全部 -->
    <div class="btnContainer">
      <div class="playAll">
        <span>
          <svg class="icon playAllIcon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
        </span>
        <span class="playAllLabel" @click="handelPlay">播放全部</span>
        <span class="playAllAdd">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jiahao"></use>
          </svg>
        </span>
      </div>
    </div>
  </div>

  <!-- 音乐列表 -->
  <MusicList :dataList="musicData"></MusicList>


</template>

<script>
// import MusicList from "../components/currency/musicList.vue";
import { ref, reactive, getCurrentInstance, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import dayjs from "dayjs";
import MusicList from "../components/currency/musicList.vue"
export default {
  name: "songListDetails",
  components: {
    MusicList
  },
  setup() {
    /**获取全局上下文 */
    const { proxy } = getCurrentInstance();
    const $http = proxy.$http;
    const store = useStore();
    
    /** 变量声明 */
    //  获取当前日期
    const dateDay = ref(dayjs(new Date()).format("DD"))
    // 音乐列表
    const musicData = reactive({data:[]})

    /**方法声明 */
    // 获取音乐列表
    const getMusicData = async ()=>{
      let response = await proxy.$axios({
        method:"get",
        url:`${$http}/recommend/songs`,
      })
      let res = response.data.data.dailySongs;
      res.forEach((resItem,resIndex)=>{
        // 格式化作者信息
        resItem.ars = [];
        resItem.ar.forEach((arItem,arIndex)=>{
          resItem.ars[arIndex] = arItem.name
        })
        resItem.ars = resItem.ars.join(' ');
        // 专辑
        resItem.tns = "";
        // 时长
        resItem.dt = dayjs(resItem.dt).format('mm:ss')
      })
      musicData.data = res
    }
    // 播放全部
    const handelPlay = ()=>{
      store.dispatch("setSongList",musicData.data)
    }


    onMounted(()=>{
      getMusicData()
    })


    return {
      dateDay,
      musicData,
      handelPlay
    };
  },
};
</script>

<style scoped>
.headerWrapper {
  padding: 26px;
}
/* 顶部标题 */
.infoContainer {
  display: flex;
  align-items: center;
}
.infoImgContent {
  width: 79px;
  height: 79px;
  margin-right: 30px;
  overflow: hidden;
  position: relative;
}
.infoImgContent>img{
  width: 100%;
}
.dayContent{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-40%);
  font-size: 26px;
  font-weight: 600;
  color:#ec4141;
}
.infoTitle {
  font-size: 27px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #373737;
  text-align: left;
}
.infoDoc {
  font-size: 14px;
  color: #676767;
  text-align: left;
}
/**播放全部 */
.btnContainer {
  margin-top: 24px;
}
.playAll{
  width: 138px;
  height: 34px;
  border-radius: 20px;
  background: #ec4141;
  color:#fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.playAll span{
  display: block;
}
.playAllLabel{
  font-size: 15px;
  padding-right: 5px;
  border-right: 1px solid rgba(255,255,255,0.4);
}
.playAllIcon{
  fill:#fff;
  height: 34px;
  margin-right: 4px;
  margin-top: 2px;
}
.playAllAdd{
  margin-left: 5px;
}
</style>