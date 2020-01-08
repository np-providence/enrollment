<script>
  import Login from './views/Login';
  import Router from './views/Router';
  
  import {token} from './stores';
</script>

{#if $token}
  <Router />
{:else}
  <Login />
{/if}

