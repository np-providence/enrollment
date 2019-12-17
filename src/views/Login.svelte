<style>
  #loginForm {
    margin: auto;
    width: 500px;
    padding: 25px;
    border: solid grey 1px;
  }

  #loginForm input {
    border: solid grey 1px;
    padding: 5px;
    margin-bottom: 10px;
  }
</style>

<script>
  import Navbar from '../components/Navbar';
  import { token } from '../stores';

  let email = '', password = '', error = '';

  function handleForgotPassword() {
    alert('Remember by yourself, boomer.');
  }

  function login(event) {
    event.preventDefault();
    // TODO: actual auth
    if (email === 'test@gmail.com' && password === 'okb00mer') token.update(t => 'token');
    else error = 'wrong creds u loser';
  }
</script>

<div class="content">
   <Navbar />
   <form id="loginForm" on:submit={login}>
    <h2> Login </h2>
    <input name="email" type="text" placeholder="Email" bind:value={email}> <br/>
    <input name="password" type="password" placeholder="Password" bind:value={password}> <br/>
    <input type="submit" value="Login">
    <a href="#" on:click={handleForgotPassword}> Forgot Password? </a>
    <p style="color: red;">{error}</p>
   </form>
</div>


