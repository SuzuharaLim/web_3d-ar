AFRAME.registerComponent('rotate-model', {
  tick: function () {
    this.el.object3D.rotation.y += 0.01;
  }
});

// 檢查攝影機存取權限
document.addEventListener('DOMContentLoaded', function () {
  const errorMessage = document.getElementById('error-message');
  
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      // 成功獲取攝影機
      stream.getTracks().forEach(track => track.stop()); // 立即關閉，避免持續使用
    })
    .catch(function (err) {
      // 顯示錯誤訊息
      errorMessage.style.display = 'block';
      if (err.name === 'NotAllowedError') {
        errorMessage.textContent = '請允許攝影機存取權限！';
      } else if (err.name === 'NotFoundError') {
        errorMessage.textContent = '未找到攝影機設備！';
      } else {
        errorMessage.textContent = '無法開啟攝影機：' + err.message;
      }
    });
});