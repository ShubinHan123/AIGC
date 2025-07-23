// game.js
Page({
  data: {
    // 游戏数据
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    currentWord: '苹果',
    currentHint: '红色的水果，很甜很脆',
    level: 'basic',
    levelText: '基础',
    scorePerWord: 10,
    
    // 界面状态
    isRotated: false,
    showHint: false,
    
    // 简化词库
    wordLibrary: [
      { word: '苹果', hint: '红色的水果，很甜很脆' },
      { word: '猫咪', hint: '会抓老鼠的可爱动物' },
      { word: '汽车', hint: '四个轮子的交通工具' },
      { word: '太阳', hint: '白天发光发热的星球' },
      { word: '雨伞', hint: '下雨时用来遮挡的工具' },
      { word: '蝴蝶', hint: '会飞的美丽昆虫' }
    ]
  },

  onLoad() {
    console.log('游戏页面加载')
    
    try {
      this.initGame()
      console.log('游戏初始化成功')
    } catch (error) {
      console.error('游戏初始化失败:', error)
      wx.showModal({
        title: '加载失败',
        content: '游戏初始化失败，请返回重试',
        showCancel: false,
        success: () => {
          wx.navigateBack()
        }
      })
    }
  },

  // 初始化游戏
  initGame() {
    // 设置难度和得分
    const levelConfig = {
      basic: { text: '基础', score: 10 },
      medium: { text: '中级', score: 15 },
      advanced: { text: '高级', score: 20 }
    }

    let level = 'basic'
    // 简单获取全局数据，避免复杂的依赖
    try {
      const app = getApp()
      if (app && app.globalData && app.globalData.currentLevel) {
        level = app.globalData.currentLevel
      }
    } catch (e) {
      console.log('使用默认难度')
    }

    this.setData({
      level: level,
      levelText: levelConfig[level].text,
      scorePerWord: levelConfig[level].score
    })

    // 开始第一个词语
    this.nextWord()

    wx.showToast({
      title: '游戏开始！',
      icon: 'success',
      duration: 1000
    })
  },

  // 下一个词语
  nextWord() {
    const words = this.data.wordLibrary
    const randomIndex = Math.floor(Math.random() * words.length)
    const currentWord = words[randomIndex]

    this.setData({
      currentWord: currentWord.word,
      currentHint: currentWord.hint,
      showHint: false,
      isRotated: false
    })

    console.log('当前词语:', currentWord.word)
  },

  // 翻转屏幕
  toggleRotate() {
    this.setData({
      isRotated: !this.data.isRotated
    })
    
    wx.showToast({
      title: this.data.isRotated ? '已翻转' : '已恢复',
      icon: 'none',
      duration: 1000
    })
  },

  // 显示提示
  showHint() {
    this.setData({
      showHint: true
    })

    wx.showToast({
      title: '显示提示',
      icon: 'none',
      duration: 1000
    })
  },

  // 猜对了
  correctAnswer() {
    const newScore = this.data.score + this.data.scorePerWord
    const newCorrectCount = this.data.correctCount + 1
    
    this.setData({
      score: newScore,
      correctCount: newCorrectCount
    })

    wx.showToast({
      title: `+${this.data.scorePerWord}分！`,
      icon: 'success',
      duration: 1000
    })

    // 延迟切换下一个词语
    setTimeout(() => {
      this.nextWord()
    }, 1500)
  },

  // 跳过
  wrongAnswer() {
    const newScore = Math.max(0, this.data.score - 5)
    const newWrongCount = this.data.wrongCount + 1
    
    this.setData({
      score: newScore,
      wrongCount: newWrongCount
    })

    wx.showToast({
      title: '-5分',
      icon: 'none',
      duration: 1000
    })

    // 延迟切换下一个词语
    setTimeout(() => {
      this.nextWord()
    }, 1500)
  },

  // 结束游戏
  endGame() {
    const total = this.data.correctCount + this.data.wrongCount
    const accuracy = total > 0 ? Math.round((this.data.correctCount / total) * 100) : 0

    wx.showModal({
      title: '游戏结束',
      content: `最终得分: ${this.data.score}分\n猜对: ${this.data.correctCount}个\n跳过: ${this.data.wrongCount}个\n准确率: ${accuracy}%`,
      showCancel: true,
      confirmText: '再来一局',
      cancelText: '返回首页',
      success: (res) => {
        if (res.confirm) {
          // 重新开始游戏
          this.setData({
            score: 0,
            correctCount: 0,
            wrongCount: 0
          })
          this.nextWord()
        } else {
          // 返回首页
          wx.navigateBack()
        }
      }
    })
  }
}) 