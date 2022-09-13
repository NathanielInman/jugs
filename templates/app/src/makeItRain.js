import { Ion } from '@ion-cloud/core';
import { easel } from './index';

// This makeItRain demo constantly keeps 100 particles (dollars) on the screen
export function makeItRain () {
  let shirtWidth = 0;
  let shirtLeft = 0;
  let shirtHeight = 0;
  let shirtTop = 0;
  let logoWidth = 0;
  let logoHeight = 0;

  const headerText = '<%= name %> Version <%= appVersion %> by <%= authorName %>';
  const ctx = easel.ctx; // link to canvas 2d drawing context
  const shirt = new Image();
  const logo = new Image();
  const dollar = new Image();
  const makeItRain = new Ion(easel); // animation class
  const gatherShirtSize = () => {
    shirtWidth = easel.viewport.h / shirt.height * shirt.width;
    shirtLeft = easel.viewport.w / 2 - shirtWidth / 2;
    shirtHeight = easel.viewport.h;
    shirtTop = 0;
    if (shirtWidth > easel.viewport.w) {
      shirtLeft = 0;
      shirtWidth = easel.viewport.w;
      shirtHeight = easel.viewport.w / shirt.width * shirt.height;
      shirtTop = easel.viewport.h / 2 - shirtHeight / 2;
    } // end if
    logoWidth = shirtWidth / 6;
    logoHeight = shirtHeight / 4;
  };

  // Lady shirt in the background
  shirt.src = './assets/shirt.png';
  shirt.onload = () => gatherShirtSize();
  easel.config = () => {
    gatherShirtSize();
  };

  // Gulp logo ontop of the lady shirt
  logo.src = './assets/gulp.png';

  // Dollar asset that floats from the top
  dollar.src = './assets/money.png';

  // Declare and initialize the scene
  makeItRain.quantity = 100;
  makeItRain.startX = () => Math.random() * easel.viewport.w; // start x location
  makeItRain.startY = 15; // start y location
  makeItRain.endX = () => Math.random() * easel.viewport.w; // destination x location (minus wind factor)
  makeItRain.endY = () => easel.viewport.h; // destination y location (minus wind factor)
  makeItRain.windX = () => Math.random() * 0.5 - 0.25; // wind-x variant factor
  makeItRain.windY = 0; // wind-y variant factor
  makeItRain.image = dollar; // pass an image for the particle
  makeItRain.imageWidth = 25; // lets override the width of the image
  makeItRain.imageHeight = 50; // lets override the height of the image
  makeItRain.tweenDuration = 1000;
  makeItRain.tweenCurrent = () => Math.random() * makeItRain.tweenDuration;
  makeItRain.tweenType = 'linear';
  makeItRain.onParticleEnd = makeItRain.reevaluate;
  makeItRain.onEscape = makeItRain.reevaluate;
  makeItRain.clearFrame = () => { // overriding the clear frame function
    const x = easel.viewport.w / 2 - logoWidth / 2;
    const y = easel.viewport.h / 2 - logoHeight / 2;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, easel.viewport.w, easel.viewport.h);
    ctx.font = '18px Courier New';
    ctx.drawImage(shirt, shirtLeft, shirtTop, shirtWidth, shirtHeight);
    ctx.drawImage(logo, x, y, logoWidth, logoHeight);
    ctx.fillStyle = 'rgb(255,255,0)';
    ctx.fillText(headerText, 5, easel.viewport.h - 5);
  };
  makeItRain.populate(); // pass a custom wait function between particles
  makeItRain.process(); // begin processing the scene
} // end app()
