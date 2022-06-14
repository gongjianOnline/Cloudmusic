import { createStore } from 'vuex'

export default createStore({
  state: {
    MusicInfo:{}, // 音乐URL信息
    MusicNews:{}, // 音乐名称等信息
  },
  mutations: {
    mutations_MusicInfo:(state,payload)=>{
      state.MusicInfo = payload
    },
    mutations_MusicNews:(state,payload)=>{
      state.MusicNews = payload
    }

  },
  actions: {
    setMusicInfo:(store,args)=>{
      store.commit("mutations_MusicInfo",args)
    },
    setMusicNews:(store,args)=>{
      store.commit("mutations_MusicNews",args)
    }
  },
  getters: {
    getMusicInfo:(state)=>{
      return state.MusicInfo
    },
    getMusicNews:(state)=>{
      return state.MusicNews
    }
  }
})