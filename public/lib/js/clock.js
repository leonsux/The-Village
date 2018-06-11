function Clock(option){
  this.can = document.getElementById(option.id);
  this.ctx = this.can.getContext('2d');
  this.pi = Math.PI;
  this.what = 'AM';
  this.size = option.size?option.size:300;
  this.bgColor = option.bgColor?option.bgColor:'#fff';
  this.baseColor = option.baseColor?option.baseColor:'rgb(131, 175, 155)';
  this.hColor = option.hColor?option.hColor:'rgb(252, 157, 154)';
  this.mColor = option.mColor?option.mColor:'#9370DB';
  this.sColor = option.sColor?option.sColor:'#98FB98';
  this.tColor = option.tColor?option.tColor:'rgb(131, 175, 155)';
  this.init();
}

Clock.prototype = {
  init: function(){
    this.can.style.background = this.bgColor;
    this.can.width = this.size;
    this.can.height = this.size;
    // 画笔配置
    this.ctx.lineCap = 'round';
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.font = "normal " + this.size/10 + "px 微软雅黑";
    this.go();
    setInterval(function(){
      this.go();
    }.bind(this), 1000);
  },
  go: function(){
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if (h > 12) {
      h -= 12;
      what = 'PM';
    } else {
      what = 'AM';
    }
    var bl_h = h / 12;
    var bl_m = m / 60;
    var bl_s = s / 60;
    this.ctx.clearRect(0,0,500,500);
    this.drawB(h, m, s);
    this.drawH(bl_h * 2 * this.pi);
    this.drawM(bl_m * 2 * this.pi);
    this.drawS(bl_s * 2 * this.pi);
    this.drawT(h, m, s);
  },
  // 画基线
  drawB: function(){
    this.ctx.strokeStyle = this.baseColor;
    this.ctx.lineWidth = this.size/75;
    this.ctx.beginPath();
    this.ctx.arc(this.size/2, this.size/2, this.size/2 - 20, 0, 2 * this.pi);
    this.ctx.stroke();
    this.ctx.closePath();
  },
  //  H， M， S 时分秒
  drawH: function(aim){
    this.draw(this.hColor, this.size/15, aim)
  },
  drawM: function(aim){
    this.draw(this.mColor, this.size/25, aim)
  },
  drawS: function(aim){
    this.draw(this.sColor, this.size/75, aim)
  },
  // 文字 ： PM: 04:12
  drawT: function(h, m, s){
    this.ctx.fillStyle = this.tColor;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    this.ctx.fillText(what+' '+h+':'+m+':'+s, this.size/2, this.size/2);
  },
  draw: function(color, size, aim){
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = size;
    this.ctx.beginPath();
    this.ctx.arc(this.size/2, this.size/2, this.size/2 - 20, -this.pi/2, aim - this.pi/2);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}