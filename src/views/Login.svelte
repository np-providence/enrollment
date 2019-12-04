<script>
   import './login.css';
   function handleForgotPassword() {
    alert('Remember by yourself, boomer.');
  }
</script>

<div class="content">
   <h1>FaceIT!</h1> 
   <form>
    <input name="email" type="text" placeholder="Email" >
    <input name="password" type="password" placeholder="Password" >
    <input type="submit" value="Login">
    <a href="#" on:click={handleForgotPassword}> Forgot Password? </a>
   </form>
</div>


