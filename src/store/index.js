import { createStore } from 'vuex'
const removeDuplicateObj = (arr) => {
  let obj = {};
  arr = arr.reduce((newArr, next) => {
    obj[next.id] ? "" : (obj[next.id] = true && newArr.push(next));
    return newArr;
  }, []);
  return arr;
}
export default createStore({
  state: {
    MusicNews:{}, // 音乐名称等信息
    currentState:false,// 当前列表菜单栏是否显示
    songList:JSON.parse(localStorage.getItem("currentListData"))||[], // 当前音乐列表
    isLogin:false, // 用户登录状态
  },
  mutations: {
    mutations_MusicNews:(state,payload)=>{
      state.MusicNews = payload
    },
    mutations_currentState:(state,payload)=>{
      state.currentState = payload
    },
    mutations_songList:(state,payload)=>{
      if(payload){
        /**payload为数组 */
        const songListArr = [...payload,...(state.songList)]
        // 去重
        state.songList = removeDuplicateObj(songListArr)
      }else{
        state.songList = [];
      }
      
    },
    mutations_isLogin:(state,payload)=>{
      state.isLogin = payload;
    }
  },
  actions: {
    setMusicNews:(store,args)=>{
      store.commit("mutations_MusicNews",args)
    },
    setCurrentState:(store,args)=>{
      store.commit("mutations_currentState",args)
    },
    setSongList:(store,args)=>{
      store.commit("mutations_songList",args)
    },
    setIsLogin:(store,args)=>{
      store.commit("mutations_isLogin",args)
    }
  },
  getters: {
    getMusicNews:(state)=>{
      return state.MusicNews
    },
    getCurrentState:(state)=>{
      return state.currentState
    },
    getSongList:(state)=>{
      return state.songList
    },
    getIsLogin:(state)=>{
      return state.isLogin
    }
  }
})