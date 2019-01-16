const format = {
  formatCollectionType(type) {
    let text = '未知'
    switch (type) {
      case 0:
        text = '电话催收'
        break
      case 1:
        text = '短信催收'
        break
      case 3:
        text = '微信催收'
        break
    }
    return text
  },
  formatStateRZ(state) {
    let text = '未知'
    switch (state) {
      case 0:
        text = '未认证'
        break
      case 1:
        text = '认证'
        break
    }
    return text
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
  formatPayType(state) {
    let text = '未知'
    switch (state) {
      case 0:
        text = '银行支付'
        break
      case 1:
        text = '微信支付'
        break
      case 2:
        text = '支付宝支付'
        break
    }
    return text
  },
  formatConfirm(state) {
    let text = '未知'
    switch (state) {
      case 0:
        text = '审核通过'
        break
      case 1:
        text = '审核未通过'
        break
      case 2:
        text = '等待审核'
        break
    }
    return text
  },
  formatInform(state) {
    let text = '未知'
    switch (state) {
      case 0:
        text = '未通知'
        break
      case 1:
        text = '已通知'
        break
    }
    return text
  },
  formatCollectionTypeString(state) {
    let text = '未知'
    switch (state) {
      case '0':
        text = '电话催收'
        break
      case '1':
        text = '短信催收'
        break
      case '2':
        text = '微信催收'
        break
    }
    return text
  },
  formatComittedRepayment(state) {
    let text = '未知'
    switch (state) {
      case '0':
        text = '承诺'
        break
      case '1':
        text = '未承诺'
        break
    }
    return text
  },
  formatIsConnect(state) {
    let text = '未知'
    switch (state) {
      case '0':
        text = '接通'
        break
      case '1':
        text = '无人接听'
        break
      case '2':
        text = '空号/停机/关机'
        break
      case '3':
        text = '拒绝/挂断/拉黑'
        break
    }
    return text
  }
}

export default format
