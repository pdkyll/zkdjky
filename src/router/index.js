import Vue from 'vue'
import Router from 'vue-router'
const Layout = () => import('@/components/layout/Layout')
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
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/login',
      children: [
        {
          path: 'publicInformation',
          name: 'publicInformation',
          component: publicInformation
        },
        {
          path: 'attention',
          name: 'attention',
          component: attention
        },
        {
          path: 'management',
          name: 'management',
          component: management
        },
        {
          path: 'newNorm',
          name: 'newNorm',
          component: newNorm
        },
        {
          path: 'dataLink',
          name: 'dataLink',
          component: dataLink
        },
        {
          path: 'joinUp',
          name: 'joinUp',
          component: joinUp
        },
        {
          path: 'role',
          name: 'role',
          component: role
        },
        {
          path: 'user',
          name: 'user',
          component: user
        },
        {
          path: 'company',
          name: 'company',
          component: company
        },
        {
          path: 'department',
          name: 'department',
          component: department
        },
        {
          path: 'moneyData',
          name: 'moneyData',
          component: moneyData
        },
        {
          path: 'moneyData1',
          name: 'moneyData1',
          component: moneyData1
        },
        {
          path: 'historyData',
          name: 'historyData',
          component: historyData
        },
        {
          path: 'pzlb',
          name: 'pzlb',
          component: pzlb
        },
        {
          path: 'pzlbmx',
          name: 'pzlbmx',
          component: pzlbmx
        }
      ]
    },
    {
      path: '/LayoutNoLeft',
      name: 'LayoutNoLeft',
      component: LayoutNoLeft,
      redirect: '/home',
      children: [
        {
          path: '/',
          name: 'publicInformation',
          component: publicInformation
        },
        {
          path: 'attention',
          name: 'attention',
          component: attention
        }
      ]
    },
    {
    	path:'/personCenter',
    	name:'personCenter',
    	component:personCenter
    }
  ]
})
