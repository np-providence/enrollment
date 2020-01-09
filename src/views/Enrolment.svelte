<script>
import Webcam from 'webcamjs';
import { onMount } from 'svelte';

let name = '',
    email = '',
    error = '';

let cameraActive = false;

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

function attach() {      
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

function snapshot() {
  Webcam.snap((data) => {
    console.info(data);
  });
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
    <div class="button" on:click={snapshot}> Capture </div>
  {:else}
    <p> To get started, enter your details </p>
    <input disabled="{cameraActive}" name="name" type="text" placeholder="Name" bind:value={name}> <br/>
    <input disabled="{cameraActive}" name="email" type="text" placeholder="Email" bind:value={email}> <br/>
    <p style="color: red;">{error}</p>
    <div class="button" on:click={attach}>Begin</div>  
  {/if}
</div>

