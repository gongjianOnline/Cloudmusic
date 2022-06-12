<template>
  <div class="songSheetWrapper">
    <!-- banner -->
    <div class="bannerContainer">
      <div class="groundGlass"></div>
      <div class="bannerImg">
        <img src="/img/songSheet/logo.png" alt="">
      </div>
      <div class="bannerContent">
        <div class="bannerTab">
          <span class="bannerIconContent">
            <svg class="icon bannerIcon" aria-hidden="true">
              <use xlink:href="#icon-wxbbiaowang"></use>
            </svg>
          </span>
          <span>精品歌单</span>
        </div>
        <div>可爱摇滚 | 一剂抵挡春困的上好良药</div>
      </div>
    </div>

    <div class="songSheetListContainer">
      <div class="songSheetListContent">
        <div class="songSheetItem" v-for="(item) in 12" :key="item">
          <div class="songSheetItemImg">
            <div class="songSheetHeader">
              <span>
                <svg class="icon songSheetIcon" aria-hidden="true">
                  <use xlink:href="#icon-24gl-play"></use>
                </svg>
              </span>
              <span>200万</span>
            </div>
            <img src="/img/songSheet/item.png" alt="">
            <div class="songSheetFooter">
              <span>
                <svg class="icon songSheetFooterIcon" aria-hidden="true">
                  <use xlink:href="#icon-yonghu"></use>
                </svg>
              </span>
              <span>伤感收留所</span>
            </div>
            <div class="playIconContainer">
              <svg class="icon playIcon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
              </svg>
            </div>
          </div>
          <div class="songSheetItemTitle">旋律控 | 超级好听的华语说唱</div>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
export default{
  name:"songSheet",
  setup(){

  }
}
</script>
<style scoped>
.bannerContainer{
  height: 230px;
  border-radius: 10px;
  padding: 0px 18px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-image: url("/img/songSheet/logo.png");
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  color: #f9fafa;
}
.groundGlass{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: 50%;
  background-color: rgba(0,0,0,0.4);
  backdrop-filter: blur(30px);
}
.bannerImg{
  width: 180px;
  height: 180px;
  border-radius: 10px;
  z-index: 2;
}
.bannerImg>img{
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.bannerContent{
  height: 180px;
  margin-left: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
  z-index: 2;
}
.bannerTab{
  border: 1px solid #e7aa5a;
  width: 126px;
  height: 38px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e7aa5a;
}
.bannerIconContent{
  margin-right: 4px;
}
.bannerTab>span{
  display: inline-block;
  height: 100%;
  display: flex;
  align-items: center;
}
.bannerIcon{
  fill:#e7aa5a;
  width: 24px;
  height: 24px;
}
/* 位移布局 */
.songSheetListContainer{
  width: 800px;
  margin: 0 auto;
  padding-top: 20px;
}
.songSheetListContent{
  display: flex;
  flex-wrap: wrap;
  transform: translateX(10px);
}
.songSheetItem{
  width: 180px;
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
}
.songSheetItemImg{
  position: relative;
  width: 180px;
  height: 180px;
  background: rgba(0,0,0,0.4);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
}
.songSheetHeader{
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ffffff;
  font-size: 12px;
}
.songSheetIcon{
  fill: #ffffff;
  width: 14px;
  height: 14px;
  margin-right: 2px;
}
.songSheetFooter{
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 14px;
  color: #ffffff;
}
.songSheetFooterIcon{
  width: 14px;
  height: 14px;
  margin-right: 2px;
}
/* 播放按钮 */
.songSheetItemImg .playIconContainer{
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 42px;
  height: 42px;
  background: #e8e8e8;
  border-radius: 50%;
  text-align: center;
  line-height: 42px;
  opacity: 0;
  transition: opacity 0.25s;
}
.songSheetItemImg:hover .playIconContainer{
  opacity: 1;
}


.playIcon{
  width: 18px;
  height: 18px;
  fill:#ec4141;
  transform: translate(1px,2px);
}

/* 菜单标题 */
.songSheetItemTitle{
  margin-top: 10px;
  font-size: 16px;
}
</style>
