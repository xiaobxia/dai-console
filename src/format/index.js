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
  }
}

export default format
