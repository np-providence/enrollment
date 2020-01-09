<script>
import Webcam from 'webcamjs';
import { onMount } from 'svelte';
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
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
    Webcam.snap(console.info);
    progress.set((pictures.length / numberOfImages));

    if (pictures.length >= 5) instructions = 'Turn slightly to the right...';
    if (pictures.length >= 10) instructions = 'Turn slightly to the left...';

    // Terminate 
    if (pictures.length >= numberOfImages) {
      clearInterval(captureInterval);
      enrolAttendee();
    }

  }, bufferTime);
}

function enrolAttendee() {
  // TODO: Make request to enrol attendee
}
</script>

<style>
#my_camera {
  width: 400px;
  margin: auto;
}

input {
    border: solid grey 1px;
    padding: 5px;
    margin-bottom: 10px;
}
</style>

<div class="content">
  <h2>Enrolment</h2>
  <div id="my_camera"> </div>
  {#if cameraActive}
    <p> {instructions} </p>
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

