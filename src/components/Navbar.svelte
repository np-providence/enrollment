<style>
  nav {
    height: 80px;
    padding: 15px;
    text-align: left;
  }
  #logo {
    font-size: 31px;
    font-weight: bold;
  }
  #controls {
     float: right;
  }
</style>

<script>
  import {token} from '../stores';

  function logOut() {
    token.unset()
  }
</script>

<nav>
   <span id="logo"> FaceIT!</span>
   <div id="controls"> 
    <a href="" on:click={logOut}>Log out</a>
   </div>
</nav>
