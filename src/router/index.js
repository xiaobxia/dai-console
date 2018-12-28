import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

// 都有的路由
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: {
      auth: false
    }
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true,
    meta: {
      auth: false
    }
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'fas fa-home'
        }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/statistics',
    component: Layout,
    redirect: 'noredirect',
    name: 'Statistics',
    meta: {
      title: '统计',
      icon: 'far fa-chart-bar'
    },
    children: [
      {
        path: 'register',
        component: () => import('@/views/statistics/register'),
        name: 'StatisticsRegister',
        meta: { title: '注册统计' }
      },
      {
        path: 'loan',
        component: () => import('@/views/statistics/loan'),
        name: 'StatisticsLoan',
        meta: { title: '借款统计' }
      },
      {
        path: 'makeMoney',
        component: () => import('@/views/statistics/makeMoney'),
        name: 'StatisticsMakeMoney',
        meta: { title: '打款统计' }
      },
      {
        path: 'moneyBack',
        component: () => import('@/views/statistics/moneyBack'),
        name: 'StatisticsMoneyBack',
        meta: { title: '回款统计' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: 'noredirect',
    name: 'User',
    meta: {
      title: '用户管理',
      icon: 'fas fa-user'
    },
    children: [
      {
        path: 'manger',
        component: () => import('@/views/user/manger/index'),
        name: 'UserManger',
        redirect: 'noredirect',
        meta: { title: '用户管理' },
        children: [
          {
            path: 'userList',
            component: () => import('@/views/user/manger/userList'),
            name: 'UserUserList',
            meta: { title: '用户列表' }
          },
          {
            path: 'attestationList',
            component: () => import('@/views/user/manger/attestationList'),
            name: 'UserAttestationList',
            meta: { title: '认证列表' }
          },
          {
            path: 'blackList',
            component: () => import('@/views/user/manger/blackList'),
            name: 'UserBlackList',
            meta: { title: '黑名单列表' }
          },
          {
            path: 'bankList',
            component: () => import('@/views/user/manger/bankList'),
            name: 'UserBankList',
            meta: { title: '银行卡列表' }
          },
          {
            path: 'detail',
            component: () => import('@/views/user/manger/detail'),
            name: 'UserDetail',
            meta: { title: '用户详情' },
            hidden: true
          }
        ]
      },
      {
        path: 'quota',
        component: () => import('@/views/user/quota/index'),
        name: 'userQuota',
        redirect: 'noredirect',
        meta: { title: '额度管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/user/quota/list'),
            name: 'UserQuotaList',
            meta: { title: '额度列表' }
          },
          {
            path: 'auditing',
            component: () => import('@/views/user/quota/auditing'),
            name: 'UserQuotaAuditing',
            meta: { title: '额度审核列表' }
          }
        ]
      },
      {
        path: 'interest',
        component: () => import('@/views/user/interest/index'),
        name: 'UserInterest',
        redirect: 'noredirect',
        meta: { title: '利息管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/user/interest/list'),
            name: 'UserInterestList',
            meta: { title: '利息列表' }
          },
          {
            path: 'check',
            component: () => import('@/views/user/interest/check'),
            name: 'UserInterestCheck',
            meta: { title: '利息核对' }
          }
        ]
      }
    ]
  },
  {
    path: '/loan',
    component: Layout,
    redirect: 'noredirect',
    name: 'Loan',
    meta: {
      title: '借款管理',
      icon: 'fas fa-hand-holding-usd'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/loan/user/index'),
        name: 'LoanUser',
        redirect: 'noredirect',
        meta: { title: '用户借款管理' },
        children: [
          {
            path: 'loanList',
            component: () => import('@/views/loan/user/loanList'),
            name: 'LoadUserLoanList',
            meta: { title: '用户借款列表' }
          },
          {
            path: 'shouldRepaymentList',
            component: () => import('@/views/loan/user/shouldRepaymentList'),
            name: 'LoadUserShouldRepaymentList',
            meta: { title: '用户待还款列表' }
          },
          {
            path: 'hasRepaymentList',
            component: () => import('@/views/loan/user/hasRepaymentList'),
            name: 'LoadUserHasRepaymentList',
            meta: { title: '已还款列表' }
          },
          {
            path: 'overdueList',
            component: () => import('@/views/loan/user/overdueList'),
            name: 'LoadUserOverdueList',
            meta: { title: '逾期列表' }
          },
          {
            path: 'detail',
            component: () => import('@/views/loan/user/detail'),
            name: 'LoadUserDetail',
            meta: { title: '借款详情' },
            hidden: true
          }
        ]
      },
      {
        path: 'trial',
        component: () => import('@/views/loan/trial/index'),
        name: 'LoadTrial',
        redirect: 'noredirect',
        meta: { title: '信审管理' },
        children: [
          {
            path: 'shouldMachineList',
            component: () => import('@/views/loan/trial/shouldMachineList'),
            name: 'LoadTrialShouldMachineList',
            meta: { title: '待机审订单列表' }
          },
          {
            path: 'machineBackList',
            component: () => import('@/views/loan/trial/machineBackList'),
            name: 'LoadTrialMachineBackList',
            meta: { title: '机审被拒列表' }
          },
          {
            path: 'manList',
            component: () => import('@/views/loan/trial/manList'),
            name: 'LoadTrialManList',
            meta: { title: '人工审核' }
          }
        ]
      }
    ]
  },
  {
    path: '/operate',
    component: Layout,
    redirect: 'noredirect',
    name: 'Operate',
    meta: {
      title: '运营管理',
      icon: 'fas fa-laptop'
    },
    children: [
      {
        path: 'content',
        component: () => import('@/views/operate/content/index'),
        name: 'OperateContent',
        redirect: 'noredirect',
        meta: { title: '内容管理' },
        children: [
          {
            path: 'helpCenter',
            component: () => import('@/views/operate/content/helpCenter'),
            name: 'OperateContentHelpCenter',
            meta: { title: '帮助中心管理' }
          },
          {
            path: 'noticeCenter',
            component: () => import('@/views/operate/content/noticeCenter'),
            name: 'OperateContentNoticeCenter',
            meta: { title: '公告中心管理' }
          },
          {
            path: 'activity',
            component: () => import('@/views/operate/content/activity'),
            name: 'OperateContentActivity',
            meta: { title: '活动管理' }
          }
        ]
      },
      {
        path: 'collection',
        component: () => import('@/views/operate/collection/index'),
        name: 'OperateCollection',
        redirect: 'noredirect',
        meta: { title: '催收管理' },
        children: [
          {
            path: 'userAddressBook',
            component: () => import('@/views/operate/collection/userAddressBook'),
            name: 'OperateCollectionUserAddressBook',
            meta: { title: '用户通讯录' }
          },
          {
            path: 'shouldRepaymentList',
            component: () => import('@/views/operate/collection/shouldRepaymentList'),
            name: 'OperateCollectionShouldRepaymentList',
            meta: { title: '待还款列表' }
          },
          {
            path: 'overdueList',
            component: () => import('@/views/operate/collection/overdueList'),
            name: 'OperateCollectionOverdueList',
            meta: { title: '逾期列表' }
          }
        ]
      }
    ]
  },
  {
    path: '/risk',
    component: Layout,
    redirect: 'noredirect',
    name: 'Risk',
    meta: {
      title: '风控管理',
      icon: 'fas fa-shield-alt'
    },
    children: [
      {
        path: 'credit',
        component: () => import('@/views/risk/credit'),
        name: 'RiskCredit',
        meta: { title: '征信管理' }
      },
      {
        path: 'decision',
        component: () => import('@/views/risk/decision'),
        name: 'RiskDecision',
        meta: { title: '决策管理' }
      },
      {
        path: 'thirdParty',
        component: () => import('@/views/risk/thirdParty'),
        name: 'RiskDecisionThirdParty',
        meta: { title: '第三方统计' }
      }
    ]
  },
  {
    path: '/finance',
    component: Layout,
    redirect: 'noredirect',
    name: 'Finance',
    meta: {
      title: '财务管理',
      icon: 'fas fa-money-check'
    },
    children: [
      {
        path: 'makeMoney',
        component: () => import('@/views/finance/makeMoney/index'),
        name: 'FinanceMakeMoney',
        redirect: 'noredirect',
        meta: { title: '打款管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/finance/makeMoney/list'),
            name: 'FinanceMakeMoneyList',
            meta: { title: '打款列表' }
          },
          {
            path: 'dayToDay',
            component: () => import('@/views/finance/makeMoney/dayToDay'),
            name: 'FinanceMakeMoneyDayToDay',
            meta: { title: '打款流水列表' }
          },
          {
            path: 'detail',
            component: () => import('@/views/finance/makeMoney/detail'),
            name: 'FinanceMakeMoneyDetail',
            meta: { title: '打款详情' },
            hidden: true
          },
          {
            path: 'payDetail',
            component: () => import('@/views/finance/makeMoney/payDetail'),
            name: 'FinanceMakeMoneyPayDetail',
            meta: { title: '付款详情' },
            hidden: true
          }
        ]
      },
      {
        path: 'cutMoney',
        component: () => import('@/views/finance/cutMoney/index'),
        name: 'FinanceCutMoney',
        redirect: 'noredirect',
        meta: { title: '扣款管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/finance/cutMoney/list'),
            name: 'FinanceCutMoneyList',
            meta: { title: '扣款列表' }
          },
          {
            path: 'dayToDay',
            component: () => import('@/views/finance/cutMoney/dayToDay'),
            name: 'FinanceCutMoneyDayToDay',
            meta: { title: '扣款流水列表' }
          }
        ]
      },
      {
        path: 'moneyBack',
        component: () => import('@/views/finance/moneyBack/index'),
        name: 'FinanceMoneyBack',
        redirect: 'noredirect',
        meta: { title: '回款管理' },
        children: [
          {
            path: 'shouldList',
            component: () => import('@/views/finance/moneyBack/shouldList'),
            name: 'FinanceMoneyBackShouldList',
            meta: { title: '待回款列表' }
          },
          {
            path: 'overdueList',
            component: () => import('@/views/finance/moneyBack/overdueList'),
            name: 'FinanceMoneyBackOverdueList',
            meta: { title: '逾期列表' }
          }
        ]
      },
      {
        path: 'thirdParty',
        component: () => import('@/views/finance/thirdParty/index'),
        name: 'FinanceThirdParty',
        redirect: 'noredirect',
        meta: { title: '第三方费用管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/finance/thirdParty/list'),
            name: 'FinanceThirdPartyList',
            meta: { title: '第三方接入统计' }
          },
          {
            path: 'cost',
            component: () => import('@/views/finance/thirdParty/cost'),
            name: 'FinanceThirdPartyCost',
            meta: { title: '第三方运营成本统计' }
          }
        ]
      }
    ]
  },
  {
    path: '/channel',
    component: Layout,
    redirect: 'noredirect',
    name: 'Channel',
    meta: {
      title: '渠道管理',
      icon: 'fas fa-handshake'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/channel/list'),
        name: 'ChannelList',
        meta: { title: '渠道列表' }
      },
      {
        path: 'spread',
        component: () => import('@/views/channel/spread'),
        name: 'ChannelSpread',
        meta: { title: '渠道推广' }
      },
      {
        path: 'detail',
        component: () => import('@/views/channel/detail'),
        name: 'ChannelDetail',
        meta: { title: '渠道明细统计' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: 'noredirect',
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'fab fa-windows'
    },
    children: [
      {
        path: 'auth',
        component: () => import('@/views/system/auth/index'),
        name: 'SystemAuth',
        redirect: 'noredirect',
        meta: { title: '权限管理' },
        children: [
          {
            path: 'user',
            component: () => import('@/views/system/auth/user'),
            name: 'SystemAuthUser',
            meta: { title: '管理员列表' }
          },
          {
            path: 'role',
            component: () => import('@/views/system/auth/role'),
            name: 'SystemAuthRole',
            meta: { title: '角色列表' }
          },
          {
            path: 'menu',
            component: () => import('@/views/system/auth/menu'),
            name: 'SystemAuthMenu',
            meta: { title: '菜单列表' }
          },
          {
            path: 'menuButton',
            component: () => import('@/views/system/auth/menuButton'),
            name: 'SystemAuthMenuButton',
            meta: { title: '菜单按钮列表' }
          }
        ]
      },
      {
        path: 'config',
        component: () => import('@/views/system/config/index'),
        name: 'SystemConfig',
        redirect: 'noredirect',
        meta: { title: '全局配置管理' },
        children: [
          {
            path: 'dictionary',
            component: () => import('@/views/system/config/dictionary'),
            name: 'SystemDictionary',
            meta: { title: '字典配置' }
          },
          {
            path: 'global',
            component: () => import('@/views/system/config/global'),
            name: 'SystemGlobal',
            meta: { title: '全局配置' }
          }
        ]
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
