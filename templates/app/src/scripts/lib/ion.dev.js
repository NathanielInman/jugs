/**********************************************************************************\
 Ion.js performs tweening movements and operations on particles and was created
 to use in conjunction with Easel.js
 Copyright (C) 2014 Nathaniel Inman

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 \*********************************************************************************/
var Ion=function(q,s,x,y,dx,dy){
  this.particle=[];
  this.clear=true;
  this.quantity=q||1;
  this.sx=x||0;
  this.sy=y||0;
  this.dx=dx||1;
  this.dy=dy||1;
  this.wx=0;
  this.wy=0;
  this.m=0; //modulation factor - only runs if it's set explicitly
  this.color='#48F';
  this.clearColor='#000';
  this.retain=null; //this can be set as a function for a draw after clear screen
  this.size=s||1;
  this.tween_type=0;
  this.tween_current=0;
  this.tween_duration=1000;
  this.tween_speed=1;
  this.effects=0;
};

/**
 * Ease is a tweening function using Robert Penner's equations to identify the
 * values of an axis in respect to it's start location, destination, and the normalization
 * of the transition between the two with respect to starting time, a given duration, and the
 * function to impose upon the transition from that start position to it's destination.
 *
 * @param  {float}   b    Beginning value of the property
 * @param  {float}   c    Change between the beginning and destination value of the property
 * @param  {integer} t    Current time or position of the tween
 * @param  {integer} d    total time of the tween
 * @param  {float}   o    modification orientation strength
 * @param  {integer} type specifies the tweening type
 * @return {float}        current x or y location
 */
Ion.prototype.ease=function ease(b,c,t,d,o,type){
  type=type|0; //force integer in the case float is passed
  if(type===0){ //linear
    return c*t/d+b;
  }else if(type==1){ //ease-in quad
    return c*(t/=d)*t+b;
  }else if(type==2){ //ease-out quad
    return -c*(t/=d)*(t-2)+b;
  }else if(type==3){ //ease-in-out quad
    return (t/=d/2)<1?c/2*t*t+b:-c/2*((--t)*(t-2)-1)+b;
  }else if(type==4){ //ease-in cubic
    return c*(t/=d)*t*t+b;
  }else if(type==5){ //ease-out cubic
    return c*((t=t/d-1)*t*t+1)+b;
  }else if(type==6){ //ease-in-out cubic
    return ((t/=d/2)<1)?c/2*t*t*t+b:c/2*((t-=2)*t*t+2)+b;
  }else if(type==7){ //ease-in quart
    return c*(t/=d)*t*t*t+b;
  }else if(type==8){ //ease-out quart
    return -c*((t=t/d-1)*t*t*t-1)+b;
  }else if(type==9){ //ease-in-out quart
    return ((t/=d/2)<1)?c/2*t*t*t*t+b:-c/2*((t-=2)*t*t*t-2)+b;
  }else if(type==10){ //ease-in quint
    return c*(t/=d)*t*t*t*t+b;
  }else if(type==11){ //ease-out quint
    return c*((t=t/d-1)*t*t*t*t+1)+b;
  }else if(type==12){ //ease-in-out quint
    return ((t/=d/2)<1)?c/2*t*t*t*t*t+b:c/2*((t-=2)*t*t*t*t+2)+b;
  }else if(type==13){ //ease-in sine
    return -c*Math.cos(t/d*(Math.PI/2))+c+b;
  }else if(type==14){ //ease-out sine
    return -c/2*(Math.cos(Math.PI*t/d)-1)+b;
  }else if(type==15){ //ease-in exponential
    return (t===0)?b:c*Math.pow(2,10*(t/d-1))+b;
  }else if(type==16){ //ease-out exponential
    return (t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;
  }else if(type==17){ //ease-in-out exponential
    return (t===0)?b:((t==d)?b+c:(((t/=d/2)<1)?c/2*Math.pow(2,10*(t-1))+b:(c/2*(-Math.pow(2,-10*--t)+2)+b)));
  }else if(type==18){ //ease-in circular
    return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;
  }else if(type==19){ //ease-out circular
    return c*Math.sqrt(1-(t=t/d-1)*t)+b;
  }else if(type==20){ //ease-in-out circular
    return ((t/=d/2)<1)?-c/2*(Math.sqrt(1-t*t)-1)+b:c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;
  }else if(type==21){ //ease-in elastic loose
    return ease(this,b,c,t,d,0.5,22);
  }else if(type==22){ //ease-in elastic normal
    return (function(){
      var s=1.70158,p=0,a=c;
      if (t===0) return b;
      if ((t/=d)==1) return b+c;
      if (!p) p=d*o;
      if (a < Math.abs(c+0.1)) { a=c;s=p/4; }
      else s = p/(2*Math.PI) * Math.asin (c/a);
      return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    })();
  }else if(type==23){ //ease-in elastic strong
    return ease(b,c,t,d,0.1,22);
  }else if(type==24){ //ease-out elastic loose
    return ease(b,c,t,d,0.5,25);
  }else if(type==25){ //ease-out elastic normal
    return (function(){
      var s=1.70158,p=0,a=c;
      if (t===0) return b;
      if ((t/=d)==1) return b+c;
      if (!p) p=d*o;
      if (a < Math.abs(c+0.1)) { a=c;s=p/4; }
      else s = p/(2*Math.PI) * Math.asin (c/a);
      return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    })();
  }else if(type==26){ //ease-out elastic strong
    return ease(b,c,t,d,0.1,25);
  }else if(type==27){ //ease-in-out elastic loose
    return ease(b,c,t,d,0.5,28);
  }else if(type==28){ //ease-in-out elastic normal
    return (function(){
      var s=1.70158,p=0,a=c;
      if (t===0) return b;
      if ((t/=d/2)==2) return b+c;
      if (!p) p=d*(o*1.5);
      if (a < Math.abs(c+0.1)) { a=c;s=p/4; }
      else s = p/(2*Math.PI) * Math.asin (c/a);
      if (t < 1) return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
      return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    })();
  }else if(type==29){ //ease-in-out elastic strong(b,c,t,d,o,type)
    return ease(b,c,t,d,0.1,28);
  }else if(type==30){ //ease-in back
    return c*(t/=d)*t*((1.70158+1)*t - 1.70158) + b;
  }else if(type==31){ //ease-out back
    return c*((t=t/d-1)*t*((1.70158+1)*t + 1.70158) + 1) + b;
  }else if(type==32){ //ease-in-out back
    var s=1.70158;
    return ((t/=d/2) < 1)?c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b:c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  }else if(type==33){ //ease-in bounce
    return c-ease(0,c,d-t,d,0,34)+b;
  }else if(type==34){ //ease-out bounce
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
    } else {
      return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;}
  }else if(type==35){ //ease-in-out bounce
    if(t<d/2){
      return ease(0,c,t*2,d,0,33)*0.5+b;
    }else{
      return ease(0,c,t*2-d,d,0,34)*0.5+c*0.5+b;
    } //end if
  }//end if
};

