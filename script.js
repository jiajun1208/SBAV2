// 影片列表，請將你的影片檔案放在同一個目錄下，並將檔名寫在這裡
const videoList = [
    'video1.mp4',
    'video2.mp4',
    'video3.mp4'
];

const videoPlayer = document.getElementById('video-player');
const volumeSlider = document.getElementById('volume-slider');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const videoContainer = document.querySelector('.video-container');
const videoFilenameDisplay = document.getElementById('video-filename');
const titleLogo = document.getElementById('title-logo');

let currentVideoIndex = 0;

// 載入並播放影片
function loadVideo(index) {
    if (index >= 0 && index < videoList.length) {
        const videoURL = videoList[index];
        videoPlayer.src = videoURL;
        videoFilenameDisplay.textContent = videoURL;
        videoPlayer.play().catch(error => {
            console.error('播放失敗:', error);
            // 處理自動播放被瀏覽器阻擋的情況
            // 可以在這裡加入提示，例如: 點擊螢幕開始播放
        });
    }
}

// 影片播放結束時自動切換到下一部
videoPlayer.addEventListener('ended', () => {
    currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
    loadVideo(currentVideoIndex);
});

// 音量調整
volumeSlider.addEventListener('input', () => {
    videoPlayer.volume = volumeSlider.value;
});

// 全螢幕切換
fullscreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        videoContainer.requestFullscreen();
    }
});

// 監聽全螢幕狀態變化
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        videoContainer.classList.add('fullscreen');
        titleLogo.style.display = 'none'; // 全螢幕時隱藏主標題
    } else {
        videoContainer.classList.remove('fullscreen');
        titleLogo.style.display = 'block'; // 退出全螢幕時顯示主標題
    }
});

// 網頁載入時初始化
document.addEventListener('DOMContentLoaded', () => {
    // 預設音量
    videoPlayer.volume = volumeSlider.value;
    // 載入第一部影片
    loadVideo(currentVideoIndex);
});