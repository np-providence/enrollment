<script>
  import { onMount } from 'svelte';
  import { Link } from 'svelte-routing';
  import { writable, get } from 'svelte/store';
  import { userMessage, user } from './../stores.js';
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications';

onMount(() => {
  if ($userMessage) { 
    notifier.success($userMessage);
    userMessage.update( _ => null)
    }
});
</script>

<div class="content">
  <NotificationDisplay />

  {#if $user.role === "admin" }
    <h1>Admin Panel</h1>
      <Link to="enrol"> 
        <div class="button">
         Enrol Student 
        </div>
      </Link>
      <Link to="listStudents"> 
        <div class="button">
        Students
        </div>
      </Link>
  {/if}

  {#if $user.role === "event_owner" }
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
  {/if}

  {#if $user.role === "student" }
    <h1>Profile Settings</h1>
    <div class="button">
        Change Password
    </div>
  {/if}
</div>
