/* JoyStick */

/*
  @constructor
  @param container {HTMLElement} -  contenedor del joystick
  @param options {Object} -
    fillStyle {String}: color del joystick
    strokeStyle {String}: color del borde
    eventArea {HTMLElement}: zona para mover el JoyStick
 */
JoyStick = function (container, options = {}) {
  let that = this;
  
  // canvas
  let canvas = document.createElement("canvas");
  let eventArea = options.eventArea || canvas;
  let ctx = canvas.getContext("2d");
  
  let fillStyle = options.fillStyle || "#000000";
  let strokeStyle = options.strokeStyle || options.fillStyle || "#000000";
  
  
  // constantes
  let callback = options.callback;
  let W = container.clientWidth;
  let H = container.clientHeight;
  let centerX = W / 2;
  let centerY = H / 2;
  let radius = centerX;
  
  canvas.width = W;
  canvas.height = H;
  container.appendChild(canvas);
  
  // joystick posicion
  let joyX = centerX;
  let joyY = centerY;
  let joyRadius = radius / 2;
  let joyMax = radius - joyRadius;
  let offsetParent = canvas.offsetParent.tagName.toUpperCase() === "BODY" ? canvas : canvas.offsetParent;
  let offsetX = offsetParent.offsetLeft;
  let offsetY = offsetParent.offsetTop;
  
  // eventos
  eventArea.addEventListener("touchstart", function () {
    that.pressed = true;
    if (callback) callback(that.x, that.y);
  });
  eventArea.addEventListener("touchmove", function (event) {
    event = event.targetTouches[0];
    
    let touchX = event.pageX - offsetX;
    let touchY = event.pageY - offsetY;
    let sideX = touchX - radius;
    let sideY = touchY - radius;
    let radian = Math.atan2(sideY, sideX);
    
    // colision con borde del joystick
    if (sideX * sideX + sideY * sideY >= joyMax * joyMax) {
      joyX = joyMax * Math.cos(radian);
      joyY = joyMax * Math.sin(radian);
    }
    else {
      joyX = Math.abs(sideX) > joyMax ? joyMax : Math.abs(sideX);
      joyY = Math.abs(sideY) > joyMax ? joyMax : Math.abs(sideY);
    }
    
    if (sideY < 0) joyY = - Math.abs(joyY);
    if (sideX < 0) joyX = - Math.abs(joyX);
    
    joyX += radius;
    joyY += radius;
    
    
    
    // valor de -1 a 1 del joystick
    let x = (joyX - centerX) / joyMax;
    let y = (joyY - centerY) / joyMax;
    let s = Math.sqrt(x * x + y * y);
    
    that.x = x;
    that.y = y;
    that.s = s > 0.9999999 ? 1 : s;
    
    // actualizar margen de contenedor
    offsetX = offsetParent.offsetLeft;
    offsetY = offsetParent.offsetTop;
    draw(); // dibujar joystick
    if (callback) callback(that.x, that.y);
  });
  
  eventArea.addEventListener("touchend", function () {
    that.pressed = false;
    joyX = centerX;
    joyY = centerY;
    that.x = 0;
    that.y = 0;
    that.s = 0;
    draw();
    if (callback) callback(that.x, that.y);
  });
  
  
  // dibujar joystick en canvas
  function draw () {
    ctx.clearRect(0, 0, W, H);
    
    // color
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    
    // circulo externo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 3/4, 0, Math.PI * 2, false);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    
    // circulo interno
    ctx.beginPath();
    ctx.arc(joyX, joyY, joyRadius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }
  
  this.container = container;
  this.canvas = canvas;
  this.context = ctx;
  this.x = 0; //joy frac x
  this.y = 0; //joy frac y
  this.pressed = false;
  draw();
};