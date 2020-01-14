<style>
  nav {
    height: 80px;
    padding: 15px;
    text-align: left;
    line-height: 80px;
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

  import { token } from '../stores';
  import { navigate,Link } from 'svelte-routing';

  function logOut() {
    navigate('/', { replace: true });
    token.unset();
  }
</script>

<nav>
   <Link to='/'>
     <span id="logo"> FaceIT! Admin</span>
   </Link>
   <div id="controls"> 
    <Link to='/' on:click={logOut}>Log out</Link>
   </div>
</nav>
