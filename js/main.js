AFRAME.registerComponent('rotate-model', {
  tick: function () {
    this.el.object3D.rotation.y += 0.01;
  }
});

// 檢查相機存取權限並監聽場景初始化
document.addEventListener('DOMContentLoaded', function () {
  const errorMessage = document.getElementById('error-message');
  const loadingMessage = document.querySelector('.loading');
  
  // 檢查相機權限
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      // 成功獲取相機
      stream.getTracks().forEach(track => track.stop()); // 關閉臨時流
      loadingMessage.textContent = '相機已啟動，請對準圖片A...';
    })
    .catch(function (err) {
      // 顯示錯誤訊息
      errorMessage.style.display = 'block';
      loadingMessage.style.display = 'none';
      if (err.name === 'NotAllowedError') {
        errorMessage.textContent = '請允許相機存取權限！';
      } else if (err.name === 'NotFoundError') {
        errorMessage.textContent = '未找到相機設備！';
      } else {
        errorMessage.textContent = '無法啟動相機：' + err.message;
      }
    });

  // 監聽A-Frame場景初始化
  const scene = document.querySelector('a-scene');
  scene.addEventListener('loaded', function () {
    if (scene.is('ar-mode')) {
      loadingMessage.textContent = 'AR模式已啟動，請對準圖片A...';
    }
  });
});