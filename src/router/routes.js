const routes = [
  {
      path: '/',
      name: 'views',
      title: '首页',
      component: () => import('../views/layout.vue'), 
      children:[
        {
          path: '/',
          name:"discoverMusic",
          title:"发现音乐",
          component: () => import('../views/discoverMusic.vue'), 
          children:[
            {
              path: '/',
              name:"recommend",
              title:"个性推荐",
              component: () => import('../views/discoverMusic/recommend.vue'), 
            },
            {
              path: '/discoverMusic/songSheet',
              name:"songSheet",
              title:"歌单",
              component: () => import('../views/discoverMusic/songSheet.vue'), 
            },
            {
              path: '/discoverMusic/rankingList',
              name:"rankingList",
              title:"排行榜",
              component: () => import('../views/discoverMusic/rankingList.vue'), 
            },
          ]
        },
        {
          path: '/dailySongList',
          name:"dailySongList",
          title:"每日歌单",
          component: () => import('../views/dailySongList.vue'), 
        },
        {
          path: '/newMusic',
          name:"newMusic",
          title:"推荐歌单",
          component: () => import('../views/newMusic.vue'), 
        },
        {
          path: '/privateFM',
          name:"privateFM",
          title:"私人FM",
          component: () => import('../views/privateFM.vue'), 
        }
      ]
  }
]
export default routes
