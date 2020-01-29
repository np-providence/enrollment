<script>
  import { onMount } from 'svelte';
  import { Link } from 'svelte-routing';
  import { writable, get } from 'svelte/store';
  import { newCreation } from './../stores.js';
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications';

console.log(get(newCreation));

onMount(() => {
  if (get(newCreation)) { 
    successAlert();
    newCreation.update(existing => false)
    }
});

function successAlert(){
  notifier.success('Event has been created!', 2000);
}
</script>

<div class="content">
  <NotificationDisplay />
  <h1>Enrolment </h1>
  <Link to="enrol"> 
      <div class="button">
        Enrolment
      </div>
    </Link>
  <h1>Event Management</h1>
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
    <h1>Attendance Management</h1>
  <Link to="viewAttendees"> 
    <div class="button">
      View Attendees
    </div>
  </Link>
  <h1>Profile Settings</h1>
  <div class="button">
      Change Password
    </div>
</div>
