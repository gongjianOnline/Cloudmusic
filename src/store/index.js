import { createStore } from 'vuex'

export default createStore({
  state: {
    MusicInfo:{}, // 音乐URL信息
  },
  mutations: {
    mutations_MusicInfo:(state,payload)=>{
      state.MusicInfo = payload
    }
  },
  actions: {
    setMusicInfo:(store,args)=>{
      store.commit("mutations_MusicInfo",args)
    }
  },
  getters: {
    getMusicInfo:(state)=>{
      return state.MusicInfo
    }
  }
})