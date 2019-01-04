import Vue from 'vue'
import Router from 'vue-router'
/*const Layout = () => import('@/components/layout/Layout')
const LayoutNoLeft = () => import('@/components/layout/layoutNoLeft')
const Login = () => import('@/pages/login/login')
const Home = () => import('@/pages/home/home')
const publicInformation = () => import('@/pages/publicInformation/publicInformation')
const attention = () => import('@/pages/publicInformation/attention')
const management = () => import('@/pages/publicInformation/management')
const newNorm = () => import('@/pages/publicInformation/newNorm')
const pzlb = () => import('@/pages/publicInformation/pzlb')
const pzlbmx = () => import('@/pages/publicInformation/pzlbmx')
const dataLink = () => import('@/pages/dataManagement/dataLink')
const joinUp = () => import('@/pages/dataManagement/joinUp')
const moneyData = () => import('@/pages/dataManagement/moneyData')
const moneyData1 = () => import('@/pages/dataManagement/moneyData1')
const historyData = () => import('@/pages/dataManagement/historyData')
const role = () => import('@/pages/jurisdiction/role')
const user = () => import('@/pages/jurisdiction/user')
const company = () => import('@/pages/jurisdiction/company')
const department = () => import('@/pages/jurisdiction/department')
const personCenter = () => import('@/pages/publicInformation/personCenter')       //  个人中心 12、19 gxb
// 正在建设中
const developing = () => import('@/components/public/developing')*/
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component:  resolve => require(['@/pages/login/login'],resolve)
    },
    {
      path: '/home',
      name: 'Home',
      component:  resolve => require(['@/pages/home/home'],resolve)
    },
    {
      path: '/',
      component:  resolve => require(['@/components/layout/Layout'],resolve),
      redirect: '/login',
      children: [
        {
          path: 'publicInformation',
          redirect: {
            name: 'publicInformation'
          },
          component:  resolve => require(['@/pages/publicInformation/publicInformation'],resolve)
        },
        {
          path: 'attention',
          redirect: {
            name: 'attention'
          },

          component:  resolve => require(['@/pages/publicInformation/attention'],resolve)
        },
        {
          path: 'management',
          name: 'management',
          component:  resolve => require(['@/pages/publicInformation/management'],resolve)
        },
        {
          path: 'newNorm',
          name: 'newNorm',
          component:  resolve => require(['@/pages/publicInformation/newNorm'],resolve)
        },
        {
          path: 'dataLink',
          name: 'dataLink',
          component:  resolve => require(['@/pages/dataManagement/dataLink'],resolve)
        },
        {
          path: 'joinUp',
          name: 'joinUp',
          component:  resolve => require(['@/pages/dataManagement/joinUp'],resolve)
        },
        {
          path: 'role',
          name: 'role',
          component:  resolve => require(['@/pages/jurisdiction/role'],resolve)
        },
        {
          path: 'user',
          name: 'user',
          component:  resolve => require(['@/pages/jurisdiction/user'],resolve)
        },
        {
          path: 'company',
          name: 'company',
          component:  resolve => require(['@/pages/jurisdiction/company'],resolve)
        },
        {
          path: 'department',
          name: 'department',
          component:  resolve => require(['@/pages/jurisdiction/department'],resolve)
        },
        {
          path: 'moneyData',
          name: 'moneyData',
          component:  resolve => require(['@/pages/dataManagement/moneyData'],resolve)
        },
        {
          path: 'moneyData1',
          name: 'moneyData1',
          component:  resolve => require(['@/pages/dataManagement/moneyData1'],resolve)
        },
        {
          path: 'historyData',
          name: 'historyData',
          component:  resolve => require(['@/pages/dataManagement/historyData'],resolve)
        },
        {
          path: 'pzlb',
          name: 'pzlb',
          component:  resolve => require(['@/pages/publicInformation/pzlb'],resolve)
        },
        {
          path: 'pzlbmx',
          name: 'pzlbmx',
          component:  resolve => require(['@/pages/publicInformation/pzlbmx'],resolve)
        },
        {
          path: 'developing',
          name: 'developing',
          component:  resolve => require(['@/components/public/developing'],resolve)
        }
      ]
    },
    {
      path: '/LayoutNoLeft',
      name: 'LayoutNoLeft',
      component:  resolve => require(['@/components/layout/layoutNoLeft'],resolve),
      redirect: '/home',
      children: [
        {
          path: '/',
          name: 'publicInformation',
          component:  resolve => require(['@/pages/publicInformation/publicInformation'],resolve)
        },
        {
          path: 'attention',
          name: 'attention',
          component:  resolve => require(['@/pages/publicInformation/attention'],resolve)
        }
      ]
    },
    {
    	path:'/personCenter',
    	name:'personCenter',
      component:  resolve => require(['@/pages/publicInformation/personCenter'],resolve)
    }
  ]
})
