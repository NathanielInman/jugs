/*eslint-disable */
export class Ion{
  constructor(q,s,x,y,dx,dy){
    this.collection=[];
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
  }

  // Ease is a tweening function using Robert Penner's equations to identify
  // the values of an axis in respect to it's start location, destination,
  // and the normalization of the transition between the two with respect to
  // starting time, a given duration, and the function to impose upon the
  // transition from that start position to it's destination.
  ease(beginning,delta,time,totalTime,orientation,tweenType){
    let result, //returns the current x or y location
        b = beginning, //beginning value of the particle
        c = delta, //change between the beginning and destination value
        t = time, //current time or position of the tween
        d = totalTime, //total time of the tween
        o = orientation, //modification orientation strength
        type = tweenType|0; //force integer in the case float is passed;

    if(type===0){ //linear
      result = c*t/d+b;
    }else if(type===1){ //ease-in quad
      result = c*(t/=d)*t+b;
    }else if(type===2){ //ease-out quad
      result = -c*(t/=d)*(t-2)+b;
    }else if(type===3){ //ease-in-out quad
      result = (t/=d/2)<1?c/2*t*t+b:-c/2*((--t)*(t-2)-1)+b;
    }else if(type===4){ //ease-in cubic
      result = c*(t/=d)*t*t+b;
    }else if(type===5){ //ease-out cubic
      result = c*((t=t/d-1)*t*t+1)+b;
    }else if(type===6){ //ease-in-out cubic
      result = ((t/=d/2)<1)?c/2*t*t*t+b:c/2*((t-=2)*t*t+2)+b;
    }else if(type===7){ //ease-in quart
      result = c*(t/=d)*t*t*t+b;
    }else if(type===8){ //ease-out quart
      result = -c*((t=t/d-1)*t*t*t-1)+b;
    }else if(type===9){ //ease-in-out quart
      result = ((t/=d/2)<1)?c/2*t*t*t*t+b:-c/2*((t-=2)*t*t*t-2)+b;
    }else if(type===10){ //ease-in quint
      result = c*(t/=d)*t*t*t*t+b;
    }else if(type===11){ //ease-out quint
      result = c*((t=t/d-1)*t*t*t*t+1)+b;
    }else if(type===12){ //ease-in-out quint
      result = ((t/=d/2)<1)?c/2*t*t*t*t*t+b:c/2*((t-=2)*t*t*t*t+2)+b;
    }else if(type===13){ //ease-in sine
      result = -c*Math.cos(t/d*(Math.PI/2))+c+b;
    }else if(type===14){ //ease-out sine
      result = -c/2*(Math.cos(Math.PI*t/d)-1)+b;
    }else if(type===15){ //ease-in exponential
      result = (t===0)?b:c*Math.pow(2,10*(t/d-1))+b;
    }else if(type===16){ //ease-out exponential
      result = (t===d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;
    }else if(type===17){ //ease-in-out exponential
      if(t===0){
        result = b;
      }else if(t===d){
        result = b+c;
      }else if((t/=d/2)<1){
        result = c/2*Math.pow(2,10*(t-1))+b;
      }else{
        result = c/2*(Math.pow(2,-10*--t)+2)+b;
      } //end if
    }else if(type===18){ //ease-in circular
      result = -c*(Math.sqrt(1-(t/=d)*t)-1)+b;
    }else if(type===19){ //ease-out circular
      result = c*Math.sqrt(1-(t=t/d-1)*t)+b;
    }else if(type===20){ //ease-in-out circular
      result = ((t/=d/2)<1)?-c/2*(Math.sqrt(1-t*t)-1)+b:c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;
    }else if(type===21){ //ease-in elastic loose
      result = this.ease(this,b,c,t,d,0.5,22);
    }else if(type===22){ //ease-in elastic normal
      result = (()=>{
        var s=1.70158,p=0,a=c;

        if(t===0) return b;
        if((t/=d)===1) return b+c;
        if(!p) p=d*o;
        if(a < Math.abs(c+0.1)){
          a=c;s=p/4;
        }else{
          s = p/(2*Math.PI) * Math.asin(c/a);
        } //end if
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
      })();
    }else if(type===23){ //ease-in elastic strong
      result = this.ease(b,c,t,d,0.1,22);
    }else if(type===24){ //ease-out elastic loose
      result = this.ease(b,c,t,d,0.5,25);
    }else if(type===25){ //ease-out elastic normal
      result = (()=>{
        var s=1.70158,p=0,a=c;

        if (t===0) return b;
        if ((t/=d)===1) return b+c;
        if (!p) p=d*o;
        if(a < Math.abs(c+0.1)){
          a=c;s=p/4;
        }else{
          s = p/(2*Math.PI) * Math.asin(c/a);
        } //end if
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
      })();
    }else if(type===26){ //ease-out elastic strong
      result = this.ease(b,c,t,d,0.1,25);
    }else if(type===27){ //ease-in-out elastic loose
      result = this.ease(b,c,t,d,0.5,28);
    }else if(type===28){ //ease-in-out elastic normal
      result = (()=>{
        var s=1.70158,p=0,a=c;

        if(t===0) return b;
        if((t/=d/2)===2) return b+c;
        if(!p) p=d*(o*1.5);
        if(a < Math.abs(c+0.1)){
          a=c;s=p/4;
        }else{
          s = p/(2*Math.PI) * Math.asin(c/a);
        } //end if
        if (t < 1) return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
      })();
    }else if(type===29){ //ease-in-out elastic strong(b,c,t,d,o,type)
      result = this.ease(b,c,t,d,0.1,28);
    }else if(type===30){ //ease-in back
      result = c*(t/=d)*t*((1.70158+1)*t - 1.70158) + b;
    }else if(type===31){ //ease-out back
      result = c*((t=t/d-1)*t*((1.70158+1)*t + 1.70158) + 1) + b;
    }else if(type===32){ //ease-in-out back
      let s = 1.70158;

      if((t/=d/2)<1){
        result = c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
      }else{
        result = c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
      } //end if
    }else if(type===33){ //ease-in bounce
      result = c-this.ease(0,c,d-t,d,0,34)+b;
    }else if(type===34){ //ease-out bounce
      if ((t/=d) < (1/2.75)) {
        result = c*(7.5625*t*t) + b;
      } else if (t < (2/2.75)) {
        result = c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
      } else if (t < (2.5/2.75)) {
        result = c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
      } else {
        result = c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
      } //end if
    }else if(type===35){ //ease-in-out bounce
      if(t<d/2){
        result = this.ease(0,c,t*2,d,0,33)*0.5+b;
      }else{
        result = this.ease(0,c,t*2-d,d,0,34)*0.5+c*0.5+b;
      } //end if
    }//end if
    return result;
  } //end Ion.ease()

  // getNew will create a new particle and return that result. It's possible to override the
  // function to develop a custom particle generator for more specific applications.
  //
  // @param  {Integer} atom Particle index
  // @return {Object}       The particle object is returned
  getNew(atom){
    var sx,sy;

    this.onCreate(); //even fired as a new particle is created
    sx=typeof this.sx==='function'?this.sx():this.sx;
    sy=typeof this.sy==='function'?this.sy():this.sy;
    return {
      id: atom, //be able to reference each particle individually outside of the class
      sx: sx,
      sy: sy,
      x:  sx,
      y:  sy,
      dx: typeof this.dx==='function'?this.dx():this.dx,
      dy: typeof this.dy==='function'?this.dy():this.dy,
      c:  typeof this.tween_current==='function'?this.tween_current():this.tween_current,
      d:  (typeof this.tween_duration==='function'?this.tween_duration():this.tween_duration)|0,
      tt: typeof this.tween_type==='function'?this.tween_type():this.tween_type,
      s:  typeof this.size==='function'?this.size():this.size,
      wx: typeof this.wx==='function'?this.wx():this.wx,
      wy: typeof this.wy==='function'?this.wy():this.wy,
      image: typeof this.image==='function'?this.image():this.image,
      imageWidth: this.imageWidth,
      imageHeight: this.imageHeight
    };
  } //end Ion.getNew()

  // Reset will perform a small number of operations to reset a particle back
  // to a starting state instead of actually generating a new particle. This
  // can be helpful if you want to retain it's current location or properties
  // that have been computed thus far. It's further helpful because it can be
  // overridden to perform other operations post-completion of the particles
  // duration.
  //
  // @param  {Integer} atom Particle index
  // @return {Void}         Function doesn't return a value
  reset(particle){
    particle.x = particle.sx = (typeof this.sx==='function'?this.sx():this.sx);
    particle.y = particle.sy = (typeof this.sy==='function'?this.sy():this.sy);
    particle.dx = (typeof this.dx==='function'?this.dx():this.dx);
    particle.dy = (typeof this.dy==='function'?this.dy():this.dy);
    particle.c  = 0;
  } //end Ion.reset()

  // Populate pushes a new particle into the particles array then checks to see
  // if the specified particle number has been reached, if it hasn't, then it
  // queues up itself asynchronously to create another particle. This recursive
  // action continues until the total particle quantity is reached.
  //
  // @param wait Function passed that will return a integer in milliseconds to
  // force population wait between ions
  // @return {Void} Function doesn't return a value
  populate(wait){
    this.collection.push(this.getNew(this.collection.length));
    if(this.collection.length<this.quantity){
      if(typeof wait === 'function'){
        setTimeout(()=> this.populate(wait),wait());
      }else{
        requestAnimationFrame(()=> this.populate());
      } //end if
    } //end if
  } //end Ion.populate()

  // Wind applies noise values on the movement patterns of the particles
  // instead of them performing their tweening operations unhindered. This
  // gives a more dynamic feel to their movement. The wind patterns and
  // function can be overridden to be dynamic or conditional as desired.
  //
  // @param  {Integer} atom Particle index
  // @return {Void}         Function doesn't return a value
  wind(particle){
    particle.dx += particle.wx;
    particle.dy += particle.wy;
    particle.sx += particle.wx;
    particle.sy += particle.wy;
  } //end Ion.wind()

  // Draw simply draws a particle indicated by its index number
  //
  // @param  {Integer} atom Particle index
  // @return {Void}         Function doesn't return a value
  draw(particle){
    let p = particle,
        image = p.image;

    if(image && image instanceof Array && image.length){
      let scaleX = p.imageWidth/image[0].length,
          scaleY = p.imageHeight/image.length;

      image.forEach((yo,y)=>{
        yo.forEach((xo,x)=>{
          if(xo) ctx.fillRect(p.x+x*scaleX,p.y+y*scaleY,p.s*scaleX,p.s*scaleY);
        });
      });
    }else if(image){ //image was passed, use it instead of a pixel particle
      let px = p.x-p.imageWidth/2,
          py = p.y-p.imageHeight/2;

      if(p.imageWidth && p.imageHeight){ //sizes given for constrain
        ctx.drawImage(image,px,py,p.imageWidth,p.imageHeight);
      }else{ //no sizes given, just allow it to fill with images normal size
        ctx.drawImage(image,px,py);
      } //end if
    }else{
      ctx.fillRect(p.x,p.y,particle.s,p.s);
    } //end if
  } //end Ion.draw()

  // This function exits early if it wasn't explicitly declared, otherwise
  // it runs the function specified and sends it the current atom, in the
  // case that the function utilizes case-specific information. It also
  // sends the cx,cy,dx, and dy variables
  //
  // @param  {Integer} atom Particle index
  // @return {Void}         Function doesn't return a value
  modulate(particle){
    if(typeof this.m !== 'function') return;
    this.m(particle.id,particle.x,particle.y,particle.dx,particle.dy);
  } //end Ion.modulate()

  // OnCreate function is called when a particle is created for the first
  // time. This allows one to keep track of how far into the creation of all
  // the particles one is given the particle total that they already control.
  //
  // @return {Void} Function doesn't return a value, but can be overriden to
  // make a callback as desired
  onCreate(){}

  // OnEnd function is called after a particle finishes its tweening motion.
  // This is merely a template function that is required to be overridden.
  //
  // @return {Void} Function doesn't return a value, but can be overridden
  // to make a callback as desired
  onEnd(){}

  // OnEscape function is called after a particle leaves the view space.
  // This is merely a template function that is required to be overridden.
  //
  // @return {Void} Function doesn't return a value, but can be overridden
  // to make a callback as desired
  onEscape(){}

  // Process is the automatic function that calls the getFrame main
  // function and after updating, queues the next update frame. It will
  // also auto-clear. This function is mostly used for testing a single
  // Ion instance. Most mock-ups of Ion should be done using the getFrame
  // function and manually resetting the canvas as needed
  //
  // @return {Void} Function doesn't return a value
  process(){
    if(typeof this.clear === 'function'){ //override clear function, use it instead
      this.clear();
    } else if(this.clear){ //sent as some truthy value, likely boolean true
      ctx.fillStyle=this.clearColor;
      ctx.fillRect(0,0,v.w,v.h);
    } //end if
    if(this.clear && this.retain){
      this.retain(); //if there is a retaining script, run it
    } //end if
    this.getFrame(); //call getFrame() to receive and flip all pixel information for next update
    if(this.tween_speed===1){
      requestAnimationFrame(()=>this.process());
    }else{
      setTimeout(()=>this.process(),this.tween_speed);
    } //end if
  } //end Ion.process()

  // getFrame is the main function that performs operations on each particle.
  // It immediately flips those variables after they've been computed. There
  // is no clearing of pixels, it superimposes onto what's already available
  // on the screen so any clearing will have to be done through the process
  // function or manually.
  //
  // @return {Void} Function doesn't return a value
  getFrame(){
    ctx.fillStyle=this.color;
    this.collection.forEach(p=>{
      this.wind(p);
      this.draw(p);
      this.modulate(p);
      if(p.x<0||p.y<0||p.x>v.w||p.y>v.h)this.onEscape(p);
      p.c++; //increment the current iteration of the tween by one
      if(p.c===p.d)this.onEnd(p); //movement process finished
      if((p.x|0)!==(p.dx|0))p.x=this.ease(p.sx,p.dx-p.sx,p.c,p.d,0.3,p.tt);
      if((p.y|0)!==(p.dy|0))p.y=this.ease(p.sy,p.dy-p.sy,p.c,p.d,0.3,p.tt);
    });
  } //end Ion.getFrame()
} //end class Ion
/*eslint-enable */

