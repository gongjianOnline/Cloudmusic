const routes = [
  {
      path: '/',
      name: 'views',
      title: '首页',
      component: () => import('../views/layout.vue'), 
  }
]
export default routes
