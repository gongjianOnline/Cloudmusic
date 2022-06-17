<!-- 
  - @description 热门播客
  - @author 龚箭
  - @since 2022/06/17
-->
<template>
  <div>热门博客</div>
</template>

<script>
import {getCurrentInstance,onMounted} from "vue"
export default{
  name:"hotPodcast",
  setup(){
    /**获取全局上下文 */
    const {proxy} = getCurrentInstance();
    const $http = proxy.$http;

    /**事件声明 */
    const getPodcast = async ()=>{
      const response = await proxy.$axios({
        method:"get",
        url:`${$http}/personalized/djprogram`
      })
      console.log("获取博客",response)
    }


    onMounted(()=>{
      getPodcast()
    })
    
    return {

    }
  }
}
</script>

<style scoped>


</style>