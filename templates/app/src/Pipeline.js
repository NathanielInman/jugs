import { Ion } from '@ion-cloud/core';

export class Pipeline {
  constructor (easel) {
    this.started = false;
    this.easel = easel;
    this.headerText = '<%= name %> Version <%= appVersion %> by <%= authorName %>';
    this.shirt = {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    this.logo = {
      width: 0,
      height: 0
    };
    this.assets = {
      shirt: new Image(),
      logo: new Image(),
      money: new Image()
    };
    this.assets.shirt.src = 'shirt.png';
    this.assets.shirt.onload = () => this.add('shirt');
    this.assets.shirt.loaded = false;
    this.assets.logo.src = 'logo.png';
    this.assets.logo.onload = () => this.add('logo');
    this.assets.logo.loaded = false;
    this.assets.money.src = 'money.png';
    this.assets.money.onload = () => this.add('money');
    this.assets.money.loaded = false;
  }

  resize () {
    this.shirt.width = this.easel.viewport.h / this.assets.shirt.height * this.assets.shirt.width;
    this.shirt.left = this.easel.viewport.w / 2 - this.shirt.width / 2;
    this.shirt.height = this.easel.viewport.h;
    this.shirt.top = 0;
    if (this.shirt.width > this.easel.viewport.w) {
      this.shirt.left = 0;
      this.shirt.width = this.easel.viewport.w;
      this.shirt.height = this.easel.viewport.w / this.assets.shirt.width * this.assets.shirt.height;
      this.shirt.top = this.easel.viewport.h / 2 - this.shirt.height / 2;
    } // end if
    this.logo.width = this.shirt.width / 6;
    this.logo.height = this.shirt.height / 4;
  }

  add (assetName) {
    this.assets[assetName].loaded = true;
    this.isDoneLoading();
  }

  isDoneLoading () {
    if (this.started) return; // short-circuit
    if (Object.keys(this.assets).every(k => this.assets[k].loaded === true)) {
      this.started = true;
      this.start();
    } // end if
  }

  start () {
    const ctx = this.easel.ctx; // link to canvas 2d drawing context
    const makeItRain = new Ion(this.easel); // animation class

    this.resize(); // establish asset sizes
    this.easel.config = () => this.resize(); // (re-)establish asset sizes

    // Declare and initialize the scene
    makeItRain.quantity = 100;
    makeItRain.startX = () => Math.random() * this.easel.viewport.w; // start x location
    makeItRain.startY = 15; // start y location
    makeItRain.endX = () => Math.random() * this.easel.viewport.w; // destination x location (minus wind factor)
    makeItRain.endY = () => this.easel.viewport.h; // destination y location (minus wind factor)
    makeItRain.windX = () => Math.random() * 0.5 - 0.25; // wind-x variant factor
    makeItRain.windY = 0; // wind-y variant factor
    makeItRain.image = this.assets.money; // pass an image for the particle
    makeItRain.imageWidth = 25; // lets override the width of the image
    makeItRain.imageHeight = 50; // lets override the height of the image
    makeItRain.tweenDuration = 1000;
    makeItRain.tweenCurrent = () => Math.random() * makeItRain.tweenDuration;
    makeItRain.tweenType = 'linear';
    makeItRain.onParticleEnd = makeItRain.reevaluate;
    makeItRain.onEscape = makeItRain.reevaluate;
    makeItRain.clearFrame = () => { // overriding the clear frame function
      const x = this.easel.viewport.w / 2 - this.logo.width / 2;
      const y = this.easel.viewport.h / 2 - this.logo.height / 2;

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, this.easel.viewport.w, this.easel.viewport.h);
      ctx.font = '18px Courier New';
      ctx.drawImage(this.assets.shirt, this.shirt.left, this.shirt.top, this.shirt.width, this.shirt.height);
      ctx.drawImage(this.assets.logo, x, y, this.logo.width, this.logo.height);
      ctx.fillStyle = 'rgb(255,255,0)';
      ctx.fillText(this.headerText, 5, this.easel.viewport.h - 5);
    };
    makeItRain.populate(); // pass a custom wait function between particles
    makeItRain.process(); // begin processing the scene
  }
}
