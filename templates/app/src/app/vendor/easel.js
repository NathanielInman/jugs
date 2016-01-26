/**
 * Easel sets up a canvas that will fit the perspective of the window and
 * automatically adjust in size when the window is resized. It also makes
 * available a few handy variables as well:
 *
 * ctx: context of the canvas (ctx.fillRect(0,0,v.w,v.h))
 * v.w: viewport width in pixels
 * v.h: viewport height in pixels
 * r(number): random decimal between 0 and number - left inclusive [0,number)
 * r(number,0,1): random integer between 0 and number - left inclusive [0,number)
 * r(number1,number2): random dec between numbers - left inclusive [num1,num2)
 * r(number1,number2): random int between numbers - left inclusive [num1,num2)
 * Easel.background: default color to clear canvas with
 * Easel.redraw(): force-call drawing function
 * Easel.config(): override to set up viewport or canvas specific variables
 * Easel.onDraw(): override to set up personallized clear canvas
 */
/*eslint-disable*/
export var Easel=(function(a){
    if(!!window.CanvasRenderingContext2D){Easel.activated=true;}else{return false;}
    var W = window,
    D = document,
    M = Math,
    C = D.createElement("canvas");
    window.ctx = C.getContext("2d");
    var $ = function(c) {
        return D.getElementById(c)
    },
    q = function() {
        C.width = window.v.w;
        C.height = window.v.h
    },
    u = function() {
        ctx = C.getContext("2d")
    },
    w = function() {
        var d = W,
        b = "inner";
        if (!(d.innerWidth)) {
            b = "client";
            d = D.documentElement || D.body
        }
        return {
            w: d[b + "Width"],
            h: d[b + "Height"]
        }
    };
    window.v = w();
    a.background = "#000";
    a.redraw = function() {
      if(!a.started){a.config();a.started=true}
      a.onDraw();
    };
    a.started = false;
    a.config = function(){};
    a.onDraw = function(){
      ctx.fillStyle = a.background;
      ctx.fillRect(0, 0, window.v.w, window.v.h)
    };
    W.r = function(f, g, e) {
        f = !g ? 0 * (g = f) : f > g ? g + (d = f) - g : f;
        e = e || 0;
        g = M.random() * (g - f) + f;
        return e ? g | 0 : g
    };
    W.onresize = function() {
        W.v = w();
        q();
        a.config();
        a.redraw()
    };
    D.body.appendChild(C);
    var d = document.createElement("style");
    d.type = "text/css";
    d.rel = "stylesheet";
    d.innerHTML = "body{background-color:" + a.background + ";margin:0;}canvas{position:fixed;left:0;top:0;right:0;bottom:0;}";
    D.getElementsByTagName("head")[0].appendChild(d);
    q();
    return a;
})(Easel || (Easel = {}));
/*eslint-enable*/
