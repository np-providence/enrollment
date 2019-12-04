<script>
  import Login from './views/Login.svelte'
  import App from './views/App.svelte'
  
  import {token} from './stores';
</script>

{#if $token}
  <App />
{:else}
  <Login />
{/if}

