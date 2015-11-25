import {Easel} from './lib/easel.dev';
import makeItRain from './common/main';

/**
 * Main anonymous function that launches the web application
 * if easel was able to create a canvas (if it's supported)
 */
((noscript)=>{
  if(!Easel.activated){
    noscript.innerHTML = `
    <p class="browsehappy">
      You are using an outdated browser. Please
      <a href="http://browsehappy.com/"> upgrade your browser</a>
      to improve your experience.
      <span style="color:red;"><br/>Canvas isn't supported in your browser.</span>
    </p>`;
  }else{
    noscript.style.visibility='hidden';
    makeItRain();
  } //end if
})(document.getElementById('noscript'));
