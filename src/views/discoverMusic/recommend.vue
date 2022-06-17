<!-- 
  - @description 发现音乐--个性推荐
  - @author 龚箭
  - @since 2022/06/10
-->
<template>
  <div>
    <div class="carousel">
      <Splide :options="options">
        <SplideSlide v-for="(item) in carouselList" :key="item.encodeId">
          <img :src="item.imageUrl" class="carouselImg"/>
        </SplideSlide>
      </Splide>
      
      <!-- 推荐歌曲 -->
      <div class="moduleContainer">
        <div class="moduleTitle" @click="handelRoute('songSheet')">推荐歌单</div>
        <div class="moduleList">
          <!-- 今日推荐 -->
          <div class="moduleItem" v-show="isLogin">
            <div class="moduleImgContent">
              <img src="/img/discoverMusic/item.png" alt="">
              <div class="moduleImgDay">{{dayLabel}}</div>
            </div>
            <div class="moduleItemTitle">每日歌曲推荐</div>
          </div>
          <!-- 其他歌单 -->
          <div class="moduleItem" 
            v-for="(item) in personalizedlist" 
            :key="item.id"
            @click="handelModuleItem(item)">
            <div class="moduleImgContent">
              <img :src="item.picUrl" alt="">
              <div class="moduleItemNumber">
                <svg class="icon moduleItemIcon" aria-hidden="true">
                  <use xlink:href="#icon-24gl-play"></use>
                </svg>
                {{item.trackCount}}万
              </div>
            </div>
            <div class="moduleItemTitle">{{item.name}}</div>
          </div>
        </div>
      </div>



    </div>
    
  </div>
</template>

<script>
import { ref,reactive , getCurrentInstance,onMounted,watch} from "vue";
import { useRouter } from "vue-router"
import {useStore} from "vuex"
import dayjs from "dayjs"
export default {
  name: "recommend",
  setup() {
    // 获取全局上下文
    const {proxy} = getCurrentInstance()
    const $http = proxy.$http;
    const store = useStore();
    // 路由引入
    const router = useRouter();
    // 判断用户是否登录
    const isLogin = ref(false)
    // 轮播图片列表
    const carouselList = ref([]);
    const options = reactive({
      type:'loop',
      width:"100%",
      heightRatio : 0.3,
      updateOnMove: true,
      type        : 'loop',
      focus       : 'center',
    })
    // 推荐歌单列表
    const personalizedlist = ref([])
    // 获取歌单的URL（登录和游客URL不同）
    let resourceUrl = "personalized";
    // 获取日期
    const dayLabel = ref(dayjs(new Date()).format('DD'))

    /*事件方法 */
    // 跳转到歌单详情
    const handelModuleItem = (item)=>{
      router.push({name:'songListDetails',params:{item:JSON.stringify(item)}})
    }
    // 获取轮播banner
    const getCarouselList = async ()=>{
      let response = await proxy.$axios({
        method:'get',
        url:`${$http}/banner`,
        params:{
          type:0
        }
      })
      carouselList.value = response.data.banners;
    }
    // 获取歌单
    const getResourceList =async (field)=>{
      let response = await proxy.$axios({
        method:"get",
        url:`${$http}/${resourceUrl}`,
      })
      personalizedlist.value = response.data[field].splice(1,isLogin.value?7:8);
    }
    const handelRoute = (routerName)=>{
      router.push({name:routerName})
    }

    // 监听如果登录状态,已登录调用每日推荐歌单
    watch(()=>store.getters.getIsLogin,(newValue)=>{
      console.log("用户是否已登录watch",newValue)
      if(newValue){
        isLogin.value = true
        resourceUrl = "recommend/resource";
        getResourceList("recommend")
      }
    })



    onMounted(()=>{
      getResourceList("result")
      getCarouselList()
      // console.log("用户是否已登录",store.getters.getIsLogin)
    })
    return {
      carouselList,
      options,
      personalizedlist,
      isLogin,
      dayLabel,
      handelModuleItem,
      handelRoute
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
  width: 800px;
  margin: 0 auto;
  cursor: pointer;
}
.moduleList{
  margin-top: 20px;
  width: 800px;
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto;
}
.moduleItem{
  width: 160px;
  text-align: left;
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  position: relative;
  transition: all 5s;
}
.moduleImgContent{
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}
.moduleImgContent:hover:after{
   opacity: 1
}
.moduleImgContent:after{
  content:"";
  position: absolute;
  right: 10px;
  bottom: 10px;
  width:40px;
  height: 40px;
  border-radius: 50%;
  opacity: 0;
  background-color: #e7e7e7;
  background-image: url("/img/discoverMusic/play.png");
  background-size: 100%;
  transition: all 0.25s;
}
.moduleImgContent>img{
  height: 160px;
  border-radius: 10px;
}
.moduleImgDay{
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%);
  color: #fff;
  font-size: 24px;
}
.moduleItemIcon{
  fill:#fff;
  width: 15px;
  height: 15px;
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
  font-size: 14px;
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
    width: 160px;
  }
  .moduleImgDay{
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%);
  color: #fff;
  font-size: 24px;
}
  .moduleItem:after{
    width: 32px;
    height: 32px;
  }
} 
</style>
