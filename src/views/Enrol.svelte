<script>
import Webcam from 'webcamjs';
import { onMount } from 'svelte';

let cameraActive = false;

function attach() {      
  Webcam.set({
      width: 1280,
      height: 720,
      image_format: 'jpeg',
      jpeg_quality: 90
  });
  Webcam.attach('#my_camera');
  cameraActive = true;
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
</style>

<div class="content">
  <h2>Enrollment</h2>
  <div id="my_camera">
    <p style="text-align: center; font-size: 25px ">
      <div class="button" on:click={attach}>Begin</div>
  </div>
  {#if cameraActive}
    <div class="button" on:click={snapshot}> Capture </div>
  {/if}
</div>

