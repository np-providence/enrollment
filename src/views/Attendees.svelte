<script>
import { selectedEvent } from './../stores.js';
import { writable,get } from 'svelte/store';
import AttendeeTable from '../components/AttendeeTable';
import { Link, navigate  } from "svelte-routing";

let event = get(selectedEvent)
console.log(event)
</script>

<div class="content">
    <h1>{event.name}</h1>
    <br><br>
    <div class="section">
    Location:  {#each event.locations as locations} 
          {locations.name + " "}
      {/each}
       <br>
    DateTime: {event.date_time_start} <br>
    <!-- Total number of sessions: {event.numOfWeek * event.sesPerWeek} <br>  -->
    
    
    </div>
    <div class="section">
     <table>
     <tr>
     <th>Name</th>
     <th>Time</th>
     <th>Picture</th>
     </tr>
     <tr>
     <td>Boy</td>
     <td>1:45 PM 20/01/20 Monday</td>
     <td></td>
     </tr>
     <tr>
    <td>Girl</td>
     <td>1:46 PM 20/01/20 Monday</td>
     <td></td>
     </tr>
     </table>
    </div>
</div>
 <Link to="viewAttendees">
      <button class="formButton">Back</button>
    </Link>

<style>
.section{
    display: inline-table;
    width: 35vw;
}
  table {
    width: 30vw;
    margin-left: 2.5vw;
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