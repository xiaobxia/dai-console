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
        component: () => import('@/views/redirect/index'),
        meta: {
          allHas: true
        }
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
      allHas: true,
      auth: false
    }
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true,
    meta: {
      allHas: true
    }
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true,
    meta: {
      allHas: true
    }
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
          allHas: true,
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

// isLeaf:1目录，2菜单，link:后端配置的link
export const asyncRouterMap = [
  {
    path: '/statistics',
    component: Layout,
    redirect: 'noredirect',
    name: 'Statistics',
    meta: {
      title: '统计',
      icon: 'far fa-chart-bar',
      isLeaf: 1,
      link: '/statistics'
    },
    children: [
      {
        path: 'register',
        component: () => import('@/views/statistics/register'),
        name: 'StatisticsRegister',
        meta: {
          title: '注册统计',
          isLeaf: 2,
          link: '/statistics/register'
        }
      },
      {
        path: 'loan',
        component: () => import('@/views/statistics/loan'),
        name: 'StatisticsLoan',
        meta: {
          title: '借款统计',
          isLeaf: 2,
          link: '/statistics/loan'
        }
      },
      {
        path: 'makeMoney',
        component: () => import('@/views/statistics/makeMoney'),
        name: 'StatisticsMakeMoney',
        meta: {
          title: '打款统计',
          isLeaf: 2,
          link: '/statistics/makeMoney'
        }
      },
      {
        path: 'moneyBack',
        component: () => import('@/views/statistics/moneyBack'),
        name: 'StatisticsMoneyBack',
        meta: {
          title: '回款统计',
          isLeaf: 2,
          link: '/statistics/moneyBack'
        }
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
      icon: 'fas fa-user',
      isLeaf: 1,
      link: '/user'
    },
    children: [
      {
        path: 'manger',
        component: () => import('@/views/user/manger/index'),
        name: 'UserManger',
        redirect: 'noredirect',
        meta: {
          title: '用户管理',
          isLeaf: 1,
          link: '/user/manger'
        },
        children: [
          {
            path: 'userList',
            component: () => import('@/views/user/manger/userList'),
            name: 'UserUserList',
            meta: {
              title: '用户列表',
              isLeaf: 2,
              link: '/user/manger/userList'
            }
          },
          {
            path: 'attestationList',
            component: () => import('@/views/user/manger/attestationList'),
            name: 'UserAttestationList',
            meta: {
              title: '认证列表',
              isLeaf: 2,
              link: '/user/manger/attestationList'
            }
          },
          {
            path: 'blackList',
            component: () => import('@/views/user/manger/blackList'),
            name: 'UserBlackList',
            meta: {
              title: '黑名单列表',
              isLeaf: 2,
              link: '/user/manger/blackList'
            }
          },
          {
            path: 'bankList',
            component: () => import('@/views/user/manger/bankList'),
            name: 'UserBankList',
            meta: {
              title: '银行卡列表',
              isLeaf: 2,
              link: '/user/manger/bankList'
            }
          },
          {
            path: 'detail',
            component: () => import('@/views/user/manger/detail'),
            name: 'UserDetail',
            meta: {
              title: '用户详情',
              isLeaf: 2,
              link: '/user/manger/detail'
            },
            hidden: true
          }
        ]
      },
      {
        path: 'quota',
        component: () => import('@/views/user/quota/index'),
        name: 'UserQuota',
        redirect: 'noredirect',
        meta: {
          title: '额度管理',
          isLeaf: 1,
          link: '/user/quota'
        },
        children: [
          {
            path: 'list',
            component: () => import('@/views/user/quota/list'),
            name: 'UserQuotaList',
            meta: {
              title: '额度列表',
              isLeaf: 2,
              link: '/user/quota/list'
            }
          },
          {
            path: 'dayToDayList',
            component: () => import('@/views/user/quota/dayToDayList'),
            name: 'UserQuotaDayToDayList',
            meta: {
              title: '用户额度流水',
              isLeaf: 2,
              link: '/user/quota/dayToDayList'
            }
          },
          {
            path: 'auditing',
            component: () => import('@/views/user/quota/auditing'),
            name: 'UserQuotaAuditing',
            meta: {
              title: '额度审核列表',
              isLeaf: 2,
              link: '/user/quota/auditing'
            }
          }
        ]
      },
      {
        path: 'interest',
        component: () => import('@/views/user/interest/index'),
        name: 'UserInterest',
        redirect: 'noredirect',
        meta: {
          title: '利息管理',
          isLeaf: 1,
          link: '/user/interest'
        },
        children: [
          {
            path: 'list',
            component: () => import('@/views/user/interest/list'),
            name: 'UserInterestList',
            meta: {
              title: '利息列表',
              isLeaf: 2,
              link: '/user/interest/list'
            }
          },
          {
            path: 'check',
            component: () => import('@/views/user/interest/check'),
            name: 'UserInterestCheck',
            meta: {
              title: '利息核对',
              isLeaf: 2,
              link: '/user/interest/check'
            }
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
      icon: 'fas fa-hand-holding-usd',
      isLeaf: 1,
      link: '/loan'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/loan/user/index'),
        name: 'LoanUser',
        redirect: 'noredirect',
        meta: {
          title: '用户借款管理',
          isLeaf: 1,
          link: '/loan/user'
        },
        children: [
          {
            path: 'loanList',
            component: () => import('@/views/loan/user/loanList'),
            name: 'LoadUserLoanList',
            meta: {
              title: '用户借款列表',
              isLeaf: 2,
              link: '/loan/user/loanList'
            }
          },
          {
            path: 'shouldRepaymentList',
            component: () => import('@/views/loan/user/shouldRepaymentList'),
            name: 'LoadUserShouldRepaymentList',
            meta: {
              title: '用户待还款列表',
              isLeaf: 2,
              link: '/loan/user/shouldRepaymentList'
            }
          },
          {
            path: 'hasRepaymentList',
            component: () => import('@/views/loan/user/hasRepaymentList'),
            name: 'LoadUserHasRepaymentList',
            meta: {
              title: '已还款列表',
              isLeaf: 2,
              link: '/loan/user/hasRepaymentList'
            }
          },
          {
            path: 'repaymentList',
            component: () => import('@/views/loan/user/repaymentList'),
            name: 'LoadUserRepaymentList',
            meta: {
              title: '还款记录列表',
              isLeaf: 2,
              link: '/loan/user/repaymentList'
            }
          },
          {
            path: 'overdueList',
            component: () => import('@/views/loan/user/overdueList'),
            name: 'LoadUserOverdueList',
            meta: {
              title: '逾期列表',
              isLeaf: 2,
              link: '/loan/user/overdueList'
            }
          },
          {
            path: 'detail',
            component: () => import('@/views/loan/user/detail'),
            name: 'LoadUserDetail',
            meta: {
              title: '借款详情',
              isLeaf: 2,
              link: '/loan/user/detail'
            },
            hidden: true
          }
        ]
      },
      {
        path: 'trial',
        component: () => import('@/views/loan/trial/index'),
        name: 'LoadTrial',
        redirect: 'noredirect',
        meta: {
          title: '信审管理',
          isLeaf: 1,
          link: '/loan/trial'
        },
        children: [
          {
            path: 'shouldMachineList',
            component: () => import('@/views/loan/trial/shouldMachineList'),
            name: 'LoadTrialShouldMachineList',
            meta: {
              title: '待机审订单列表',
              isLeaf: 2,
              link: '/loan/trial/shouldMachineList'
            }
          },
          {
            path: 'machineBackList',
            component: () => import('@/views/loan/trial/machineBackList'),
            name: 'LoadTrialMachineBackList',
            meta: {
              title: '机审被拒列表',
              isLeaf: 2,
              link: '/loan/trial/machineBackList'
            }
          },
          {
            path: 'manList',
            component: () => import('@/views/loan/trial/manList'),
            name: 'LoadTrialManList',
            meta: {
              title: '人工审核',
              isLeaf: 2,
              link: '/loan/trial/manList'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/collection',
    component: Layout,
    redirect: 'noredirect',
    name: 'Collection',
    meta: {
      title: '催收管理',
      isLeaf: 1,
      link: '/collection',
      icon: 'fas fa-phone'
    },
    children: [
      {
        path: 'toBeAllocatedList',
        component: () => import('@/views/collection/toBeAllocatedList'),
        name: 'CollectionToBeAllocatedList',
        meta: {
          title: '待分配列表',
          isLeaf: 2,
          link: '/collection/toBeAllocatedList'
        }
      },
      {
        path: 'myOrder',
        component: () => import('@/views/collection/myOrder'),
        name: 'CollectionMyOrder',
        meta: {
          title: '我的订单',
          isLeaf: 2,
          link: '/collection/myOrder'
        }
      },
      {
        path: 'userAddressBook',
        component: () => import('@/views/collection/userAddressBook'),
        name: 'CollectionUserAddressBook',
        hidden: true,
        meta: {
          title: '用户通讯录',
          isLeaf: 2,
          link: '/collection/myOrder'
        }
      },
      {
        path: 'allotRecordList',
        component: () => import('@/views/collection/allotRecordList'),
        name: 'CollectionAllotRecordList',
        meta: {
          title: '订单分配记录',
          isLeaf: 2,
          link: '/collection/allotRecordList'
        }
      },
      {
        path: 'collectionList',
        component: () => import('@/views/collection/collectionList'),
        name: 'CollectionCollectionList',
        meta: {
          title: '我的催收记录',
          isLeaf: 2,
          link: '/collection/collectionList'
        }
      },
      {
        path: 'successRecordList',
        component: () => import('@/views/collection/successRecordList'),
        name: 'CollectionSuccessRecordList',
        meta: {
          title: '催收成功列表',
          isLeaf: 2,
          link: '/collection/successRecordList'
        }
      },
      {
        path: 'replyRecordList',
        component: () => import('@/views/collection/replyRecordList'),
        name: 'CollectionReplyRecordList',
        meta: {
          title: '用户还款记录',
          isLeaf: 2,
          link: '/collection/replyRecordList'
        }
      },
      {
        path: 'collectionManList',
        component: () => import('@/views/collection/collectionManList'),
        name: 'CollectionCollectionManList',
        meta: {
          title: '催收专员列表',
          isLeaf: 2,
          link: '/collection/collectionManList'
        }
      },
      {
        path: 'otherPayTypeList',
        component: () => import('@/views/collection/otherPayTypeList'),
        name: 'CollectionOtherPayTypeList',
        meta: {
          title: '支付宝微信还款管理',
          isLeaf: 2,
          link: '/collection/otherPayTypeList'
        }
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
      icon: 'fas fa-laptop',
      isLeaf: 1,
      link: '/operate'
    },
    children: [
      {
        path: 'content',
        component: () => import('@/views/operate/content/index'),
        name: 'OperateContent',
        redirect: 'noredirect',
        meta: {
          title: '内容管理',
          isLeaf: 1,
          link: '/operate/content'
        },
        children: [
          {
            path: 'helpCenter',
            component: () => import('@/views/operate/content/helpCenter'),
            name: 'OperateContentHelpCenter',
            meta: {
              title: '帮助中心管理',
              isLeaf: 2,
              link: '/operate/content/helpCenter'
            }
          },
          {
            path: 'noticeCenter',
            component: () => import('@/views/operate/content/noticeCenter'),
            name: 'OperateContentNoticeCenter',
            meta: {
              title: '公告中心管理',
              isLeaf: 2,
              link: '/operate/content/noticeCenter'
            }
          },
          {
            path: 'feedbackCenter',
            component: () => import('@/views/operate/content/feedbackCenter'),
            name: 'OperateContentFeedbackCenter',
            meta: {
              title: '反馈中心管理',
              isLeaf: 2,
              link: '/operate/content/feedbackCenter'
            }
          },
          {
            path: 'activity',
            component: () => import('@/views/operate/content/activity'),
            name: 'OperateContentActivity',
            meta: {
              title: '活动管理',
              isLeaf: 2,
              link: '/operate/content/activity'
            }
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
      icon: 'fas fa-shield-alt',
      isLeaf: 1,
      link: '/risk'
    },
    children: [
      {
        path: 'credit',
        component: () => import('@/views/risk/credit'),
        name: 'RiskCredit',
        meta: {
          title: '征信管理',
          isLeaf: 2,
          link: '/risk/credit'
        }
      },
      {
        path: 'decision',
        component: () => import('@/views/risk/decision'),
        name: 'RiskDecision',
        meta: {
          title: '决策管理',
          isLeaf: 2,
          link: '/risk/decision'
        }
      },
      {
        path: 'thirdParty',
        component: () => import('@/views/risk/thirdParty'),
        name: 'RiskDecisionThirdParty',
        meta: {
          title: '第三方统计',
          isLeaf: 2,
          link: '/risk/thirdParty'
        }
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
      icon: 'fas fa-money-check',
      isLeaf: 1,
      link: '/finance'
    },
    children: [
      {
        path: 'makeMoney',
        component: () => import('@/views/finance/makeMoney/index'),
        name: 'FinanceMakeMoney',
        redirect: 'noredirect',
        meta: {
          title: '打款管理',
          isLeaf: 1,
          link: '/finance/makeMoney'
        },
        children: [
          {
            path: 'list',
            component: () => import('@/views/finance/makeMoney/list'),
            name: 'FinanceMakeMoneyList',
            meta: {
              title: '打款列表',
              isLeaf: 2,
              link: '/finance/makeMoney/list'
            }
          },
          {
            path: 'dayToDay',
            component: () => import('@/views/finance/makeMoney/dayToDay'),
            name: 'FinanceMakeMoneyDayToDay',
            meta: {
              title: '打款流水列表',
              isLeaf: 2,
              link: '/finance/makeMoney/dayToDay'
            }
          },
          {
            path: 'detail',
            component: () => import('@/views/finance/makeMoney/detail'),
            name: 'FinanceMakeMoneyDetail',
            meta: {
              title: '打款详情',
              isLeaf: 2,
              link: '/finance/makeMoney/detail'
            },
            hidden: true
          },
          {
            path: 'payDetail',
            component: () => import('@/views/finance/makeMoney/payDetail'),
            name: 'FinanceMakeMoneyPayDetail',
            meta: {
              title: '付款详情',
              isLeaf: 2,
              link: '/finance/makeMoney/payDetail'
            },
            hidden: true
          }
        ]
      },
      {
        path: 'cutMoney',
        component: () => import('@/views/finance/cutMoney/index'),
        name: 'FinanceCutMoney',
        redirect: 'noredirect',
        meta: {
          title: '扣款管理',
          isLeaf: 1,
          link: '/finance/cutMoney'
        },
        children: [
          {
            path: 'list',
            component: () => import('@/views/finance/cutMoney/list'),
            name: 'FinanceCutMoneyList',
            meta: {
              title: '扣款列表',
              isLeaf: 2,
              link: '/finance/cutMoney/list'
            }
          },
          {
            path: 'dayToDay',
            component: () => import('@/views/finance/cutMoney/dayToDay'),
            name: 'FinanceCutMoneyDayToDay',
            meta: {
              title: '扣款流水列表',
              isLeaf: 2,
              link: '/finance/cutMoney/dayToDay'
            }
          }
        ]
      },
      {
        path: 'moneyBack',
        component: () => import('@/views/finance/moneyBack/index'),
        name: 'FinanceMoneyBack',
        redirect: 'noredirect',
        meta: {
          title: '回款管理',
          isLeaf: 1,
          link: '/finance/moneyBack'
        },
        children: [
          {
            path: 'shouldList',
            component: () => import('@/views/finance/moneyBack/shouldList'),
            name: 'FinanceMoneyBackShouldList',
            meta: {
              title: '待回款列表',
              isLeaf: 2,
              link: '/finance/moneyBack/shouldList'
            }
          },
          {
            path: 'hasList',
            component: () => import('@/views/finance/moneyBack/hasList'),
            name: 'FinanceMoneyBackHasList',
            meta: {
              title: '已回款列表',
              isLeaf: 2,
              link: '/finance/moneyBack/hasList'
            }
          },
          {
            path: 'recordList',
            component: () => import('@/views/finance/moneyBack/recordList'),
            name: 'FinanceMoneyBackRecordList',
            meta: {
              title: '回款记录列表',
              isLeaf: 2,
              link: '/finance/moneyBack/recordList'
            }
          },
          {
            path: 'overdueList',
            component: () => import('@/views/finance/moneyBack/overdueList'),
            name: 'FinanceMoneyBackOverdueList',
            meta: {
              title: '逾期列表',
              isLeaf: 2,
              link: '/finance/moneyBack/overdueList'
            }
          }
        ]
      },
      {
        path: 'thirdParty',
        component: () => import('@/views/finance/thirdParty/index'),
        name: 'FinanceThirdParty',
        redirect: 'noredirect',
        meta: {
          title: '第三方费用管理',
          isLeaf: 1,
          link: '/finance/thirdParty'
        },
        children: [
          {
            path: 'list',
            component: () => import('@/views/finance/thirdParty/list'),
            name: 'FinanceThirdPartyList',
            meta: {
              title: '第三方接入统计',
              isLeaf: 2,
              link: '/finance/thirdParty/list'
            }
          },
          {
            path: 'cost',
            component: () => import('@/views/finance/thirdParty/cost'),
            name: 'FinanceThirdPartyCost',
            meta: {
              title: '第三方运营成本统计',
              isLeaf: 2,
              link: '/finance/thirdParty/cost'
            }
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
      icon: 'fas fa-handshake',
      isLeaf: 1,
      link: '/channel'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/channel/list'),
        name: 'ChannelList',
        meta: {
          title: '渠道列表',
          isLeaf: 2,
          link: '/channel/list'
        }
      },
      {
        path: 'spread',
        component: () => import('@/views/channel/spread'),
        name: 'ChannelSpread',
        meta: {
          title: '渠道推广',
          isLeaf: 2,
          link: '/channel/spread'
        }
      },
      {
        path: 'detail',
        component: () => import('@/views/channel/detail'),
        name: 'ChannelDetail',
        meta: {
          title: '渠道明细统计',
          isLeaf: 2,
          link: '/channel/detail'
        }
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
      icon: 'fab fa-windows',
      isLeaf: 1,
      link: '/system'
    },
    children: [
      {
        path: 'auth',
        component: () => import('@/views/system/auth/index'),
        name: 'SystemAuth',
        redirect: 'noredirect',
        meta: {
          title: '权限管理',
          isLeaf: 1,
          link: '/system/auth'
        },
        children: [
          {
            path: 'user',
            component: () => import('@/views/system/auth/user'),
            name: 'SystemAuthUser',
            meta: {
              title: '管理员列表',
              isLeaf: 2,
              link: '/system/auth/user'
            }
          },
          {
            path: 'role',
            component: () => import('@/views/system/auth/role'),
            name: 'SystemAuthRole',
            meta: {
              title: '角色列表',
              isLeaf: 2,
              link: '/system/auth/role'
            }
          },
          {
            path: 'menu',
            component: () => import('@/views/system/auth/menu'),
            name: 'SystemAuthMenu',
            meta: {
              title: '菜单列表',
              isLeaf: 2,
              link: '/system/auth/menu'
            }
          },
          {
            path: 'menuButton',
            component: () => import('@/views/system/auth/menuButton'),
            name: 'SystemAuthMenuButton',
            meta: {
              title: '菜单按钮列表',
              isLeaf: 2,
              link: '/system/auth/menuButton'
            }
          }
        ]
      },
      {
        path: 'config',
        component: () => import('@/views/system/config/index'),
        name: 'SystemConfig',
        redirect: 'noredirect',
        meta: {
          title: '全局配置管理',
          isLeaf: 1,
          link: '/system/config'
        },
        children: [
          {
            path: 'dictionary',
            component: () => import('@/views/system/config/dictionary'),
            name: 'SystemDictionary',
            meta: {
              title: '字典配置',
              isLeaf: 2,
              link: '/system/config/dictionary'
            }
          },
          {
            path: 'global',
            component: () => import('@/views/system/config/global'),
            name: 'SystemGlobal',
            meta: {
              title: '全局配置',
              isLeaf: 2,
              link: '/system/config/global'
            }
          },
          {
            path: 'loanParameter',
            component: () => import('@/views/system/config/loanParameter'),
            name: 'SystemConfigLoanParameter',
            meta: {
              title: '借款参数管理',
              isLeaf: 2,
              link: '/system/config/loanParameter'
            }
          }
        ]
      }
    ]
  }
]
