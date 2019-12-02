<style>
  h1 {
    font-size: 8em;
  }

  body {
      animation: roll 5s, rainbow 1s infinite;
      font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      height: 100%;
      width: 100%;
      margin: 0px;
      line-height: 1.58;
      word-break: break-word;
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
      font-size: 18px;
      display: grid;
      grid-template-columns: 10vw [content-start] auto [content-end] 10vw;
  }

  .content {
    grid-column-start: content-start;
    grid-column-end: content-end;
    text-align: center;
  }

  @keyframes roll {
      from {
          transform: rotateZ(270deg) rotateX(270deg) scaleX(0.5) scaleY(2) scale3d(-1.4, 0.4, 0.7);
          background-color: black;
      }
      to {
          transform: rotateZ(0deg) rotateX(0deg) scaleX(1) scaleY(1);
      }
  }
  @-webkit-keyframes rainbow {
      20% {
          color: red;
      }
      40% {
          color: yellow;
      }
      60% {
          color: green;
      }
      80% {
          color: blue;
      }
      100% {
          color: orange;
      }
  }

  /* Internet Explorer */

  @-ms-keyframes rainbow {
      20% {
          color: red;
      }
      40% {
          color: yellow;
      }
      60% {
          color: green;
      }
      80% {
          color: blue;
      }
      100% {
          color: orange;
      }
  }

  /* Standar Syntax */

  @keyframes rainbow {
      5% {
          color: red;
      }
      35% {
          color: yellow;
      }
      65% {
          color: green;
      }
      85% {
          color: blue;
      }
      0% {
          color: orange;
      }
  }
</style>

<script>
   function handleForgotPassword() {
    alert('Remember by yourself, boomer.');
  }
</script>

<body>
  <div class="content">
     <h1>FaceIT!</h1> 
     <form>
      <input name="email" type="text" placeholder="Email" >
      <input name="password" type="password" placeholder="Password" >
      <input type="submit" value="Login">
      <a href="#" on:click={handleForgotPassword}> Forgot Password? </a>
     </form>
  </div>
</body>
