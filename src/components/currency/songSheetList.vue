
<!-- 
  - @description 歌单列表
  - @author 龚箭
  - @since 2022/06/21
-->

<template>
  <div>
    <div class="albumItem" @click="handelClick(item)" v-for="(item) in songSheetList" :key="item.id">
      <div class="albumLeft">
        <div class="albumImg"><img :src="item.coverImgUrl" alt="" ></div>
        <div class="albumName">{{item.name}}</div>
      </div>
      <div class="albumRight">
        <div class="albumRightInfo">
          <div class="albumRightNumber">{{item.trackCount}}首</div>
          <div class="albumRightAuthor">{{item.creator.nickname}}</div>
        </div>
        <div class="albumRightPlayback">
          <span>
            <svg class="icon playbackIcon" aria-hidden="true">
              <use xlink:href="#icon-yunhang"></use>
            </svg>
          </span>
          <span>{{item.playCount}}万</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {toRefs} from "vue"
import {useRouter} from "vue-router"
export default{
  name:"albumList",
  props:{
    songSheetList:{
      type:Array
    }
  },
  setup(props){
    /**全局上下文 */
    const router = useRouter()
    const {songSheetList} = toRefs(props)
    /*事件绑定 */
    const handelClick = (item)=>{
      router.push({name:'songListDetails',params:{item:JSON.stringify(item)}})
    }
    return {
      handelClick
    }
  }
}
</script>

<style scoped>
.albumItem{
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 33px;
}
.albumItem:nth-child(even){
  background: #f9f9f9;
}
.albumItem>div{
  width: 50%;
  text-align: left;
}
.albumLeft{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.albumImg{
  width: 62px;
  height: 62px;
  border-radius: 10px;
  background: red;
  margin-right: 12px;
  overflow: hidden;
}
.albumImg img{
  width: 100%;
  height: 100%;
}
.albumName{
  font-size: 14px;
  color:#373737 
}
.albumRight{
  display: flex;
  justify-content: space-between;
}
.albumRightInfo{
  display: flex;
}
.albumRightNumber{
  color:#9f9f9f;
}
.albumRightAuthor{
  margin-left: 30px;
  color:#676767
}
.albumRight>div{
  width: 50%;
  font-size: 12px;
}
.albumRightPlayback{
  text-align: center;
  color:#9f9f9f;
  display: flex;
  justify-content: center;
  align-items: center;
}
.albumRightPlayback span{
  display: block;
  margin-left: 2px;
}
.playbackIcon{
  fill:#9f9f9f
}
</style>