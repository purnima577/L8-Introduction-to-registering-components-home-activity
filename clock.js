AFRAME.registerComponent('clock', {
  init: function () {
    this.createNumbers();
    this.lastSecond = -1;
    this.updateClock = this.updateClock.bind(this);
  },

  tick: function () {
    this.updateClock();
  },

  updateClock: function () {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondAngle = seconds * 6;
    const minuteAngle = minutes * 6 + seconds * 0.1;
    const hourAngle = ((hours % 12) + minutes / 60) * 30;

    const hourHand = this.el.querySelector('#hourHand');
    const minuteHand = this.el.querySelector('#minuteHand');
    const secondHand = this.el.querySelector('#secondHand');

    // Smooth hour/minute hand rotation
    hourHand.setAttribute('rotation', `0 0 ${-hourAngle}`);
    minuteHand.setAttribute('rotation', `0 0 ${-minuteAngle}`);

    // Ticking effect for seconds
    if (this.lastSecond !== seconds) {
      this.lastSecond = seconds;
      secondHand.setAttribute('rotation', `0 0 ${-secondAngle}`);
      // Optional: Add tick sound here
    }
  },

  createNumbers: function () {
    const clockEntity = this.el;
    const radius = 1.3;

    for (let i = 1; i <= 12; i++) {
      const angle = (i - 3) * (Math.PI / 6); // Offset to rotate numbers correctly
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      const numEntity = document.createElement('a-text');
      numEntity.setAttribute('value', i.toString());
      numEntity.setAttribute('color', '#333');
      numEntity.setAttribute('align', 'center');
      numEntity.setAttribute('position', `${x.toFixed(2)} ${y.toFixed(2)} 0.11`);
      numEntity.setAttribute('rotation', '-90 0 0');
      numEntity.setAttribute('scale', '0.3 0.3 0.3');
      clockEntity.appendChild(numEntity);
    }
  }
});