/**
 * getNew will create a new particle and return that result. It's possible to override the
 * function to develop a custom particle generator for more specific applications.
 *
 * @param  {Integer} atom Particle index
 * @return {Object}       The particle object is returned
 */
Ion.prototype.getNew=function(atom){
  this.onCreate(); //even fired as a new particle is created
  var sx=typeof this.sx=='function'?this.sx():this.sx;
  var sy=typeof this.sy=='function'?this.sy():this.sy;
  return {
    id:atom, //be able to reference each particle individually outside of the class
    sx:sx,
    sy:sy,
    x:sx,
    y:sy,
    dx:typeof this.dx            =='function'?this.dx():this.dx,
    dy:typeof this.dy            =='function'?this.dy():this.dy,
    c:typeof this.tween_current  =='function'?this.tween_current():this.tween_current,
    d:(typeof this.tween_duration =='function'?this.tween_duration():this.tween_duration)|0,
    tt:typeof this.tween_type    =='function'?this.tween_type():this.tween_type,
    s:typeof this.size           =='function'?this.size():this.size,
    wx:typeof this.wx            =='function'?this.wx():this.wx,
    wy:typeof this.wy            =='function'?this.wy():this.wy,
    image:this.image,
    imageWidth:this.imageWidth,
    imageHeight:this.imageHeight
  };
};

/**
 * Reset will perform a small number of operations to reset a particle back to a starting state
 * instead of actually generating a new particle. This can be helpful if you want to retain it's
 * current location or properties that have been computed thus far. It's further helpful because it
 * can be overridden to perform other operations post-completion of the particles duration.
 *
 * @param  {Integer} atom Particle index
 * @return {Void}         Function doesn't return a value
 */
Ion.prototype.reset=function(atom){
  this.particle[atom].x  =this.particle[atom].sx=(typeof this.sx=='function'?this.sx():this.sx);
  this.particle[atom].y  =this.particle[atom].sy=(typeof this.sy=='function'?this.sy():this.sy);
  this.particle[atom].dx =(typeof this.dx=='function'?this.dx():this.dx);
  this.particle[atom].dy =(typeof this.dy=='function'?this.dy():this.dy);
  this.particle[atom].c  =0;
};

/**
 * Populate pushes a new particle into the particles array then checks to see if the specified
 * particle number has been reached, if it hasn't, then it queues up itself asynchronously to
 * create another particle. This recursive action continues until the total particle quantity
 * is reached.
 *
 * @return {Void} Function doesn't return a value
 */
