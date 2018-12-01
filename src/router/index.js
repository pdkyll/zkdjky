import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/Layout'
import LayoutNoLeft from '@/components/layout/layoutNoLeft'
import Login from '@/pages/login/login'
import Home from '@/pages/home/home'
import publicInformation from '@/pages/publicInformation/publicInformation'
import attention from '@/pages/publicInformation/attention'
import management from '@/pages/publicInformation/management'
import pzlb from '@/pages/publicInformation/pzlb'
import pzlbmx from '@/pages/publicInformation/pzlbmx'
import dataLink from '@/pages/dataManagement/dataLink'
import joinUp from '@/pages/dataManagement/joinUp'
import moneyData from '@/pages/dataManagement/moneyData'
import moneyData1 from '@/pages/dataManagement/moneyData1'
import historyData from '@/pages/dataManagement/historyData'
import role from '@/pages/jurisdiction/role'
import user from '@/pages/jurisdiction/user'
import company from '@/pages/jurisdiction/company'
import department from '@/pages/jurisdiction/department'
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
    }
  ]
})
