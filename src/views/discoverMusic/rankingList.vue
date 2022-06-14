<!-- 
  - @description 发现音乐--排行榜
  - @author 龚箭
  - @since 2022/06/13
-->
<template>
  <div class="rankingList-wrapper">
    <div class="rankingListTitle">官方榜</div>
    <!-- 官方推荐列表 -->
    <div class="officialListContainer" v-for="(item) in rankingTopList.data" :key="item.id">
      <div class="officialItemLogo">
        <div class="officialDate">刚刚更新</div>
        <div class="officialPlay">
          <svg class="icon playIcon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
        </div>
        <img :src="item.coverImgUrl" alt="" class="officialImg">
      </div>
      <div class="officialList">
        <ul>
          <li v-for="(tracksItem,tracksIndex) in item.tracks" :key="tracksItem.id">
            <div>
              <div class="officialItemIndex">{{tracksIndex+1}}</div>
              <div class="officialItemRATIO"></div>
              <div class="officialItemTitle">{{tracksItem.name}}</div>
            </div>
            <div class="officialItemAuthor">
              <span v-for="(arItem) in tracksItem.ar" :key="arItem.id">{{arItem.name}}</span>
            </div>
          </li>
          <li class="officialMore">查看更多</li>
        </ul>
      </div>
    </div>

    <!-- 全球排行榜 -->
    <div class="rankingListTitle">全球榜</div>
    <!-- 全球榜列表 -->
    <div class="globalRankingsContainer">
      <div class="globalRankingsItem" v-for="(item) in rankingList" :key="item.id">
        <div class="globalRankingsImgContent">
          <img :src="item.coverImgUrl" alt="">
          <div class="playContent">
            <svg class="icon playIcon" aria-hidden="true">
              <use xlink:href="#icon-bofang"></use>
            </svg>
          </div>
        </div>
        <div class="globalRankingsTitle">{{item.name}}</div>
      </div>
    </div>


  </div>
</template>

<script>
import { ref,reactive , getCurrentInstance,onMounted } from "vue";
export default{
  name:"rankingList",
  setup(){
    // 获取全局上下文
    const {proxy} = getCurrentInstance();
    const $http = proxy.$http;
    /**声明数据响应式变量 */
    // 剩余歌单
    const rankingList = ref([]);
    // 歌单前五名
    const rankingTopList = reactive({data:[]});

    /**接口调用方法 */
    // 获取排行榜列表
    const getRankingList = async ()=>{
      let response = await proxy.$axios({
        method:"get",
        url:`${$http}/toplist`
      })
      let res = response.data.list;
      let ranking5Top = res.splice(0,4);
      rankingList.value = res;
      // 循环调用接口获取音乐列表
      ranking5Top.forEach((item,index)=>{
        getMusicList(item.id,index)
      })
    }
    // 获取音乐列表
    const getMusicList = async (id,index)=>{
      let response = await proxy.$axios({
        method:"get",
        url:`${$http}/playlist/detail`,
        params:{
          id:id
        }
      })
      response.data.playlist.tracks = (response.data.playlist.tracks).splice(0,5)
      rankingTopList.data.push(response.data.playlist)
    }

    /**生命周期调用 */
    onMounted(()=>{
      getRankingList()
    })

    return {
      rankingTopList,
      rankingList
    }

    
  }
}
</script>
<style scoped>
.rankingList-wrapper{
  width: 816px;
  margin: 0 auto;
}
/* 标题 */
.rankingListTitle{
  font-size: 22px;
  font-weight: 600;
  color: #373737;
  text-align: left;
  margin-bottom: 18px;
}
/* 官方推荐 */
.officialListContainer{
  width: 100%;
  display: flex;
}
.officialItemLogo{
  width: 174px;
  height: 174px;
  border-radius: 10px;
  background: #3b77ae;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
.officialDate{
  color: #fff;
  font-size: 11px;
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
}
.officialItemLogo .officialPlay{
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  opacity: 0;
  transition: opacity 0.25s;
}
.officialItemLogo:hover .officialPlay{
  opacity: 1;
}
.playIcon{
  fill: #ec4141;
  opacity: 0.8;
  width: 24px;
  height: 24px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.officialImg{
  width: 100%;
  height: 100%;
}
/* 右侧列表 */
.officialList{
  flex:1;
  margin-left: 35px;
}
.officialList>ul{
  list-style: none;
}
.officialList ul li {
  display: flex;
  justify-content: space-between;
  height: 36px;
  font-size: 12px;
  padding: 0px 12px;
  border-radius: 6px;
  cursor: pointer;
}
.officialList ul li:nth-child(odd){
	background: #f9f9f9;
}
.officialList ul li:nth-child(even){
	background: #ffffff;
}

.officialList ul li div{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
}
.officialItemIndex{
  margin-right: 10px;
  color: #ec4141;
}
.officialItemRATIO{
  margin-right: 10px;
  color: #9b9b9b;
}
.officialItemTitle{
  color: #363636;
}
.officialItemAuthor span{
  display: inline-block;
  margin-left: 10px;
  color:#9f9f9f
}
.officialMore{
  margin-top: 11px;
  color: #676767;
  font-size: 13px;
  transition: color 0.25s;
}
.officialMore:hover{
  color: #363636;
}


/* 全球榜列表 */
.globalRankingsContainer{
  width: 100%;
  text-align: left;
}
.globalRankingsItem{
  width: 140px;
  display: inline-block;
  margin-left: 20px;
  margin-top: 25px;
  position: relative;
  cursor: pointer;
}
.globalRankingsImgContent{
  width: 140px;
  height: 140px;
  border-radius: 10px;
  overflow: hidden;
}
.globalRankingsImgContent img{
  width:100%
}
.playContent{
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  border-radius: 50%;
  width: 42px;
  height: 42px;
  background: rgba(255,255,255,0.8);
  opacity: 0;
  transition: opacity 0.25s;
}
.globalRankingsImgContent:hover .playContent{
  opacity: 1;
}
.playIcon{
  width:20px;
  height: 20px;
  fill: #ec4141;
  transform: translate(-40%,-50%);
}
.globalRankingsTitle{
  font-size: 14px;
  margin-top: 12px;
  color:#373737;
  text-align: left;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;

}

</style>
