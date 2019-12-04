<script>
  import Webcam from 'webcamjs';

  function configure(){
        Webcam.set({
            width: 320,
          height: 240,
          image_format: 'jpeg',
          jpeg_quality: 90
      });
      Webcam.attach( '#my_camera' );
  }
  function take_snapshot() {
      // take snapshot and get image data
      Webcam.snap( function(data_uri) {
          // display results in page
          document.getElementById('results').innerHTML =
              '<img src="'+data_uri+'"/>';
      } );
  }
</script>

<div class="content">
  <div id="my_camera" on:click={configure}><p style="text-align: center; font-size: 25px ">
    <br>Front facing Photo <br><br> Click Here to take a photo</p>
  </div>
</div>



