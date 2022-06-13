<!-- 
  - @description 发现音乐--排行榜
  - @author 龚箭
  - @since 2022/06/13
-->
<template>
  <div class="rankingList-wrapper">
    <div class="rankingListTitle">官方榜</div>
    <!-- 官方推荐列表 -->
    <div class="officialListContainer" v-for="(item) in 3" :key="item">
      <div class="officialItemLogo">
        <div class="officialDate">06月12日更新</div>
        <div class="officialPlay">
          <svg class="icon playIcon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
        </div>
        <img src="/img/rankingList/itemImg.png" alt="" class="officialImg">
      </div>
      <div class="officialList">
        <ul>
          <li v-for="(item,index) in 5" :key="item">
            <div>
              <div class="officialItemIndex">{{index+1}}</div>
              <div class="officialItemRATIO">118%</div>
              <div class="officialItemTitle">人间萤火</div>
            </div>
            <div class="officialItemAuthor">夏日入侵企画</div>
          </li>
          <li class="officialMore">查看更多</li>
        </ul>
      </div>
    </div>


  </div>
</template>

<script>
export default{
  name:"rankingList",
  setup(){

  }
}
</script>
<style scoped>
.rankingList-wrapper{
  width: 816px;
  margin: 0 auto;
}
/* 标题 */
.rankingListTitle{
  font-size: 22px;
  font-weight: 600;
  color: #373737;
  text-align: left;
  margin-bottom: 18px;
}
/* 官方推荐 */
.officialListContainer{
  width: 100%;
  display: flex;
}
.officialItemLogo{
  width: 174px;
  height: 174px;
  border-radius: 10px;
  background: #3b77ae;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
.officialDate{
  color: #fff;
  font-size: 11px;
  position: absolute;
  bottom: 54px;
  left: 50%;
  transform: translateX(-50%);
}
.officialItemLogo .officialPlay{
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  opacity: 0;
  transition: opacity 0.25s;
}
.officialItemLogo:hover .officialPlay{
  opacity: 1;
}
.playIcon{
  fill: #ec4141;
  opacity: 0.5;
  width: 24px;
  height: 24px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.officialImg{
  width: 100%;
  height: 100%;
}
/* 右侧列表 */
.officialList{
  flex:1;
  margin-left: 35px;
}
.officialList>ul{
  list-style: none;
}
.officialList ul li {
  display: flex;
  justify-content: space-between;
  height: 36px;
  font-size: 12px;
  padding: 0px 12px;
  border-radius: 6px;
  cursor: pointer;
}
.officialList ul li:nth-child(odd){
	background: #f9f9f9;
}
.officialList ul li:nth-child(even){
	background: #ffffff;
}

.officialList ul li div{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
}
.officialItemIndex{
  margin-right: 10px;
  color: #ec4141;
}
.officialItemRATIO{
  margin-right: 10px;
  color: #9b9b9b;
}
.officialItemTitle{
  color: #363636;
}
.officialMore{
  margin-top: 11px;
  color: #676767;
  font-size: 13px;
  transition: color 0.25s;
}
.officialMore:hover{
  color: #363636;
}


</style>
