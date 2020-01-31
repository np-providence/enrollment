<script>
  import { userLogin } from '../api';
  import { token, user } from '../stores';
  import particlesJs from 'particles.js';
  particlesJS.load('particles-js', '/particles.json');

  let email = '', password = '', error = '';
  function handleForgotPassword() {
    alert('Remember by yourself, boomer.');
  }
  function login(event) {
    event.preventDefault();
    userLogin(email, password)
      .then(response => {
        if (response.ok) return response.json();
        else error = "Wrong creds u loser";
      })
      .then(r => {
        let t = r.token;
        token.set(t);
        user.set(r.user);
      })
      .catch(err => error = "Wrong creds u loser");
  }
</script>

<style>
  .login-container {
    margin: 7vh auto;
    display: flex;
  }

  #login-form {
    text-align: left;
    margin: auto 30px;
    padding: 25px;
    border: solid grey 1px;
    max-width: 200px;
    max-height: 350px;
    margin: 10vh auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #login-form {
    background: white;
    text-align: left;
    padding: 35px;
    border-radius: 5px;
    flex: 1;
    min-width: 300px;
    color: black;
  }
  
  .fade-in {
    animation-name: fadeIn;
    animation-duration: 3s;
  }

  .fly-in {
    animation-name: flyIn;
    animation-duration: 3s;
  }


  #login-form input {
    border: solid grey 1px;
    padding: 5px;
    margin-bottom: 10px;
  }

  #particles-js {
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    z-index: -99;
  }
  #logo {
    height: 80vh;
    animation: float infinite ease-in-out 5s;
  }
</style>

<div class="content">
   <div id="particles-js" class="fade-in" />
   <div class="login-container">
     <form id="login-form" class="fade-in" on:submit={login}>
      <h2> FaceIT! </h2>
      <input name="email" type="text" placeholder="Email" bind:value={email}> <br/>
      <input name="password" type="password" placeholder="Password" bind:value={password}> <br/>
      <input type="submit" value="Login">
      <a href="#" on:click={handleForgotPassword}> Forgot Password? </a>
      <p style="color: red;">{error}</p>
     </form>
    <img id="logo" src="/img/logo.png" />
    </div>
</div>
