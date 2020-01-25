<script>
import Webcam from 'webcamjs';
import { onMount } from 'svelte';
import { tweened } from 'svelte/motion';

import { token } from '../stores';

let image,
    identifying = false;

const flash = tweened(0, {
  duration: 300
});

function attachCamera() {      
  Webcam.set({
      width: 640,
      height: 360,
      image_format: 'jpeg',
      jpeg_quality: 90
  });
  Webcam.attach('#camera');
}

function flashCamera() {
  flash.set(1.0);
  setTimeout(() => flash.set(0.0), 300); // Timeout here has to be synced with tween delay
}

function identify() {
  if (!identifying) {
    identifying = true;
    flashCamera();
    Webcam.snap(d => {
      getFeatures(d)
        .then(response => {
          console.info(response);
        })
        .catch(console.error)
        .finally(() => identifying = false);
    }); 
  }
}

const getFeatures = (img) => {
  return fetch(process.env.API_URL + 'api/features', {
     method: 'POST',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: $token,
        image: img
      })
    });
}

onMount(() => {
  attachCamera();
});

</script>

<style>
#camera {
  margin: auto;
  background: whitesmoke;
}

#flash {
  background: white;
  pointer-events: none;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
</style>

<div class="content">
  <div id="flash" style="opacity: {$flash}">&nbsp;</div>
  <h2>Identification Demo</h2>
  <div id="camera"> </div>
  <div class="button" on:click={identify}>Indentify</div>
</div>
