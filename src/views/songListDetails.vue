<!-- 
  - @description 歌单点击详情
  - @author 龚箭
  - @since 2022/06/13
-->
<template>
  <div class="songListDetails-wrapper">
    <!-- header -->
    <div class="headerContainer">
      <div class="SLDetailImg">
        <img :src="detailList.coverImgUrl" alt="">
      </div>
      <div class="SLDetailInfo">
        <!-- 标题 -->
        <div class="SLDetailInfoTitleContent"> 
          <span class="SLDetailInfoTitleTag">歌单</span>
          <span class="SLDetailInfoTitleText">{{detailList.name}}</span>
        </div>
        <!-- 作者信息 -->
        <div class="authorContainer">
          <div class="authorLogo">
            <img :src="detailAuthor.data.avatarUrl" alt="">
          </div>
          <div class="authorName">{{detailAuthor.data.nickname}}</div>
          <div class="authorDate">{{detailList.createTime}}</div>
        </div>
        <!-- 一件三联 -->
        <div class="TriplicateContainer">
          <div class="playAll">
            <span>
              <svg class="icon playAllIcon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
              </svg>
            </span>
            <span class="playAllLabel">播放全部</span>
            <span class="playAllAdd">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiahao"></use>
              </svg>
            </span>
          </div>
          <div class="otherBtn">
            <div>
              <svg class="icon otherIcon" aria-hidden="true">
                <use xlink:href="#icon-wenjianjia_o"></use>
              </svg>
            </div>
            <div class="otherBtnLabel">收藏</div>
          </div>
          <div class="otherBtn">
            <div>
              <svg class="icon otherIcon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
              </svg>
            </div>
            <div class="otherBtnLabel">分享</div>
          </div>
          <div class="otherBtn">
            <div>
              <svg class="icon otherIcon" aria-hidden="true">
                <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
              </svg>
            </div>
            <div class="otherBtnLabel">下载全部</div>
          </div>


        </div>

        <!-- 歌单备注 -->
        <div class="remarksContainer">
          <div class="remarksItem">
            <span class="remarksItemTitle">标签: </span>
            <span class="remarksItemTag">{{detailList.tags}}</span>
          </div>
          <div class="remarksItem">
            <span class="remarksItemTitle">歌曲: </span>
            <span class="remarksItemValue">{{detailList.tracksLength}}</span>
          </div>
          <div class="remarksItem overflow">
            <!-- <span class="remarksItemTitle">简介: </span> -->
            <span class="remarksItemValue">简介: {{detailList.description}}</span>
          </div> 
        </div>
      </div>
    </div>
    <!-- musicList -->
    <MusicList :dataList="musicList"></MusicList>
  </div>
</template>

<script>
import MusicList from "../components/currency/musicList.vue";
import { ref,reactive , getCurrentInstance,onMounted } from "vue";
import { useRouter , useRoute} from 'vue-router'
import dayjs from "dayjs"
export default{
  name:"songListDetails",
  components:{
    MusicList
  },
  setup(){
    /**获取全局上下文 */
    const {proxy} = getCurrentInstance();
    const $http = proxy.$http;
    /**路由初始化 */
    const router = useRouter();
    const route = useRoute();
    /**响应式参数声明 */
    const detailList = ref({});
    const detailAuthor = reactive({
      data:[]
    })
    const musicList = reactive({data:{}})
    /**参数持久化 */
    let routeParams
    if("item" in route.params){
      sessionStorage.setItem("musicHeader",route.params.item)
      routeParams = JSON.parse(route.params.item)
    }else{
      routeParams = JSON.parse(sessionStorage.getItem("musicHeader"))
    }
    
    /**接口联调 */
    // 获取歌单详情
    const getDetailList = async ()=>{
      let response = await proxy.$axios({
        method:'get',
        url:`${$http}/playlist/detail`,
        params:{
          id:routeParams.id
        }
      })
      let res  = response.data.playlist;
      res.tags = (res.tags).join(" / ");
      res.tracksLength = res.tracks.length;
      res.createTime = dayjs(detailList.value.createTime).format('YYYY-MM-DD')
      // 全部信息
      detailList.value = response.data.playlist;
      // 作者信息
      detailAuthor.data = res.creator;
      //歌曲列表
      // 整理专辑标签
      res.tracks.forEach((item)=>{
        if(item.tns){
          item.tns = item.tns.join("")
        }else{
          item.tns = ""
        }
      })
      musicList.data = res.tracks;
    }
    
    /**声明周期 */
    onMounted(()=>{
      getDetailList()
    })
    return {
      detailList,
      detailAuthor,
      musicList
    }
  }
}
</script>

<style scoped>
.songListDetails-wrapper{

}
.headerContainer{
  margin: 30px;
  display: flex;
}
.SLDetailImg{
  width: 184px;
  height: 184px;
  border-radius: 10px;
  overflow: hidden;
}
.SLDetailImg img{
  width: 100%;
  height: 100%;
}
.SLDetailInfo{
  margin-left: 18px;
  flex:1;
  text-align: left;
}
.SLDetailInfoTitleContent span{
  display: inline-block;
}
.SLDetailInfoTitleTag{
  width: 36px;
  height: 20px;
  border: 1px solid #f28c8c;
  border-radius: 4px;
  color: #ec4141;
  font-size: 14px;
  text-align: center;
  margin-right: 10px;
}
.SLDetailInfoTitleText{
  color: #373737;
  font-size: 22px;
  font-weight: 600;
}
/* 作者信息 */
.authorContainer{
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.authorContainer div{
  height: 26px;
  line-height: 26px;
}
.authorLogo{
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #ccc;
  margin-right: 10px;
  overflow: hidden;
}
.authorLogo img{
  width: 100%;
  height: 100%;
}
.authorName{
  height: 26px;
  font-size: 13px;
  color: #507daf;
  margin-right: 10px;   
}
.authorDate{
  font-size: 12px;
  color: #676767;
}
/* 一件三联 */
.TriplicateContainer{
  margin-top: 13px;
  display: flex;
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
  line-height: 34px;
}
.playAllAdd{
  margin-left: 5px;
}
/* 其他按钮 */
.otherBtn{
  margin-left: 12px;
  width: 114px;
  height: 34px;
  border:1px solid #d8d8d8;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.otherBtnLabel{
  font-size: 15px;
  color:#373737;
  margin-left: 6px;
}
.otherIcon{
  width: 20px;
  height: 20px;
  line-height: 24px;
}
/* 备注 */
.remarksContainer{
  margin-top:8px;
  font-size: 14px;
}
.remarksItem{
  margin-top: 4px;
}
.remarksItemTitle{
  color:#373737;
}
.remarksItemTag{
  color:#507daf;
}
.remarksItemValue{
  color:#676767;
  margin-right: 14px;
}
.overflow{
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>