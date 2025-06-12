AFRAME.registerComponent('rotate-model', {
  tick: function () {
    this.el.object3D.rotation.y += 0.01;
  }
});