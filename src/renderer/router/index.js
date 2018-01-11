import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'installed-unity-list',
      component: require('@/pages/InstalledUnityList').default
    },
    {
      path: '/recently',
      name: 'recently-used-project-list',
      component: require('@/pages/RecentlyUsedProjectList').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
