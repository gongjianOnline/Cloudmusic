<template>
  <div>
    <div class="carousel">
      <Splide :options="options">
        <SplideSlide v-for="(item,index) in carouselList" :key="index">
          <img :src="item.url" class="carouselImg"/>
        </SplideSlide>
      </Splide>
      
      <!-- 推荐歌曲 -->
      <div class="moduleContainer">
        <div class="moduleTitle">推荐歌单</div>
        <div class="moduleList">
          <div class="moduleItem" v-for="item in 5" :key="item">
            <div class="moduleImgContent">
              <img src="/img/discoverMusic/item.png" alt="">
              <div class="moduleItemNumber">
                <span>405万</span>
              </div>
              
            </div>
            <div class="moduleItemTitle">每日歌曲推荐</div>
          </div>
        </div>
        <div class="moduleList">
          <div class="moduleItem" v-for="item in 5" :key="item">
            <div class="moduleImgContent">
              <img src="/img/discoverMusic/item.png" alt="">
              <div class="moduleItemNumber">405万</div>
            </div>
            <div class="moduleItemTitle">每日歌曲推荐</div>
          </div>
        </div>
      </div>



    </div>
    
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "recommend",
  setup() {
    // 轮播图片列表
    const carouselList = reactive([
      {
        url: "/img/discoverMusic/1.jpg",
      },
      {
        url: "/img/discoverMusic/2.jpg",
      },
      {
        url: "/img/discoverMusic/3.jpg",
      },
      {
        url: "/img/discoverMusic/4.jpg",
      },
      {
        url: "/img/discoverMusic/5.jpg",
      },
      {
        url: "/img/discoverMusic/6.jpg",
      },
      {
        url: "/img/discoverMusic/7.jpg",
      },
    ]);
    const options = reactive({
      type:'loop',
      width:"100%",
      heightRatio : 0.3,
      updateOnMove: true,
      type        : 'loop',
      focus       : 'center',
    })
    return {
      carouselList,
      options,
    };
  },
};
</script>
<style scoped>
.carousel{
  margin-top: 18px;
}
.carouselImg{
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
/* 模块单元 */
.moduleContainer{
  margin-top: 30px;
  margin-bottom: 30px;
  padding:0px 20px
}
.moduleTitle{
  font-size: 20px;
  font-weight: bold;
  color: #373737;
  text-align: left;
}
.moduleList{
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.moduleItem{
  width: 180px;
  text-align: left;
  margin-right: 20px;
  cursor: pointer;
  position: relative;
  transition: all 5s;
}
.moduleItem:after{
  content:"";
  position: absolute;
  right: 13px;
  bottom: 60px;
  width:40px;
  height: 40px;
  border-radius: 50%;
  opacity: 0;
  background-color: #e7e7e7;
  background-image: url("/img/discoverMusic/play.png");
  background-size: 100%;
  transition: all 0.25s;
}
.moduleItem:hover:after{
  opacity: 1;
}
.moduleImgContent{
  width: 180px;
  height: 180px;
  border-radius: 10px;
  background: #ccc;
  position: relative;
}
.moduleImgContent>img{
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.moduleItemNumber{
  position: absolute;
  right:10px;
  top: 10px;
  font-size: 15px;
  color: #fff;
}
.moduleItemTitle{
  margin-top: 13px;
  font-size: 19px;
  color:#373737;
}

/* 媒体查询 */
@media screen and (max-width:1270px){
  .moduleImgContent{
    width: 160px;
    height: 160px;
  }
  .moduleItem:after{
    width: 40px;
    height: 40px;
  }
}
@media screen and (max-width:1150px){
  .moduleImgContent{
    width: 140px;
    height: 140px;
  }
  .moduleItem:after{
    width: 32px;
    height: 32px;
  }
} 
</style>
