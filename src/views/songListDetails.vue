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
        <img src="/img/musicList/musicImg.png" alt="">
      </div>
      <div class="SLDetailInfo">
        <!-- 标题 -->
        <div class="SLDetailInfoTitleContent"> 
          <span class="SLDetailInfoTitleTag">歌单</span>
          <span class="SLDetailInfoTitleText">听了就很开心的纯音乐</span>
        </div>
        <!-- 作者信息 -->
        <div class="authorContainer">
          <div class="authorLogo"></div>
          <div class="authorName">新鲜的南瓜粥</div>
          <div class="authorDate">2017-11-12</div>
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
            <span class="remarksItemTag">学习 / 快乐 / 清新</span>
          </div>
          <div class="remarksItem">
            <span class="remarksItemTitle">歌曲: </span>
            <span class="remarksItemValue">134</span>
            <span class="remarksItemTitle">播放: </span>
            <span class="remarksItemValue">113万</span>
          </div>
          <div class="remarksItem">
            <span class="remarksItemTitle">简介: </span>
            <span class="remarksItemValue">当精神被微积分摧残的时候，给耳朵的慰藉</span>
          </div> 
        </div>
      </div>
    </div>
    <!-- musicList -->
    <MusicList></MusicList>
  </div>
</template>

<script>
import MusicList from "../components/currency/musicList.vue"
export default{
  name:"songListDetails",
  components:{
    MusicList
  },
  setup(){

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
  background: red;
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
</style>