/**
 * Main anonymous function that launches the web application
 */
(function(){
  "use strict";

  var status=''; // This will hold the error text if features are missing from the browser
  if(!Modernizr.borderradius){
      status+="<br/>Border radius isn't supported in your browser.";
  } //end if
  if(!Modernizr.canvas){
      status+="<br/>Canvas isn't supported in your browser.";
  } //end if
  if(!Modernizr.csstransitions){
      status+="<br/>CSS3 transitions aren't supported in your browser.";
  } //end if
  if(!status.length){
    document.getElementById('noscript').style.visibility='hidden';
    app();
  }else{
    ETB.$('noscript').innerHTML = `<p class="browsehappy">You are using an outdated browser.
      Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.
      <span style="color:red;">${status}</span></p><div class="btn" onmousedown="
      document.getElementById('noscript').style.visibility='hidden';app();"
      >Continue Anyways</div>`;
  } //end if
})();