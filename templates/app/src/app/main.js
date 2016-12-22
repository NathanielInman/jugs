import {Ion,easel} from 'ion-cloud';

// This makeItRain demo constantly keeps 100 particles (dollars) on the screen
export function makeItRain() {
  var headerText = '<%= name %> Version <%= appVersion %> by <%= authorName %>',
      shirtWidth = 0, shirtLeft = 0, // ease logical checks at runtime by
      logoWidth = 0, logoHeight = 0, // preprocessing the sizes of the images
      shirt = new Image(),
      logo = new Image(),
      dollar = new Image(),
      makeItRain = new Ion(100);

  // Lady shirt in the background
  shirt.src = 'http://i.imgur.com/Nvfvy87.png';
  shirt.onload = ()=>{
    shirtWidth = v.h / shirt.height * shirt.width;
    shirtLeft = v.w / 2 - shirtWidth / 2;
  };
  easel.config = ()=>{
    shirtWidth = v.h / shirt.height * shirt.width;
    shirtLeft = v.w / 2 - shirtWidth / 2;
  };

  // Gulp logo ontop of the lady shirt
  logo.src = 'http://i.imgur.com/dlwtnzo.png';
  logo.onload = function recheck() {
    if(!shirtWidth){ //need shirt to load first
      setTimeout(()=> recheck(),1); //keep checking until shirt loads
    }else{
      logoWidth = shirtWidth / 6;
      logoHeight = shirtWidth / logo.width * logo.height / 6;
    } //end if
  };

  // Dollar asset that floats from the top
  dollar.src = 'http://i.imgur.com/nLTCnEP.png';

  // Declare and initialize the scene
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
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, v.w, v.h);
    ctx.font = '18px Courier New';
    ctx.drawImage(shirt, shirtLeft, 0, shirtWidth, v.h);
    ctx.drawImage(logo, v.w / 2 - logoWidth / 2, v.h / 2 - logoHeight / 2, logoWidth, logoHeight);
    ctx.fillStyle = 'rgb(255,255,0)';
    ctx.fillText(headerText, 5, v.h - 5);
  };
  makeItRain.populate(r(200,500)); //pass a custom wait function between particles
  makeItRain.process(); //begin processing the scene
} //end app()


