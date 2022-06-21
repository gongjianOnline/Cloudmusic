<!-- 
  - @description 搜索详情
  - @author 龚箭
  - @since 2022/06/21
-->
<template>
  <div class="searchDetails-wrapper">
    <div class="searchTitle">搜索 Free Loop</div>
    <!-- 可能感兴趣 -->
    <div class="interestContainer">
      <div class="interestTitle">你可能感兴趣</div>
      <div class="interestWrapper">
        <div class="interestContent">
          <div class="interestImg"></div>
          <div class="interestInfo">
            <div class="interestInfoTitle">
              <span>歌手: </span>
              <span>Daniel Powter</span>
            </div>
            <div class="interestInfoContent">
              <span>粉丝:17万</span>
              <span class="spanLast">歌曲:291</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分类栏 -->
    <div class="classifyContainer">
      <div class="classifyContent">
        <div class="classifyItem">
          <span class="classifyName">单曲</span>
          <span class="classifyLine"></span>
        </div>
      </div>
      <div class="classifyRemarks">找到了300首单曲</div>
    </div>

    <!-- 操作按钮 -->
    <div class="operationContainer">
      <div>
        <div class="palyAllBtn">
          <span>
            <svg class="icon palyAllIcon" aria-hidden="true">
              <use xlink:href="#icon-bofang"></use>
            </svg>
          </span>
          <span class="palyAllText">播放全部</span>
          <span>
            <svg class="icon palyAllIcon" aria-hidden="true">
              <use xlink:href="#icon-jiahao"></use>
            </svg>
          </span>
        </div>
      </div>
    </div>

    <!-- 播放列表 -->
    <MusicList :dataList="dataList"></MusicList>


  </div>
</template>

<script>
import MusicList from "../components/currency/musicList.vue";
import {ref,reactive} from "vue"
export default {
  name:"searchDetails",
  components:{
    MusicList
  },
  setup(){
    /**变量声明 */
    // 播放列表数据集合
    const dataList = reactive({data:{}})



    return {
      dataList
    }
  }
}
</script>

<style scoped>
.searchDetails-wrapper{
  padding: 20px;
}
.searchTitle{
  font-size: 22px;
  font-weight: 600;
  color:#373737;
  text-align: left;
  margin-bottom: 26px;
}
/* 你可能感兴趣 */
.interestTitle{
  font-size: 14px;
  color:#676767;
  text-align: left;
  margin-bottom: 12px;
}
.interestWrapper{
  display: flex;
}
.interestContent{
  width: 295px;
  height: 68px;
  background:#f4f4f4;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding-left: 13px;
}
.interestImg{
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: red;
}
.interestInfo{
  margin-left: 10px;
}
.interestInfoTitle{
  font-size: 14px;
  color:#353535;
}
.interestInfoContent{
  font-size: 14px;
  color:#989898;
  margin-top: 8px;
}
.interestInfoContent span{
  display: inline-block;
}
.interestInfoContent .spanLast{
  margin-left: 10px;
}
/* 分类列表 */
.classifyContainer{
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
}
.classifyContent{
  display: flex;
}
.classifyItem{
  margin-right: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.classifyItem span{
  display: block;
}
.classifyName{
  font-size: 16px;
  font-weight: 600;
  color:#373737;
  margin-bottom: 4px;
}
.classifyLine{
  width: 26px;
  height: 4px;
  background: #ec4141;
}
.classifyRemarks{
  color:#9f9f9f;
  font-size: 13px;
}
/* 操作模块 */
.operationContainer{
  margin-top: 19px;
}
.palyAllBtn{
  width: 140px;
  height: 34px;
  background: #ec4141;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  cursor: pointer;
}
.palyAllBtn span{
  display: block;
  height: 100%;
  line-height: 34px;
}
.palyAllIcon{
  fill:#fff
}
.palyAllText{
  color:#fff
}
</style>