// result.js
const app = getApp()

Page({
  data: {
    finalScore: 0,
    correctCount: 0,
    wrongCount: 0,
    totalCount: 0,
    accuracy: 0,
    level: 'basic'
  },

  onLoad(options) {
    // 获取传递的参数
    const score = parseInt(options.score || 0)
    const correct = parseInt(options.correct || 0)
    const wrong = parseInt(options.wrong || 0)
    const level = options.level || 'basic'

    // 计算统计数据
    const total = correct + wrong
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0

    this.setData({
      finalScore: score,
      correctCount: correct,
      wrongCount: wrong,
      totalCount: total,
      accuracy: accuracy,
      level: level
    })

    console.log('游戏结果:', { score, correct, wrong, total, accuracy, level })
  },

  // 获取结果消息
  getResultMessage() {
    const score = this.data.finalScore
    if (score >= 100) {
      return '恭喜你，表现出色！'
    } else if (score >= 60) {
      return '不错的成绩，继续加油！'
    } else if (score >= 30) {
      return '还有进步空间哦'
    } else {
      return '多练习会更好的'
    }
  },

  // 获取难度文本
  getLevelText() {
    switch (this.data.level) {
      case 'basic':
        return '基础'
      case 'medium':
        return '中级'
      case 'advanced':
        return '高级'
      default:
        return '基础'
    }
  },

  // 获取难度描述
  getLevelDesc() {
    switch (this.data.level) {
      case 'basic':
        return '简单词汇，基础得分10分'
      case 'medium':
        return '常用词汇，基础得分15分'
      case 'advanced':
        return '复杂词汇，基础得分20分'
      default:
        return '简单词汇，基础得分10分'
    }
  },

  // 获取评价图标
  getEvaluationIcon() {
    const accuracy = this.data.accuracy
    if (accuracy >= 90) {
      return '🏆'
    } else if (accuracy >= 70) {
      return '🥇'
    } else if (accuracy >= 50) {
      return '🥈'
    } else if (accuracy >= 30) {
      return '🥉'
    } else {
      return '💪'
    }
  },

  // 获取评价文本
  getEvaluationText() {
    const accuracy = this.data.accuracy
    if (accuracy >= 90) {
      return '词语大师！准确率超高！'
    } else if (accuracy >= 70) {
      return '猜词达人！表现优秀！'
    } else if (accuracy >= 50) {
      return '不错的水平，继续努力！'
    } else if (accuracy >= 30) {
      return '还需要多练习哦！'
    } else {
      return '加油！熟能生巧！'
    }
  },

  // 再来一局
  replayGame() {
    // 重置得分
    app.globalData.score = 0
    
    wx.redirectTo({
      url: '/pages/game/game'
    })
  },

  // 返回主页
  backToHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  // 分享成绩
  shareResult() {
    const level = this.getLevelText()
    const score = this.data.finalScore
    const accuracy = this.data.accuracy
    
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })

    wx.showModal({
      title: '分享成绩',
      content: `我在《疯狂猜词》${level}难度下获得了${score}分，准确率${accuracy}%！快来挑战吧！`,
      showCancel: false,
      confirmText: '知道了'
    })
  },

  // 页面分享配置
  onShareAppMessage() {
    const level = this.getLevelText()
    const score = this.data.finalScore
    const accuracy = this.data.accuracy
    
    return {
      title: `我在疯狂猜词${level}难度获得${score}分！`,
      path: '/pages/index/index',
      imageUrl: '' // 这里可以设置分享图片
    }
  },

  // 朋友圈分享配置
  onShareTimeline() {
    const level = this.getLevelText()
    const score = this.data.finalScore
    
    return {
      title: `疯狂猜词${level}难度${score}分挑战！`,
      imageUrl: '' // 这里可以设置分享图片
    }
  }
}) 