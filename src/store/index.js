import { createStore } from 'vuex'

export default createStore({
  state: {
    MusicNews:{}, // 音乐名称等信息
    currentState:false,// 当前列表菜单栏是否显示
    songList:JSON.parse(localStorage.getItem("currentListData"))||[], // 当前音乐列表
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
        const songListArr = [...payload,...state.songList]
        // 数组去重
        state.songList = Array.from(new Set(songListArr))
      }else{
        state.songList = [];
      }
      
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
    }
  }
})