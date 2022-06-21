<!-- 
  - @description 窗口布局-顶部布局
  - @author 龚箭
  - @since 2022/06/11
-->
<template>
    <!-- 顶部 -->
    <div class="headerContainer">
      <div class="headerLeft">
        <div class="LogoContainer" @click="inspectLogin"></div>
        <div class="historyContainer">
          <div @click="handelHistory('back')">
            <svg class="icon historyIcon backIcon" aria-hidden="true">
              <use xlink:href="#icon-qianjin"></use>
            </svg>
          </div>
          <div @click="handelHistory('next')">
            <svg class="icon historyIcon" aria-hidden="true">
              <use xlink:href="#icon-qianjin"></use>
            </svg>
          </div>
        </div>
        <!-- 搜索 -->
        <el-popover placement="bottom" :width="400" trigger="click">
          <template #reference>
            <div class="searchContainer">
              <div class="searchIcon">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-sousuo"></use>
                </svg>
              </div>
              <input type="text" class="searchInput" @input="handelSearch($event)"/>
            </div>
          </template>
          <!-- 热搜榜 -->
          <div class="searchHotList"  v-if="!recommendList.data.length">
            <div class="searchHot">热搜榜</div>
            <ul class="searchHotListContent">
              <li v-for="(item,index) in hostList.data" :key="index" @click="handelSearchDetails(item)">
                <div class="searchHotIndex" :class="{'selectedIndex':index>2}">{{index+1}}</div>
                <div class="searchHotLabel">{{item.first}}</div>
              </li>
            </ul>
          </div>
          <!-- 搜索推荐 -->
          <div class="searchHotList"  v-if="recommendList.data.length">
            <div v-for="(item,index) in recommendList.data" :key="index">
              <div class="searchHot">{{item.name}}</div>
                <ul class="searchHotListContent">
                  <li v-for="(musicItem,musicIndex) in item.data" :key="musicIndex">
                    <div class="searchHotLabel">{{musicItem.name}}</div>
                  </li>
                </ul>
            </div>
          </div>
          
        </el-popover>
        
      </div>

      <div class="operationContainer">
        <!-- 未登录 -->
        <div class="userInfoCenter" v-show="!userLoginState"  @click="handelLogin">
          <div class="userLogo">
            <svg class="icon userIcon" aria-hidden="true">
              <use xlink:href="#icon-yonghu"></use>
            </svg>
          </div>
          <div class="userName" >未登录</div>
          <div class="splitContent"></div>
        </div>
        <!-- 已登录用户操作模块 -->
        <el-popover placement="bottom" :width="280 " trigger="click">
          <template #reference>
            <div class="userInfoCenter" v-show="userLoginState">
              <div class="userLogo">
                <img :src="userInfo.data.profile.avatarUrl" alt="" >
              </div>
              <div class="userName">{{userInfo.data.profile.nickname}}</div>
              <div class="splitContent"></div>
            </div>
          </template>
          <div class="userOperation">
            <div class="userOperationBtn">
              <div class="userOperationContent" @click="handelLogout">
                <span>
                  <svg class="icon levelIcon" aria-hidden="true">
                    <use xlink:href="#icon-dengji"></use>
                  </svg>
                </span>
                <span>用户等级</span>
              </div>
              <div class="userLevel">Lv. {{userLevel.data.level}}</div>
            </div>

            <div class="userOperationBtn">
              <div class="userOperationContent" @click="handelLogout">
                <span>
                  <svg class="icon userOperationIcon" aria-hidden="true">
                    <use xlink:href="#icon-guanbi1"></use>
                  </svg>
                </span>
                <span>退出登录</span>
              </div>
            </div>
          </div>
        </el-popover>
        
        <!-- 视口操作 -->
        <div class="operationContent">
          <div class="operationBtn" @click="handelHideWindow">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zuixiaohua"></use>
            </svg>
          </div>
          <div class="operationBtn" @click="handelRestoreWindow" v-show="windowState">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-24gl-minimize2"></use>
            </svg>
          </div>
          <div class="operationBtn" @click="handelMaxWindow" v-show="!windowState">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-3zuidahua-1"></use>
            </svg>
          </div>
          <div class="operationBtn" @click="handelCloseWindow">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-guanbi"></use>
            </svg>
          </div>
        </div>
        
      </div>
    </div>
  
