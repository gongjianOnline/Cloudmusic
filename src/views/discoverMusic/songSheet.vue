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

    <div class="Item">

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
  width: 100%;
  height: 230px;
  border-radius: 10px;
  padding: 0px 18px;
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
</style>
