import { createStore } from 'vuex'

export default createStore({
  state: {
    MusicNews:{}, // 音乐名称等信息
    userInfo: {},// 用户登录的基本信息
    accountInfo:{}, // 账号信息信息(用于自动登录)
  },
  mutations: {
    mutations_MusicNews:(state,payload)=>{
      state.MusicNews = payload
    },
    mutations_userInfo:(state,payload)=>{
      state.userInfo = payload
    },
    mutations_accountInfo:(state,payload)=>{
      state.accountInfo = payload
    }
  },
  actions: {
    setMusicNews:(store,args)=>{
      store.commit("mutations_MusicNews",args)
    },
    setUserInfo:(store,args)=>{
      store.commit("mutations_userInfo",args)
    },
    setAccountInfo:(store,args)=>{
      store.commit("mutations_accountInfo",args)
    }
  },
  getters: {
    getMusicNews:(state)=>{
      return state.MusicNews
    },
    getUserInfo:(state)=>{
      return state.userInfo
    },
    getAccountInfo:(state)=>{
      return state.accountInfo
    }
  }
})