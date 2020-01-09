<script>
  import { Link } from 'svelte-routing';
</script>

<div class="content">
<Link to="myEvents"> 
    <div class="button">
      View My Events
    </div>
  </Link>
  <Link to="createEvent"> 
    <div class="button">
      Create New Event
    </div>
  </Link>
  <div class="button">
      Change Password
    </div>
</div>
