<script>
import Webcam from 'webcamjs';
import Navbar from '../components/Navbar';
import { onMount } from 'svelte';


function attach() {      
Webcam.set({
      width: 1280,
      height: 720,
      image_format: 'jpeg',
      jpeg_quality: 90
  });
 Webcam.attach('#my_camera');
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
  <Navbar />
  <h2>Enrollment</h2>
  <div id="my_camera">
    <p style="text-align: center; font-size: 25px ">
      <br/>Front facing camera<br/>
      <div class="button" on:click={attach}>Turn on camera</div>
  </div>
  <div class="button" on:click={snapshot}> Capture </div>
</div>

