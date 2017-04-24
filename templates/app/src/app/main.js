import {Ion} from 'ion-cloud';
import {easel} from './app';

// This makeItRain demo constantly keeps 100 particles (dollars) on the screen
export function makeItRain() {
  var headerText = '<%= name %> Version <%= appVersion %> by <%= authorName %>',
      shirtWidth = 0, shirtLeft = 0, shirtHeight = 0, shirtTop = 0,
      logoWidth = 0, logoHeight = 0,
      shirt = new Image(),
      logo = new Image(),
      dollar = new Image(),
      v = easel.viewport, //viewport holds width and height of canvas
      ctx = easel.ctx, //link to canvas 2d drawing context
      makeItRain = new Ion(ctx,v), //animation class
      r = easel.randomInteger, //lowerbound, upperbound, isInteger?
      gatherShirtSize = ()=>{
        shirtWidth = v.h / shirt.height * shirt.width;
        shirtLeft = v.w / 2 - shirtWidth / 2;
        shirtHeight = v.h;
        shirtTop = 0;
        if(shirtWidth>v.w){
          shirtLeft = 0;
          shirtWidth = v.w;
          shirtHeight = v.w / shirt.width * shirt.height;
          shirtTop = v.h / 2 - shirtHeight / 2;
        } //end if
        logoWidth = shirtWidth / 6;
        logoHeight = shirtHeight / 4;
      };

  // Lady shirt in the background
  shirt.src = 'http://i.imgur.com/Nvfvy87.png';
  shirt.onload = ()=> gatherShirtSize();
  easel.config = ()=>{
    v = easel.viewport; //viewport could have changed on resize
    gatherShirtSize();
  };

  // Gulp logo ontop of the lady shirt
  logo.src = 'http://i.imgur.com/dlwtnzo.png';

  // Dollar asset that floats from the top
  dollar.src = 'http://i.imgur.com/nLTCnEP.png';

  // Declare and initialize the scene
  makeItRain.quantity = 100;
  makeItRain.startX = ()=> r(1, v.w); //start x location
  makeItRain.startY = 15; //start y location
  makeItRain.endX = ()=> r(1, v.w); //destination x location (minus wind factor)
  makeItRain.endY = v.h; //destination y location (minus wind factor)
  makeItRain.windX = ()=> r(0, 0.5) - 0.25; // wind-x variant factor
  makeItRain.windY = 0; //wind-y variant factor
  makeItRain.image = dollar; //pass an image for the particle
  makeItRain.imageWidth = 25; //lets override the width of the image
  makeItRain.imageHeight = 50; //lets override the height of the image
  makeItRain.tweenCurrent = 0;
  makeItRain.tweenDuration = 1000;
  makeItRain.tweenType = 'linear';
  makeItRain.onParticleEnd = makeItRain.reevaluate;
  makeItRain.clearFrame = ()=>{ //overriding the clear frame function
    let x = v.w/2-logoWidth/2,
        y = v.h/2-logoHeight/2;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, v.w, v.h);
    ctx.font = '18px Courier New';
    ctx.drawImage(shirt, shirtLeft, shirtTop, shirtWidth, shirtHeight);
    ctx.drawImage(logo, x, y, logoWidth, logoHeight);
    ctx.fillStyle = 'rgb(255,255,0)';
    ctx.fillText(headerText, 5, v.h - 5);
  };
  makeItRain.populate(r(200,500)); //pass a custom wait function between particles
  makeItRain.process(); //begin processing the scene
} //end app()
