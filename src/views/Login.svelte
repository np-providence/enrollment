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
   <form on:submit={login}>
    <input name="email" type="text" placeholder="Email" bind:value={email}>
    <input name="password" type="password" placeholder="Password" bind:value={password}>
    <input type="submit" value="Login">
    <a href="#" on:click={handleForgotPassword}> Forgot Password? </a>
    <p>{error}</p>
   </form>
</div>


