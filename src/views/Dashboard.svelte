<script>
  import { onMount } from 'svelte';
  import { Link } from 'svelte-routing';
  import { writable, get } from 'svelte/store';
  import { newCreation,events } from './../stores.js';
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications';

console.log(get(newCreation));
console.log(get(events));

onMount(() => {
  if (get(newCreation)) { 
    successAlert();
    newCreation.update(existing => false)
    }
});

function successAlert(){
  notifier.success('Event has been created!');
}
</script>

<div class="content">
<NotificationDisplay />
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
