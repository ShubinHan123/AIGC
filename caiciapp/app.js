// app.js
App({
  globalData: {
    // 游戏数据
    score: 0,
    currentLevel: 'basic',
    gameTime: 60,
    
    // 词库数据
    wordLibrary: {
      basic: [
        { word: '苹果', image: '/images/apple.png', hint: '红色的水果', audio: '/audio/apple.mp3' },
        { word: '猫咪', image: '/images/cat.png', hint: '会抓老鼠的动物', audio: '/audio/cat.mp3' },
        { word: '汽车', image: '/images/car.png', hint: '四个轮子的交通工具', audio: '/audio/car.mp3' },
        { word: '太阳', image: '/images/sun.png', hint: '白天发光发热的星球', audio: '/audio/sun.mp3' },
        { word: '房子', image: '/images/house.png', hint: '人们居住的地方', audio: '/audio/house.mp3' },
        { word: '花朵', image: '/images/flower.png', hint: '植物开出的美丽部分', audio: '/audio/flower.mp3' },
        { word: '雨伞', image: '/images/umbrella.png', hint: '下雨时用来遮挡的工具', audio: '/audio/umbrella.mp3' },
        { word: '蝴蝶', image: '/images/butterfly.png', hint: '会飞的美丽昆虫', audio: '/audio/butterfly.mp3' }
      ],
      medium: [
        { word: '图书馆', image: '/images/library.png', hint: '借阅书籍的地方', audio: '/audio/library.mp3' },
        { word: '电梯', image: '/images/elevator.png', hint: '楼层间运送人的设备', audio: '/audio/elevator.mp3' },
        { word: '钢琴', image: '/images/piano.png', hint: '黑白键盘的乐器', audio: '/audio/piano.mp3' },
        { word: '篮球', image: '/images/basketball.png', hint: '用手拍打投篮的运动', audio: '/audio/basketball.mp3' },
        { word: '望远镜', image: '/images/telescope.png', hint: '观察远处物体的光学仪器', audio: '/audio/telescope.mp3' },
        { word: '冰箱', image: '/images/refrigerator.png', hint: '保存食物新鲜的电器', audio: '/audio/refrigerator.mp3' },
        { word: '彩虹', image: '/images/rainbow.png', hint: '雨后天空出现的七色光带', audio: '/audio/rainbow.mp3' },
        { word: '蜻蜓', image: '/images/dragonfly.png', hint: '有透明翅膀的水边昆虫', audio: '/audio/dragonfly.mp3' }
      ],
      advanced: [
        { word: '显微镜', image: '/images/microscope.png', hint: '观察微小物体的科学仪器', audio: '/audio/microscope.mp3' },
        { word: '交响乐', image: '/images/symphony.png', hint: '大型管弦乐队演奏的音乐形式', audio: '/audio/symphony.mp3' },
        { word: '万花筒', image: '/images/kaleidoscope.png', hint: '旋转产生对称图案的光学玩具', audio: '/audio/kaleidoscope.mp3' },
        { word: '指南针', image: '/images/compass.png', hint: '指示方向的导航工具', audio: '/audio/compass.mp3' },
        { word: '瀑布', image: '/images/waterfall.png', hint: '从高处落下的水流景观', audio: '/audio/waterfall.mp3' },
        { word: '摩天轮', image: '/images/ferriswheel.png', hint: '游乐园里的巨型旋转观景设施', audio: '/audio/ferriswheel.mp3' },
        { word: '潜水艇', image: '/images/submarine.png', hint: '能在水下航行的船只', audio: '/audio/submarine.mp3' },
        { word: '向日葵', image: '/images/sunflower.png', hint: '总是朝向太阳的黄色大花', audio: '/audio/sunflower.mp3' }
      ]
    }
  },

  onLaunch() {
    // 小程序启动初始化
    console.log('疯狂猜词小程序启动')
  }
})
