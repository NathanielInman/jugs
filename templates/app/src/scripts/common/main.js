/*
 * ┏━━━┳┓      ┏┓      ┏┳┓ ┏┳━━━┳━━━┓
 * ┃┏━┓┃┃      ┃┃      ┃┃┃ ┃┃┏━┓┃┏━┓┃
 * ┃┗━━┫┃┏┓┏┳━━┫┗━┓    ┃┃┃ ┃┃┃ ┗┫┗━━┓
 * ┗━━┓┃┃┃┃┃┃━━┫┏┓┃  ┏┓┃┃┃ ┃┃┃┏━╋━━┓┃
 * ┃┗━┛┃┗┫┗┛┣━━┃┃┃┃  ┃┗┛┃┗━┛┃┗┻━┃┗━┛┃
 * ┗━━━┻━┻━━┻━━┻┛┗┛  ┗━━┻━━━┻━━━┻━━━┛
 * The following few lines are to help jshint linting
 **********************************/

var ctx = ctx || function(){};
var v = v || {w:0,h:0};
var r = r || function(){};
var Ion = Ion || function(){};

/**
 * This nest demo constantly keeps 1000 ions on the screen and gives them tails with
 * a transparent overlay trick. The end effect is particles that explode out from a center
 * and trail upward
 *
 * @type {Class} Ion utilizes the ion.js library
 */
function app() {
  "use strict";

  var
  nest = new Ion(1000);
  nest.color = 'rgba(128,128,128,0.5)';
  nest.clear = false;
  nest.sx = function () {return r(v.w / 2 - 50, v.w / 2 + 50);};
  nest.sy = function () {return r(v.h / 5 * 4 - 50, v.h / 5 * 4 + 50);};
  nest.dx = v.w / 2;
  nest.dy = 0;
  nest.wx = function () {return r(0, 3) - 1.5;};
  nest.wy = function () {return r(0, 3) - 1.5;};
  nest.size = function () {return r(1, 3);};
  nest.tween_type = function () {return r(19, 20, false);};
  nest.onEnd = function (id) {this.particle.splice(id, 1, this.getNew(id));};
  nest.onEscape = function (id) {this.particle.splice(id, 1, this.getNew(id));};
  nest.getNew = function (atom) {
    var sx = this.sx(atom);
    var sy = this.sy(atom);
    var wx = sx > v.w / 2 ? r(0, 1.5) : r(0, 1.5) - 1.5;
    var wy = sy > v.h / 2 ? r(0, 1.5) : r(0, 1.5) - 1.5;
    return {
      id: atom, //be able to reference each particle individually outside of the class
      sx: sx,
      sy: sy,
      x : sx,
      y : sy,
      dx: typeof this.dx === 'function' ? this.dx(atom) : this.dx,
      dy: typeof this.dy === 'function' ? this.dy(atom) : this.dy,
      c : typeof this.tween_current === 'function' ? this.tween_current(atom) : this.tween_current,
      d : 500,
      tt: typeof this.tween_type === 'function' ? this.tween_type(atom) : this.tween_type,
      s : typeof this.size === 'function' ? this.size(atom) : this.size,
      wx: wx,
      wy: wy
    };
  };
  nest.populate();
  nest.process();

  /**
   * The following timeout clears the screen with a 20% transparent black box every 50ms. It
   * gives the illusion that the moving rectangles have a trail behind them. It's an interesting result
   * but due to the transparency can cause lag on slower browsers or computers.
   *
   * @return {Void} This function doesn't return a result
   */
  var shirt = new Image();
  shirt.src = 'http://i.imgur.com/Nvfvy87.png';
  var logo = new Image();
  logo.src = 'http://i.imgur.com/dlwtnzo.png';
  (function fadeIt() {
    var shirtWidth = v.h / shirt.height * shirt.width, shirtLeft = v.w / 2 - shirtWidth / 2;
    var logoWidth = shirtWidth / 6, logoHeight = shirtWidth / logo.width * logo.height / 6;
    ctx.drawImage(shirt, shirtLeft, 0, shirtWidth, v.h);
    ctx.drawImage(logo, v.w / 2 - logoWidth / 2, v.h / 2 - logoHeight / 2, logoWidth, logoHeight);
    var headerText = '<%= name %> Version <%= appVersion %> by <%= authorName >';
    ctx.fillStyle = 'rgb(255,255,0)';
    ctx.font = '18px Courier New';
    ctx.fillText(headerText, 5, v.h - 5);
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, v.w, v.h);
    setTimeout(function () {fadeIt();}, 50);
  })();
} //end app()