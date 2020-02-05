<script>
  import AttendanceTable from '../components/AttendanceTable';
  import { getAllEvents } from '../api';
  import { onMount } from 'svelte';

  let events = null;
  let eventID = '';

  onMount(() => {
    getAllEvents().then(r => r.json())
      .then(response => {
        events = response;
      });
  });

  function setEventID(id) {
    eventID = id;
    console.info(id);
  }
</script>

<style>
table {
  width: 100%;
}

tr:hover {
  background: whitesmoke;
}

td, th {
  text-align: left;
}
</style>

<div class="content">
  <h1>Select Event</h1>
  {#if events === null}
    <p>Loading...</p>
  {:else}
    <table>
      <thead>
        <th>Event Name</th>
        <th>Status</th>
      </thead>
      {#each events as event}
        <tr on:click={() => setEventID(event.id)}>
          <td>{event.name}</td>
          <td>What</td>
        </tr>
      {/each}
    </table>
  {/if}
  <h1>Attendance Records</h1>
  <AttendanceTable bind:eventID={eventID} />
</div>