</template>

<script>
import {ref,reactive,watch,onMounted,getCurrentInstance} from "vue";
import {useRouter} from "vue-router";
import { useStore } from 'vuex';
const {ipcRenderer} = require("electron");
export default{
  name:"header",
  setup(){
    const {proxy} = getCurrentInstance();
    const $http = proxy.$http;
    const store = useStore()
    /**路由声明 */
    const route = useRouter()
    /**数据集合 */
    // 窗口图标变化状态
    const windowState = ref(false);
    // 用户信息
    const userInfo = reactive({
      data:{
        cookie:"",
        profile:{
          avatarUrl:"",
          nickname:""
        }
      }
    })
    // 用户等级
    const userLevel = reactive({
      data:{
        level:""
      }
    })
    // 用户登录状态
    const userLoginState = ref(false);
    // 热搜列表
    const hostList = reactive({data:{}})
    // 搜索推荐内容
    const recommendList =  reactive({data:[]})


    /**主线程监听 */
    // 监听隐藏按钮
    const handelHideWindow = ()=>{
      ipcRenderer.send("hideWindow","")
    }
    // 监听窗口最大化
    const handelMaxWindow = ()=>{
      ipcRenderer.send("maxWindow","")
    }
    // 监听还原窗口
    const handelRestoreWindow = ()=>{
      ipcRenderer.send("restoreWindow","")
    }
    // 监听关闭按钮
    const handelCloseWindow = ()=>{
      ipcRenderer.send("closeWindow","")
    }
    //监听窗口变化状态
    ipcRenderer.on("isMaxWindow",(event,arg)=>{
      windowState.value = arg
    })

    /**页面业务方法 */
    //监听路由前进后退
    const handelHistory = (type)=>{
      if(type === "back"){
        route.go(-1)
      }else{
        route.go(1)
      }
    }
    //登录接口主线程通信
    const handelLogin = ()=>{
      ipcRenderer.send("LoginBUS","")
    }
    // 登录信息监听
    ipcRenderer.on("mainUserInfo",function(e,data){
      userInfo.data = data;
      inspectLogin()
      getUserLevel()
    })
    // 检查登录状态
    const inspectLogin = async ()=>{
      let response = await proxy.$axios({
        method:'get',
        url:`${$http}/login/status`
      })
      if(response.data.data.profile){
        store.dispatch("setIsLogin",true)
        userInfo.data.profile = response.data.data.profile;
        getUserLevel()
      }else{
        store.dispatch("setIsLogin",false)
      }
    }
    // 获取用登录登录后的用户详细信息
    const getUserLevel =  async ()=>{
      const response = await proxy.$axios({
        method:"get",
        url:`${$http}/user/level`
      })
      if(response.data.code === 200){
        userLevel.data = response.data.data
      }
    }
    // 退出登录
    const handelLogout = async()=>{
      let response = await proxy.$axios({
        method:'get',
        url:`${$http}/logout`
      })
      if(response.data.code === 200){
        inspectLogin()
      }
    }
    // 获取热搜列表
    const getHotList = async ()=>{
      let response = await proxy.$axios({
        method:"get",
        url:`${$http}/search/hot`
      })
      hostList.data = response.data.result.hots
    }
    // 监听搜索框输入
    const handelSearch = proxy.$_.throttle(async (event)=>{
       // 表驱动编程
      let notesKeys = [
        {
          key:"songs",
          name:"单曲"
        },
        {
          key:"playlists",
          name:'歌单'
        },
        {
          key:"artists",
          name:"歌手"
        },
        {
          key:"albums",
          name:"专辑"
        }
      ]
      let response = await proxy.$axios({
        method:"get",
        url:`${$http}/search/suggest`,
        params:{
          keywords:event.target.value
        }
      })
      let res = response.data.result;
      let initData = [];
      for(let key in res){
        if(key !== "order"){
          let obj = {};
          notesKeys.forEach((item,index)=>{
            if(item.key === key){obj.name=item.name}
          })
          obj.data = res[key]
          initData.push(obj)
        }
        recommendList.data = initData
      } 
    },3000)
    // 点击搜索详情
    const handelSearchDetails = (item)=>{
      console.log(item)
      route.push({name:"searchDetails"})
    }

    watch(()=>store.getters.getIsLogin,(newValue)=>{
      userLoginState.value = newValue
    })
    
    
    // 页面加载时出发
    onMounted(()=>{
      inspectLogin()
      getHotList()
    })

    return{
      windowState,
      userInfo,
      userLevel,
      userLoginState,
      hostList,
      recommendList,
      handelHideWindow,
      handelMaxWindow,
      handelRestoreWindow,
      handelCloseWindow,
      handelHistory,
      handelLogin,
      handelLogout,
      inspectLogin,
      handelSearch,
      handelSearchDetails
    }
  }
}


