
<!-- 
  - @description 发现音乐--歌单
  - @author 龚箭
  - @since 2022/06/12
-->
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
    <!-- 分类列表 -->
    <div class="typeContainer">
      <!-- 左侧扩展标签 -->
      <el-popover 
        placement="bottom" 
        :width="600" 
        trigger="click">
        <template #reference>
          <div class="buttonType">全部歌单</div>
        </template>
        <div class="typeExtendContainer">
          <div class="typeExtendItem" 
            v-for="(item,index) in songSheetTypeList"
            :key="index">
            <div class="typeExtendClass">{{item.type}}</div>
            <div class="typeExtendTypeContent">
              <span
                @click="handleType(itemType.name)" 
                v-for="(itemType,indexType) in item.childType"
                :key="indexType">{{itemType.name}}</span>
            </div>
          </div>
        </div>
      </el-popover>
      <!-- 右侧固定标签 -->
      <div class="typeList">
        <span @click="handleType('华语')">华语</span>
        <span @click="handleType('流行')">流行</span>
        <span @click="handleType('摇滚')">摇滚</span>
        <span @click="handleType('民谣')">民谣</span>
        <span @click="handleType('电子')">电子</span>
        <span @click="handleType('另类/独立')">另类/独立</span>
        <span @click="handleType('轻音乐')">轻音乐</span>
        <span @click="handleType('综艺')">综艺</span>
        <span @click="handleType('影视原声')">影视原声</span>
        <span @click="handleType('ACG')">ACG</span>
      </div>
    </div>


    <!-- 歌单列表 -->
    <div class="songSheetListContainer">
      <div class="songSheetListContent">
        <div class="songSheetItem"
          v-for="(item) in songSheetList" 
          :key="item.id">
          <div class="songSheetItemImg">
            <div class="songSheetHeader">
              <span>
                <svg class="icon songSheetIcon" aria-hidden="true">
                  <use xlink:href="#icon-24gl-play"></use>
                </svg>
              </span>
              <span>{{item.subscribedCount}}</span>
            </div>
            <img :src="item.coverImgUrl" alt="">
            <div class="songSheetFooter">
              <span>
                <svg class="icon songSheetFooterIcon" aria-hidden="true">
                  <use xlink:href="#icon-yonghu"></use>
                </svg>
              </span>
              <span>{{item.creator.nickname}}</span>
            </div>
            <div class="playIconContainer">
              <svg class="icon playIcon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
              </svg>
            </div>
          </div>
          <div class="songSheetItemTitle">{{item.name}}</div>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
import { ref,reactive , getCurrentInstance,onMounted } from "vue";
export default{
  name:"songSheet",
  setup(){
    // 获取全局上下文
    const {proxy} = getCurrentInstance()
    const $http = proxy.$http;
    // 声明歌单列表
    const songSheetList = ref([]);
    // 声明歌单类型 
    const songSheetTypeList = reactive([])
    // 获取歌单列表
    const getSongSheetList = async (type)=>{
      let response = await proxy.$axios({
        method:"get",
        url:`${$http}/top/playlist`,
        params:{
          cat:type || "全部",
          limit:20
        }
      })
      songSheetList.value = response.data.playlists;
    }
    // 获取歌单类型
    const getSongTypeList = async ()=>{
      let response = await proxy.$axios({
        method:"get",
        url:`${$http}/playlist/catlist/`
      })
      let {categories,sub} = response.data;
      for(let key in categories){
        songSheetTypeList.push({
          type:categories[key],
          category:key,
          childType:[]
        })
      }
      sub.forEach((item,index)=>{
        songSheetTypeList.forEach((itemType,indexType)=>{
          if(item.category == itemType.category){
            itemType.childType.push(item)
          }
        })
      })
    }
    // 切换菜单 
    const handleType = (type)=>{
      getSongSheetList(type)
    }

    onMounted(()=>{
      getSongSheetList()
      getSongTypeList()
    })

    return{
      songSheetList,
      songSheetTypeList,
      handleType,
    }

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

/* 分类列表 */
.typeContainer{
  width: 100%;
  height: 30px;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
}
.typeExtendContainer{
  width:100%;
  height: 400px;
  overflow: auto;
  font-size: 14px;
}
.typeExtendItem{
  display: flex;
}
.typeExtendClass{
  width:20%;
  text-align: center;
  padding-top: 20px;
  color: #cfcfcf ;

}
.typeExtendTypeContent{
  width:80%;
  display: flex;
  flex-wrap: wrap;
}
.typeExtendTypeContent span{
  display:block;
  margin: 20px;
  cursor: pointer;
  color:#373737;
}
.buttonType{
  width: 103px;
  height: 30px;
  border:1px solid #d8d8d8;
  line-height: 30px;
  border-radius: 20px;
  cursor: pointer;
}
.typeList span{
  display: inline-block;
  height: 30px;
  margin-right: 22px;
  font-size: 14px;
  color:#676767;
  line-height: 30px;
  cursor: pointer;
  transition: color 0.25s;
}
.typeList span:hover{
  color:#5a5a5a
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
  overflow: hidden;
}
.songSheetItemImg img{
  width: 100%;
  height: 100%;
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
