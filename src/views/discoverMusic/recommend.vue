<template>
  <div>
    <div class="carousel">
      <Splide :options="options">
        <SplideSlide v-for="(item,index) in carouselList" :key="index">
          <img :src="item.url" class="carouselImg"/>
        </SplideSlide>
      </Splide>
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
</style>
