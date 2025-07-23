// index.js
Page({
  data: {
    selectedLevel: 'basic'
  },

  onLoad() {
    console.log('首页加载完成')
  },

  // 获取难度文字
  getLevelText(level) {
    switch (level) {
      case 'basic': return '基础难度'
      case 'medium': return '中级难度'
      case 'advanced': return '高级难度'
      default: return '基础难度'
    }
  },

  // 选择难度
  selectBasic() {
    this.setData({ selectedLevel: 'basic' })
    
    // 更新全局数据
    try {
      const app = getApp()
      if (app && app.globalData) {
        app.globalData.currentLevel = 'basic'
      }
    } catch (e) {
      console.log('全局数据更新失败')
    }
    
    wx.showToast({
      title: '已选择基础难度',
      icon: 'success',
      duration: 1000
    })
  },

  selectMedium() {
    this.setData({ selectedLevel: 'medium' })
    
    try {
      const app = getApp()
      if (app && app.globalData) {
        app.globalData.currentLevel = 'medium'
      }
    } catch (e) {
      console.log('全局数据更新失败')
    }
    
    wx.showToast({
      title: '已选择中级难度',
      icon: 'success',
      duration: 1000
    })
  },

  selectAdvanced() {
    this.setData({ selectedLevel: 'advanced' })
    
    try {
      const app = getApp()
      if (app && app.globalData) {
        app.globalData.currentLevel = 'advanced'
      }
    } catch (e) {
      console.log('全局数据更新失败')
    }
    
    wx.showToast({
      title: '已选择高级难度',
      icon: 'success',
      duration: 1000
    })
  },

  // 开始游戏
  startGame() {
    console.log('开始游戏，难度:', this.data.selectedLevel)

    // 确保全局数据
    try {
      const app = getApp()
      if (app && app.globalData) {
        app.globalData.currentLevel = this.data.selectedLevel
        app.globalData.score = 0
      }
    } catch (e) {
      console.log('全局数据设置失败，使用默认值')
    }
    
    wx.navigateTo({
      url: '/pages/game/game',
      success: () => {
        console.log('跳转游戏页面成功')
      },
      fail: (err) => {
        console.error('跳转失败', err)
        wx.showModal({
          title: '跳转失败',
          content: '无法进入游戏页面，请重试',
          showCancel: false
        })
      }
    })
  }
})
