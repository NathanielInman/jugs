import 'file-loader?name=[name].html!./index.jade';
import './app.styl';
import {easel} from './vendor/easel';
import {makeItRain} from './common/main';

/**
 * Launch application if easel was able to create a canvas,
 * if it wasn't then we know canvas isn't supported
 */
{
  let noscript = document.getElementById('noscript');

  if(!easel.activated){
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
}

