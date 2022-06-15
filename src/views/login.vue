<!-- 
  - @description 登录页面
  - @author 龚箭
  - @since 2022/06/15
-->
<template>
  <div class="loginWrapper">
    <div class="codeContainer">
      <div></div>
      <div class="closeContent" @click="handelLoginClose">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-guanbi"></use>
        </svg>
      </div>
    </div>
    <!-- 手机号登录 -->
    <div class="phoneContainer">
      <div class="bannerContainer">
        <img src="/img/login/banner.png" alt="">
      </div>
      <!-- 手机号表单 -->
      <div class="phoneFrom">
        <div class="phoneContent borderBottom relative">
          <div class="phoneLabel">
            <span>
              <svg class="icon phoneIcon" aria-hidden="true">
                <use xlink:href="#icon-shouji"></use>
              </svg>
            </span>
            <span>+86</span>
          </div>
          <input type="text" v-model="formData.phoneNumber" class="phoneInput">
        </div>
        <div class="phoneContent relative">
          <div class="resetBtn">重设密码</div>
          <input type="password"  v-model="formData.password" class="pwaInput">
        </div>
      </div>
      <div class="autoLoginContainer">
        <el-checkbox  v-model="formData.autoLogin" label="自动登录" size="large"/>
      </div>
      <div  class="loginBtn" @click="handelLogin">登录</div>
    </div>
    

  </div>
</template>
<script>
import {ref,reactive,getCurrentInstance} from "vue";
import { useStore } from 'vuex'
const {ipcRenderer} = require("electron");

export default{
  name:"login",
  setup(){
    /**全局上下文 */
    const {proxy} = getCurrentInstance();
    const $http = proxy.$http;
    const store = useStore()
    /**变量声明 */
    const formData = reactive({
      phoneNumber:"",
      password:"",
      autoLogin:true,
    })

    /*事件绑定*/
    // 关闭登录窗口
    const handelLoginClose = ()=>{
      ipcRenderer.send("LoginClose","")
    }
    // 登录事件
    const handelLogin = async ()=>{
      let response = await proxy.$axios({
        method:'get',
        url:`${$http}/login/cellphone`,
        params:{
          phone:formData.phoneNumber,
          password:formData.password
        }
      })
      ipcRenderer.send("userInfo",response.data)
    } 

    return {
      formData,
      handelLoginClose,
      handelLogin
    }


  }
}
</script>
<style scoped>
input:focus{
  outline: none;
}
.codeContainer{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 6px;
  -webkit-app-region: drag;
}
.closeContent{
  -webkit-app-region: no-drag;
}
.phoneContainer{
  width: 100%;
  padding:32px;
}
.bannerContainer{
  height: 116px;
  width: 100%;
}
.bannerContainer img{
  width: 100%;
}
/* 手机号登录表单 */
.phoneFrom{
  width: 100%;
  height: 82px;
  border:1px solid #d8d8d8;
  border-radius: 10px;
  margin-top: 20px;
}
.borderBottom{
  border-bottom: 1px solid #d8d8d8;
}
.phoneContent{
  width: 100%;
  height: 40px;
  padding: 2px 2px;
}
.phoneContent input{
  width: 100%;
  height: 100%;
  border: none;
}
.relative{
  position: relative;
}
.phoneLabel{
  position: absolute;
  left: 0px;
  top: 0px;
  width: 87px;
  height: 40px;
  border-right: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  color:#333333;
  font-size: 14px;
}
.phoneLabel span{
  margin-right: 6px;
}
.phoneInput{
  padding-left: 90px;
}
/* 重置密码 */
.resetBtn{
  position: absolute;
  right:0px;
  top: 0px;
  width: 87px;
  height: 40px;
  color:#b3b3b3;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #d9d9d9;
  cursor: pointer;
}
.pwaInput{
  padding-left: 12px;
}
/* 自动登录 */
.autoLoginContainer{
  text-align: left;
}
.loginBtn{
  width: 100%;
  height: 42px;
  border-radius: 6px;
  font-size:16px;
  color:#fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ea4848;
}
</style>