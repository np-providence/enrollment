<script>
import Webcam from 'webcamjs';
import { onDestroy } from 'svelte';
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

import { token } from '../stores';

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
    cameraActive = false,
    captureInProgress = false;

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
        width: 640,
        height: 360,
        image_format: 'jpeg',
        jpeg_quality: 90
    });
    Webcam.attach('#camera');
    cameraActive = true;
  }
}

function startCapture() {
  instructions = 'Keep your face in the center of the frame...';
  captureInProgress = true;
  const bufferTime = 1000;
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
      instructions = 'Verifying images...';

      enrolAttendee();
    }

  }, bufferTime);
}

function verifyImages() {
  return Promise.all(
    pictures.map(picture => 
      fetch(process.env.API_URL + 'api/features', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: $token,
          image: picture
        })
      })
    )
  )
  .then(responses => Promise.all(responses.map(r => r.json())))
  .then(results => results.map(r => r.numberOfFaces))
  .then(getPicturesToEnrol);
}

function enrolAttendee() {
  verifyImages()
  .then(enrolmentPictures => {
    if (enrolmentPictures.length === 0) {
      instructions = 'No faces detected, please try again';
    } else {
      instructions = 'Enroling...';
      // TODO: Make request to enrol attendee
      return fetch(process.env.API_URL + 'api/attendee', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: $token,
          features: enrolmentPictures,
          course: 'Information Technology',
          year: '2012',
          gender: 'N/A',
          status: true,
          email,
          password: 'password' // TODO: Attendees need their own sign up page
        })
      });
    }
  })
  .then(console.info)
  .finally(() => {
  });

}

function getPicturesToEnrol(results) {
  let enrolmentPictures = [];
  results.forEach((r, index) => {
    if (r === 1) enrolmentPictures.push(pictures[index]);
  });
  return enrolmentPictures;
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

#camera {
  margin: auto;
  background: whitesmoke;
}

input {
  border: solid grey 1px;
  padding: 5px;
  margin-bottom: 10px;
}

progress[value] {
  width: 500px;
  height: 20px;
}

.instructions {
  font-size: 30px;
}
</style>

<div class="content">
  <div id="flash" style="opacity: {$flash}">&nbsp;</div>
  <h2>Enrolment</h2>
  <div id="camera"> </div>
  {#if cameraActive}
    <p class="instructions"> {instructions} </p>
    <progress value={$progress}></progress>
    {#if !captureInProgress} 
      <div class="button" on:click={startCapture}> Start </div>
    {/if }
  {:else}
    <p> To get started, enter your details </p>
    <input name="name" type="text" placeholder="Name" bind:value={name}> <br/>
    <input name="email" type="text" placeholder="Email" bind:value={email}> <br/>
    <p style="color: red;">{error}</p>
    <div class="button" on:click={attachCamera}>Begin</div>  
  {/if}
</div>