</script>

<style scoped>
.icon{
  fill:#fff
}
.headerContainer{
  width: 100%;
  height: 60px;
  background: #ec4141;
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  -webkit-app-region: drag;
}
.headerLeft{
  width: 50%;
  display: flex;
  align-items: center;
}
/* 左logo */
.LogoContainer{
  width: 176px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background:url("../img/header/logo.png");
  background-position: 0px -6px !important;
  -webkit-app-region: no-drag;
}
/* 历史切换 */
.historyContainer{
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  -webkit-app-region: no-drag;
}
.historyContainer div{
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.historyIcon{
  fill:#fff;
  width: 14px;
  height: 14px;
}
.backIcon{
  transform: rotate(180deg);
}
/* 中间搜索框 */
.searchContainer{
  -webkit-app-region: no-drag;
  position: relative;
}
.searchIcon{
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  width: 23px;
  height: 23px;
  background: rgba(255,255,255,0.4);
  border-radius: 50%;
  text-align: center;
  line-height: 23px;
  
}
.searchInput{
  width: 160px;
  height: 34px;
  border: none;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  color:#fff;
  padding-left: 40px;

}
.searchInput:focus{
  outline:none
}
.searchHotList{
  height: 400px;
  overflow: auto;
}
.searchHot{
  font-size: 14px;
  color:#666666;
  padding:10px 20px;
}
.searchHotListContent{
  list-style: none;
}
.searchHotListContent li {
  padding: 10px 20px;
  display:flex;
  cursor: pointer;
  transition: background 0.25s;
}
.searchHotListContent li div{
  margin-right: 20px;
}
.searchHotIndex{
  font-size: 14px;
  color:#ff3d3d
}
.selectedIndex{
  color:#333
}
.searchHotLabel{
  color:#333333;  
  font-weight: 600;
}
.searchHotListContent li:nth-child(odd){
  background: #fff;
}
.searchHotListContent li:hover{
  background: #f3f3f3;
}



/* 右边操作栏 */
.operationContainer{
  display: flex;
  align-items: center;
  -webkit-app-region: no-drag;
}
.operationContent{
  display: flex;
}
.operationBtn{
  width: 20px;
  height: 20px;
  margin-left: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 用户信息 */
.userInfoCenter{
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 40px;
}
.userLogo{
  width: 30px;
  height: 30px;
  background: rgba(255,255,255,0.4);
  border-radius: 50%;
  line-height: 40px;
  overflow: hidden;
}
.userLogo img{
  width: 100%;
}
.userIcon{
  width: 24px;
  height: 24px;
}
.userName{
  font-size: 14px;
  color: #fff;
  margin-left: 6px;
}
.splitContent{
  width: 1px;
  height: 20px;
  background: #fff;
  opacity: 0.5;
  margin-left: 12px;
}
/* 登录状态下的用户操作 */
.userOperation{
  padding: 17px;
}
.userOperationBtn{
  padding: 14px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top:1px solid #eeeeee;
  cursor: pointer;
}
.userOperationContent{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userOperationContent span{
  display: block;
  color:#333333;
  font-size: 13px;
  margin-right: 6px;
  display: flex;
  align-items: center;
}
.userOperationIcon{
  width: 14px;
  height: 14px;
  fill:#333;
}
.userLevel{
  color:#999999;
  font-size: 12px;
}
.levelIcon{
  width: 14px;
  height: 18px;
  fill: #333;
}

</style>
