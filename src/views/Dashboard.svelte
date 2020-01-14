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
<h1>User Management</h1>
<Link to="importUsers"> 
    <div class="button">
      Import Users
    </div>
  </Link>
  <Link to="editUser"> 
    <div class="button">
      Edit User
    </div>
  </Link>
   <Link to="removeUser"> 
    <div class="button">
      Remove User
    </div>
  </Link>
  <h1>Profile Settings</h1>
  <div class="button">
      Change Password
    </div>
</div>