<!-- 
  - @description 专辑列表
  - @author 龚箭
  - @since 2022/06/21
-->

<!-- 
  - @description 歌单列表
  - @author 龚箭
  - @since 2022/06/21
-->
<template>
  <div>
    <div class="albumItem" @click="handelClick(item)" v-for="(item) in albumList" :key="item.id">
      <div class="albumLeft">
        <div class="albumImg"><img :src="item.picUrl" alt="" ></div>
        <div class="albumName">{{item.name}}</div>
      </div>
      <div class="albumRight">{{item.InitArtists}}</div>
    </div>
  </div>
</template>

<script>
import {toRefs} from "vue";
import {useRouter} from "vue-router"
export default{
  name:"albumList",
  props:{
    albumList:{
      type:Array
    }
  },
  setup(props){
    /**全局上下文 */
    const router = useRouter()
    const {albumList} = toRefs(props)
    /**事件绑定 */
    const handelClick = (item)=>{
      // item.id = item.copyrightId
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
  color:#676767;
  font-size: 12px;
}
</style>
