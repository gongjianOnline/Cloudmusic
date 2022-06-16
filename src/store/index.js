import { createStore } from 'vuex'

export default createStore({
  state: {
    MusicNews:{}, // 音乐名称等信息
    currentState:false,// 当前列表菜单栏是否显示
  },
  mutations: {
    mutations_MusicNews:(state,payload)=>{
      state.MusicNews = payload
    },
    mutations_currentState:(state,payload)=>{
      state.currentState = payload
    },
  
  },
  actions: {
    setMusicNews:(store,args)=>{
      store.commit("mutations_MusicNews",args)
    },
    setCurrentState:(store,args)=>{
      store.commit("mutations_currentState",args)
    },
    
  },
  getters: {
    getMusicNews:(state)=>{
      return state.MusicNews
    },
    getCurrentState:(state)=>{
      return state.currentState
    }
  }
})