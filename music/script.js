// 全局音乐播放器变量
let currentMusicPlayer = null;
let currentPlayingButton = null;
let isMusicPlaying = false;

document.addEventListener('DOMContentLoaded', () => {
    // 初始化事件监听
    initEventListeners();
    
    // 确保页面初始状态正确
    document.getElementById('page1').classList.add('active');
    document.getElementById('page2').classList.remove('active');
    
    // 初始化主图片特效
    initMainImageEffects();
    
    // 初始化视频控制
    initVideoControls();
    
    // 初始化音乐功能
    initMusicControls();
});

// 事件监听器
function initEventListeners() {
    // 首页点击跳转到第二页
    const homePage = document.querySelector('.home-container');
    homePage.addEventListener('click', () => {
        transitionToPage2();
    });
    
    // 返回按钮 - 从第二页返回到首页
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        transitionToPage1();
    });
}

// 创建粒子特效
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'transition-particles';
    document.body.appendChild(particleContainer);
    
    const mainImage = document.getElementById('mainImage');
    const rect = mainImage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle-dot';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        
        const angle = (i / 30) * Math.PI * 2;
        const distance = 300 + Math.random() * 200;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        
        particle.style.setProperty('--dx', dx + 'px');
        particle.style.setProperty('--dy', dy + 'px');
        
        particleContainer.appendChild(particle);
    }
    
    setTimeout(() => {
        document.body.removeChild(particleContainer);
    }, 2000);
}

// 页面过渡效果
function transitionToPage2() {
    // 创建粒子特效
    createParticles();
    
    // 创建圆形过渡遮罩
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    setTimeout(() => {
        transition.classList.add('active');
        
        setTimeout(() => {
            document.getElementById('page1').classList.remove('active');
            document.getElementById('page2').classList.add('active');
            
            // 开始播放视频
            const video = document.getElementById('mainVideo');
            video.play();
            
            setTimeout(() => {
                transition.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(transition);
                }, 800);
            }, 200);
        }, 400);
    }, 50);
}

function transitionToPage1() {
    // 暂停视频
    const video = document.getElementById('mainVideo');
    video.pause();
    
    // 创建圆形过渡遮罩
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    setTimeout(() => {
        transition.classList.add('active');
        
        setTimeout(() => {
            document.getElementById('page2').classList.remove('active');
            document.getElementById('page1').classList.add('active');
            
            setTimeout(() => {
                transition.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(transition);
                }, 800);
            }, 200);
        }, 400);
    }, 50);
}

// 主图片特效初始化
function initMainImageEffects() {
    const mainImage = document.getElementById('mainImage');
    
    if (mainImage) {
        // 添加鼠标进入和离开事件
        mainImage.addEventListener('mouseenter', () => {
            // 鼠标悬停时增强发光效果
            mainImage.style.filter = 'drop-shadow(0 0 45px rgba(255, 217, 0, 1))';
        });
        
        mainImage.addEventListener('mouseleave', () => {
            // 鼠标离开时恢复正常发光效果
            mainImage.style.filter = '';
        });
        
        // 添加点击时的额外搏动效果
        mainImage.addEventListener('click', () => {
            // 临时加快搏动速度
            mainImage.style.animationDuration = '0.8s';
            
            // 3秒后恢复正常搏动速度
            setTimeout(() => {
                mainImage.style.animationDuration = '1.8s';
            }, 3000);
        });
    }
}

// 视频控制初始化
function initVideoControls() {
    const video = document.getElementById('mainVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    
    if (video && playPauseBtn) {
        // 播放/暂停控制
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = '⏸️';
            } else {
                video.pause();
                playPauseBtn.textContent = '▶️';
            }
        });
        
        // 音乐控制按钮
        if (musicToggleBtn) {
            musicToggleBtn.addEventListener('click', () => {
                if (isMusicPlaying) {
                    pauseMusic();
                    musicToggleBtn.textContent = '🎵';
                } else {
                    resumeMusic();
                    musicToggleBtn.textContent = '⏸️';
                }
            });
        }
        
        // 监听视频播放状态变化
        video.addEventListener('play', () => {
            playPauseBtn.textContent = '⏸️';
        });
        
        video.addEventListener('pause', () => {
            playPauseBtn.textContent = '▶️';
        });
        
        // 点击视频区域播放/暂停
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    }
}

// 音乐控制初始化
function initMusicControls() {
    const musicButtons = document.querySelectorAll('.music-btn');
    
    musicButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止触发首页跳转
            
            const songPath = button.getAttribute('data-song');
            playMusic(songPath, button);
        });
    });
}

// 播放音乐
function playMusic(songPath, button) {
    // 停止当前播放的音乐
    if (currentMusicPlayer) {
        currentMusicPlayer.pause();
        currentMusicPlayer.currentTime = 0;
    }
    
    // 移除之前的播放状态
    if (currentPlayingButton) {
        currentPlayingButton.classList.remove('playing');
    }
    
    // 创建新的音频播放器
    currentMusicPlayer = new Audio(songPath);
    currentMusicPlayer.loop = true;
    currentMusicPlayer.volume = 0.7;
    
    // 播放音乐
    currentMusicPlayer.play().then(() => {
        isMusicPlaying = true;
        currentPlayingButton = button;
        button.classList.add('playing');
        
        // 更新视频页面的音乐控制按钮
        const musicToggleBtn = document.getElementById('musicToggleBtn');
        if (musicToggleBtn) {
            musicToggleBtn.textContent = '⏸️';
        }
    }).catch(error => {
        console.log('音乐播放失败:', error);
    });
}

// 暂停音乐
function pauseMusic() {
    if (currentMusicPlayer && !currentMusicPlayer.paused) {
        currentMusicPlayer.pause();
        isMusicPlaying = false;
        
        if (currentPlayingButton) {
            currentPlayingButton.classList.remove('playing');
        }
    }
}

// 恢复音乐播放
function resumeMusic() {
    if (currentMusicPlayer && currentMusicPlayer.paused) {
        currentMusicPlayer.play().then(() => {
            isMusicPlaying = true;
            
            if (currentPlayingButton) {
                currentPlayingButton.classList.add('playing');
            }
        });
    }
} 