Ion.prototype.populate=function(){
  var that=this;
  this.particle.push(this.getNew(this.particle.length));
  if(this.particle.length<this.quantity)setTimeout(function(){that.populate();},1);
};

/**
 * Wind applies noise values on the movement patterns of the particles instead of them performing
 * their tweening operations unhindered. This gives a more dynamic feel to their movement. The wind
 * patterns and function can be overridden to be dynamic or conditional as desired.
 *
 * @param  {Integer} atom Particle index
 * @return {Void}         Function doesn't return a value
 */
Ion.prototype.wind=function(atom){
  this.particle[atom].dx +=this.particle[atom].wx;
  this.particle[atom].dy +=this.particle[atom].wy;
  this.particle[atom].sx +=this.particle[atom].wx;
  this.particle[atom].sy +=this.particle[atom].wy;
};

/**
 * Draw simply draws a particle indicated by its index number
 *
 * @param  {Integer} atom Particle index
 * @return {Void}         Function doesn't return a value
 */
Ion.prototype.draw=function(atom){
  if(this.particle[atom].image){
    ctx.drawImage(this.particle[atom].image,this.particle[atom].x-this.particle[atom].imageWidth/2,this.particle[atom].y-this.particle[atom].imageHeight/2);
  }else{
    ctx.fillRect(this.particle[atom].x,this.particle[atom].y,this.particle[atom].s,this.particle[atom].s);
  } //end if
};

/**
 * This function exits early if it wasn't explicitly declared, otherwise it runs the function specified
 * and sends it the current atom, in the case that the function utilizes case-specific information. It also
 * sends the cx,cy,dx, and dy variables
 *
 * @param  {Integer} atom Particle index
 * @return {Void}         Function doesn't return a value
 */
Ion.prototype.modulate=function(atom){
  if(!(typeof this.m === 'function'))return;
  this.m(atom,this.particle[atom].x,this.particle[atom].y,this.particle[atom].dx,this.particle[atom].dy);
};

/**
 * OnCreate function is called when a particle is created for the first time. This allows one to keep track
 * of how far into the creation of all the particles one is given the particle total that they already control.
 *
 * @return {Void} Function doesn't return a value, but can be overriden to make a callback as desired
 */
Ion.prototype.onCreate=function(){};
/**
 * OnEnd function is called after a particle finishes its tweening motion. This is merely a template function
 * that is required to be overridden.
 *
 * @return {Void} Function doesn't return a value, but can be overridden to make a callback as desired
 */
Ion.prototype.onEnd=function(){};

/**
 * OnEscape function is called after a particle leaves the view space. This is merely a template function
 * that is required to be overridden.
 *
 * @return {Void} Function doesn't return a value, but can be overridden to make a callback as desired
 */
Ion.prototype.onEscape=function(){};

/**
 * Process is the automatic function that calls the getFrame main function and after updating, queues the next
 * update frame. It will also auto-clear. This function is mostly used for testing a single Ion instance. Most
 * mock-ups of Ion should be done using the getFrame function and manually resetting the canvas as needed
 *
 * @return {Void} Function doesn't return a value
 */
Ion.prototype.process=function(){
  var that=this;
  if(this.clear){
    ctx.fillStyle=this.clearColor;
    ctx.fillRect(0,0,v.w,v.h);
    if(this.retain){
      this.retain(); //if there is a retaining script, run it
    }
  } //end if
  this.getFrame(); //call getFrame() to receive and flip all pixel information for next update
  setTimeout(function(){
    that.process();
  },this.tween_speed);
};

/**
 * getFrame is the main function that performs operations on each particle. It immediately flips those variables
 * after they've been computed. There is no clearing of pixels, it superimposes onto what's already available on the screen
 * so any clearing will have to be done through the process function or manually.
 *
 * @return {Void} Function doesn't return a value
 */
Ion.prototype.getFrame=function(){
  ctx.fillStyle=this.color;
  for(atom in this.particle){
    p=this.particle[atom]; //reference to clean up code
    if(p.c==p.d)continue; //skip a done movement process
    this.wind(atom);
    this.draw(atom);
    this.modulate(atom);
    if(p.x<0||p.y<0||p.x>v.w||p.y>v.h)this.onEscape(atom);
    p.c++; //increment the current iteration of the tween by one
    if(p.c==p.d)this.onEnd(atom); //movement process finished
    if((p.x)|0!==(p.dx)|0)p.x=this.ease(p.sx,p.dx-p.sx,p.c,p.d,0.3,p.tt);
    if((p.y)|0!==(p.dy)|0)p.y=this.ease(p.sy,p.dy-p.sy,p.c,p.d,0.3,p.tt);
  } //end for
};