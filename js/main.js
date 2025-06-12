AFRAME.registerComponent('rotate-model', {
  tick: function () {
    this.el.object3D.rotation.y += 0.01;
  }
});

// 檢查攝影機存取權限並控制遮罩層
document.addEventListener('DOMContentLoaded', function () {
  const errorMessage = document.getElementById('error-message');
  const cameraOverlay = document.getElementById('camera-overlay');

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      // 成功獲取攝影機，隱藏遮罩層
      cameraOverlay.style.display = 'none';
      stream.getTracks().forEach(track => track.stop()); // 關閉臨時流
    })
    .catch(function (err) {
      // 顯示錯誤訊息
      errorMessage.style.display = 'block';
      cameraOverlay.style.display = 'none'; // 隱藏遮罩層以顯示錯誤
      if (err.name === 'NotAllowedError') {
        errorMessage.textContent = '請允許攝影機存取權限！';
      } else if (err.name === 'NotFoundError') {
        errorMessage.textContent = '未找到攝影機設備！';
      } else {
        errorMessage.textContent = '無法開啟攝影機：' + err.message;
      }
    });
});