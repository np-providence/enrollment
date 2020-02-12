<script>
  import AttendanceTable from '../components/AttendanceTable';
  import { getAllEvents } from '../api';
  import { onMount } from 'svelte';

  let events = null, selectedEventID = null;
  let fetchAttendance;

  onMount(() => {
    getAllEvents().then(r => r.json())
      .then(response => {
        events = response;
      });
  });

  function eventClicked(id) {
    fetchAttendance(id);
    selectedEventID = id;
  }

  function reloadAttendance() {
    if (selectedEventID !== null)
      fetchAttendance(selectedEventID);
  }
</script>

<style>
table {
  width: 100%;
}

tr:hover {
  background: whitesmoke;
}

.selected {
  background: whitesmoke;
}

td, th {
  text-align: left;
}

.content {
  display: flex;
  flex-direction: row;
}
.row {
  flex: 1;
}

</style>

<div class="content">
  <div class="row">
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
          <tr on:click={() => eventClicked(event.id)} class:selected={event.id === selectedEventID}>
            <td>{event.name}</td>
            <td>{(event.date_time_start < Date() && event.date_time_end > Date()) ? 'Active': 'Inactive'}</td>
          </tr>
        {/each}
      </table>
    {/if}
  </div>
  <div class="row">
    <h1>Attendance Records</h1>
    <button on:click={reloadAttendance}>Refresh</button>
    <AttendanceTable bind:fetchAttendance={fetchAttendance} />
  </div>
</div>
