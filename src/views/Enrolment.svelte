<script>
import Webcam from 'webcamjs';
import { onDestroy, onMount } from 'svelte';
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';
import { navigate } from 'svelte-routing';

import { token, userMessage } from '../stores';
import { postEnrol, postFeatures, getCourses, getYears } from '../api';

const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
});

const refreshResolution = 1500; // Camera image polling resolution

let name = '',
    email = '',
    courseID = '',
    yearID = '',
    pictures = [],
    error = '',
    instructions = '',
    cameraActive = false,
    captureInProgress = false,
    facePolling,
    faceDetected = false;


let courses = [], years = [];

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
       // live preview size
			width: 320,
			height: 240,
			
			// device capture size
			dest_width: 320,
			dest_height: 240,
			
			// final cropped size
			crop_width: 240,
			crop_height: 240,
			
			// format and quality
			image_format: 'jpeg',
			jpeg_quality: 90 
    });
    Webcam.attach('#camera');
    cameraActive = true;
    // Start polling for images
    facePolling = setInterval(pollFaceDetected, refreshResolution);
  }
}

function pollFaceDetected() {
  Webcam.snap(data => {
    postNumberOfFaces(data)
      .then(numberOfFaces => {
        updateInstructions(numberOfFaces);
        if (numberOfFaces === 1) {
          pictures.push(data);
          if (pictures.length < 5) instructions = 'Keep face centered';
          else if (pictures.length < 10) instructions = 'Turn face slightly to the right';
          else instructions = 'Turn face slightly to the left';
          if (pictures.length >= 15) {
            instructions = 'Done';
            clearInterval(facePolling);
            enrolUser();
          }
        }
      });
  });
}

function updateInstructions(numberOfFaces) {
  progress.set(pictures.length / 15);
  if (numberOfFaces < 1) {
    faceDetected = false;
    instructions = 'Move face into frame';
  } else if (numberOfFaces > 1) {
    faceDetected = false;
    instructions = 'Too many faces detected';
  } else if (numberOfFaces === 1) {
    faceDetected = true;
    instructions = '';
  }
}

function enrolUser() {
  postEnrol({
      name: name,
      email: email,
      courseID: courseID,
      yearID: yearID,
      images: pictures
    })
  .then(response => response.json())
  .finally(() => {
    userMessage.set('Successfully enroled Student');
    navigate('/', {replace: true});
  });
}

const postNumberOfFaces = (picture) => 
  postFeatures({image: picture})
      .then(response => response.json())
      .then(results => results.numberOfFaces);

// Clean up on unmount
onDestroy(() => {
 if (cameraActive) Webcam.reset();
 clearInterval(facePolling);
});

onMount(() => {
  Promise.all([getYears(), getCourses()])
  .then(async (r) => Promise.all(r.map(x => x.json())))
  .then(async (r) => {
    console.info(r)
    years = r[0].data;
    courses = r[1].data;
    yearID = years[0].id;
    courseID = courses[0].id;
  }).catch(console.error);
});

</script>

<style>
#camera {
  margin: auto;
  background: whitesmoke;
  border-radius: 150px;
  animation: pulse 3s infinite;
}

.error {
 border: 2px solid red;
}

.okay {
 border: 2px solid green;
}

.hidden {
  visibility: hidden; 
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
  <div class:hidden={!cameraActive} class:okay={faceDetected} class:error={!faceDetected} id="camera"> </div>
  {#if cameraActive}
    <p class="instructions"> {instructions} </p>
    <progress value={$progress}></progress>
  {:else}
    <h3> To get started, enter your details </h3>
    <input name="name" type="text" placeholder="Name" bind:value={name}> <br/>
    <input name="email" type="text" placeholder="Email" bind:value={email}> <br/>
    <select bind:value={yearID}>
      {#each years as year}
        <option value={year.id}>
          { year.name }
        </option>
      {/each}
    </select><br/>
    <select bind:value={courseID}>
      {#each courses as course}
        <option value={course.id}>
          { course.name }
        </option>
      {/each}
    </select>
    <p style="color: red;">{error}</p>
    <div class="button" on:click={attachCamera}>Begin</div>  
  {/if}
</div>

