<script>
import Webcam from 'webcamjs';
import { onDestroy } from 'svelte';
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
});

const flash = tweened(0, {
		duration: 300
});


let name = '',
    email = '',
    pictures = [],
    error = '',
    instructions = 'Make sure the front of your face can be seen, and then press start.',
    cameraActive = false;

$: detailsValid = () => {
  if (name === '' || email === '') {
    error = 'Please enter name and email';
    return false;
  }
  if (!validateEmail(email)) {
    error = 'Invalid email';
    return false;
  }
  error = '';
  return true;
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function attachCamera() {      
  if (detailsValid()){
    Webcam.set({
        width: 1280,
        height: 720,
        image_format: 'jpeg',
        jpeg_quality: 90
    });
    Webcam.attach('#my_camera');
    cameraActive = true;
  }
}

function startCapture() {
  const bufferTime = 2000;
  const numberOfImages = 15;
  let captureInterval = setInterval(()=> {
    flash.set(1.0);
    Webcam.snap(data => {
      pictures.push(data);
      setTimeout(() => flash.set(0.0), 300); // Timeout here has to be synced with tween delay
    });
    progress.set((pictures.length / numberOfImages));

    if (pictures.length >= 5) instructions = 'Turn slightly to the right...';
    if (pictures.length >= 10) instructions = 'Turn slightly to the left...';

    // Terminate 
    if (pictures.length >= numberOfImages) {
      clearInterval(captureInterval);
      Webcam.reset();
      enrolAttendee();
      instructions = 'Done!'
    }

  }, bufferTime);
}

function enrolAttendee() {
  // TODO: Make request to enrol attendee
}

// Clean up on unmount
onDestroy(() => {
 if (cameraActive) Webcam.reset();
});

</script>

<style>
#flash {
  background: white;
  pointer-events: none;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  animation: flash linear 0.3s infinite;
}

#my_camera {
  width: 400px;
  margin: auto;
  background: blue;
}

input {
  border: solid grey 1px;
  padding: 5px;
  margin-bottom: 10px;
}

.instructions {
  font-size: 30px;
}
</style>

<div class="content">
  <div id="flash" style="opacity: {$flash}">&nbsp;</div>
  <h2>Enrolment</h2>
  <div id="my_camera"> </div>
  {#if cameraActive}
    <p class="instructions"> {instructions} </p>
    <progress value={$progress}></progress>
    <div class="button" on:click={startCapture}> Start </div>
  {:else}
    <p> To get started, enter your details </p>
    <input disabled="{cameraActive}" name="name" type="text" placeholder="Name" bind:value={name}> <br/>
    <input disabled="{cameraActive}" name="email" type="text" placeholder="Email" bind:value={email}> <br/>
    <p style="color: red;">{error}</p>
    <div class="button" on:click={attachCamera}>Begin</div>  
  {/if}
</div>

