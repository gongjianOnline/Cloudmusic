import { createStore } from 'vuex'

export default createStore({
  state: {
    MusicNews:{}, // 音乐名称等信息
  },
  mutations: {
    mutations_MusicNews:(state,payload)=>{
      state.MusicNews = payload
    }

  },
  actions: {
    setMusicNews:(store,args)=>{
      store.commit("mutations_MusicNews",args)
    }
  },
  getters: {
    getMusicNews:(state)=>{
      return state.MusicNews
    }
  }
})