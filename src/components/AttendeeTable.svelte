<script>
  import axios from "axios";
  import { Link, navigate } from "svelte-routing";

  let events = [];
  let attendeesDisplayed = [];
  let id = 0;

  let queryTextForEvent = "",
    queryTextForLocation = "";

  axios
    .get("http://localhost:5000/api/event/all", {
      params: {
        name: "Programming"
      }
    })
    .then(function(response) {
      events = response["data"];
      attendeesDisplayed = events;
    })
    .catch(function(error) {
      console.log(error);
    });
  /* 
  function viewAttendees() {
    navigate("viewAttendees", { replace: true });
  } */

  function searchEvent() {
    console.log(queryTextForEvent);

    if (queryTextForEvent === "") attendeesDisplayed = events;
    else
      attendeesDisplayed = events.filter(e =>
        e.name.toUpperCase().includes(queryTextForEvent.toUpperCase())
      );
  }
  function searchLocation() {
    console.log(queryTextForLocation);
    if (queryTextForLocation === "") attendeesDisplayed = events;
    else
      attendeesDisplayed = events.filter(e =>
        e.location.toUpperCase().includes(queryTextForLocation.toUpperCase())
      );
  }

  function selectSearchField() {
    if (document.getElementById("searchLocation").disabled == true) {
      document.getElementById("searchEvent").value = "";
      document.getElementById("searchLocation").disabled = false;
      document.getElementById("searchEvent").disabled = true;
    } else {
      document.getElementById("searchLocation").value = "";
      document.getElementById("searchLocation").disabled = true;
      document.getElementById("searchEvent").disabled = false;
    }
    attendeesDisplayed = events;
  }
</script>

<style>
  table {
    width: 80vw;
    border-collapse: collapse;
    border-radius: 3px;
    margin-bottom: 5vh;
    counter-reset: rowNumber;
  }

  .eventRow {
    counter-increment: rowNumber;
  }

  /* table,
  tr, */
  .tableData:first-child::before {
    content: counter(rowNumber);
  }

  tr {
    height: 8vh;
    border: 1px black solid;
    background-color: #0a5878;
  }

  tr:nth-child(even) {
    background-color: #0e7ba7;
  }

  .filter {
    margin: 15px;
    display: inline-block;
  }
</style>

<table id="attendeeTable">
  <tr>
    <th>N.o.</th>
    <th>Event Name</th>
    <th>Location</th>
  </tr>
  {#each attendeesDisplayed as event}
    <tr class="eventRow">

      <td class="tableData" />
      <td class="tableData">{event.name}</td>
      <td class="tableData">{event.location}</td>
    </tr>
  {:else}
    <tr>
      <td colspan="100%">
        <h5 class="text-center">There are no Attendees yet.</h5>
      </td>
    </tr>
  {/each}

</table>
