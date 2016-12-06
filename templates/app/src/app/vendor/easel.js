/*eslint-disable */
export class Easel{
  constructor(){
    if(!!window.CanvasRenderingContext2D){
      this.activated = true; }else{
      this.activated = false;
      return false;
    } //end if
    window.W = window;
    window.D = document;
    window.M = Math;
    window.C = D.createElement('canvas');
    window.ctx = C.getContext('2d');
    window.v = this.acquireViewport();
    window.r = function(f, g, e) {
        f = !g ? 0 * (g = f) : f > g ? g + (d = f) - g : f;
        e = e || 0;
        g = M.random() * (g - f) + f;
        return e ? g | 0 : g;
    };
    window.onresize = ()=>{
        W.v = this.acquireViewport();
        this.resizeCanvas();
        this.config();
        this.redraw();
    };
    this.background = '#000';
    this.started = false;
    document.body.appendChild(C);
    let d = document.createElement('style');
    d.type = 'text/css';
    d.rel = 'stylesheet';
    d.innerHTML = `body{background-color:${this.background};margin:0;}
                   canvas{position:fixed;left:0;top:0;right:0;bottom:0;}`;
    document.getElementsByTagName('head')[0].appendChild(d);
    this.resizeCanvas();
  }
  resizeCanvas(){
    C.width = v.w;
    C.height = v.h;
  }
  acquireContext(){
    ctx = window.C.getContext('2d');
  }
  acquireViewport(){
    var d = W, b = 'inner';

    if(!(d.innerWidth)){
      b = 'client';
      d = D.documentElement || D.body;
    } //end if
    return {
      w: d[b + 'Width'],
      h: d[b + 'Height']
    };
  }
  redraw(){
    if(!this.started){
      this.config();
      this.started=true;
    } //end if
    this.onDraw();
  }
  config(){}
  onDraw(){
    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, v.w, v.h);
  }
}
export const easel = new Easel();

export default {easel,Easel};
/*eslint-enable */

