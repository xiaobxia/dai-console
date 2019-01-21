const COLLECTION_TYPE = [
  {
    number: 0,
    label: '电话催收'
  },
  {
    number: 1,
    label: '短信催收'
  },
  {
    number: 2,
    label: '微信催收'
  }
]

const IS_CONNECT = [
  {
    number: 0,
    label: '接通'
  },
  {
    number: 1,
    label: '无人接听'
  },
  {
    number: 2,
    label: '空号/停机/关机'
  },
  {
    number: 3,
    label: '拒绝/挂断/拉黑'
  }
]

const PAY_TYPE = [
  {
    number: 0,
    label: '银行支付'
  },
  {
    number: 1,
    label: '微信支付'
  },
  {
    number: 2,
    label: '支付宝支付'
  }
]

const QUOTA_NAME = [
  {
    number: 0,
    label: '提额认证'
  },
  {
    number: 1,
    label: '后台修改'
  }
]

const QUOTA_TYPE = [
  {
    number: 0,
    label: '增加'
  },
  {
    number: 1,
    label: '减少'
  }
]

const BACK_TIME = [
  {
    number: 0,
    label: '今日'
  },
  {
    number: 1,
    label: '明日'
  },
  {
    number: 2,
    label: '后天'
  }
]

const RZ = [
  {
    number: 0,
    label: '未认证'
  },
  {
    number: 1,
    label: '认证'
  }
]

const COMITTED_REPAYMENT = [
  {
    number: 0,
    label: '承诺'
  },
  {
    number: 1,
    label: '未承诺'
  }
]

const IS_CONFIRM = [
  {
    number: 0,
    label: '审核通过'
  },
  {
    number: 1,
    label: '审核未通过'
  },
  {
    number: 2,
    label: '等待审核'
  }
]

const IS_INFORM = [
  {
    number: 0,
    label: '未通知'
  },
  {
    number: 1,
    label: '已通知'
  }
]

const format = {
  COLLECTION_TYPE,
  formatCollectionType(state, isStr) {
    const result = COLLECTION_TYPE.find((item) => {
      if (isStr) {
        return (item.text || '' + item.number) === state
      } else {
        return item.number === state
      }
    })
    return (result && result.label) || '未知'
  },
  IS_CONNECT,
  formatIsConnect(state, isStr) {
    const result = IS_CONNECT.find((item) => {
      if (isStr) {
        return (item.text || '' + item.number) === state
      } else {
        return item.number === state
      }
    })
    return (result && result.label) || '未知'
  },
  PAY_TYPE,
  formatPayType(state, isStr) {
    const result = PAY_TYPE.find((item) => {
      if (isStr) {
        return (item.text || '' + item.number) === state
      } else {
        return item.number === state
      }
    })
    return (result && result.label) || '未知'
  },
  BACK_TIME,
  formatBackTime(state, isStr) {
    const result = BACK_TIME.find((item) => {
      if (isStr) {
        return (item.text || '' + item.number) === state
      } else {
        return item.number === state
      }
    })
    return (result && result.label) || '未知'
  },
  RZ,
  formatStateRZ(state, isStr) {
    const result = BACK_TIME.find((item) => {
      if (isStr) {
        return (item.text || '' + item.number) === state
      } else {
        return item.number === state
      }
    })
    return (result && result.label) || '未知'
  },
  formatStateSF(state) {
    let text = '未知'
    switch (state) {
      case 0:
        text = '否'
        break
      case 1:
        text = '是'
        break
    }
    return text
  },
  IS_CONFIRM,
  formatISConfirm(state, isStr) {
    const result = IS_CONFIRM.find((item) => {
      if (isStr) {
        return (item.text || '' + item.number) === state
      } else {
        return item.number === state
      }
    })
    return (result && result.label) || '未知'
  },
  IS_INFORM,
  formatIsInform(state, isStr) {
    const result = IS_INFORM.find((item) => {
      if (isStr) {
        return (item.text || '' + item.number) === state
      } else {
        return item.number === state
      }
    })
    return (result && result.label) || '未知'
  },
  COMITTED_REPAYMENT,
  formatComittedRepayment(state, isStr) {
    const result = COMITTED_REPAYMENT.find((item) => {
      if (isStr) {
        return (item.text || '' + item.number) === state
      } else {
        return item.number === state
      }
    })
    return (result && result.label) || '未知'
  },
  QUOTA_NAME,
  formatQuotaName(state, isStr) {
    const result = QUOTA_NAME.find((item) => {
      if (isStr) {
        return (item.text || '' + item.number) === state
      } else {
        return item.number === state
      }
    })
    return (result && result.label) || '未知'
  },
  QUOTA_TYPE,
  formatQuotaType(state, isStr) {
    const result = QUOTA_TYPE.find((item) => {
      if (isStr) {
        return (item.text || '' + item.number) === state
      } else {
        return item.number === state
      }
    })
    return (result && result.label) || '未知'
  }
}

export default format
