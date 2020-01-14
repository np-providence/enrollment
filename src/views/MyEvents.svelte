<script>
  import axios from "axios";
  import { Link,navigate } from 'svelte-routing';

  let events = [];
  let id = 0;

  axios
    .get("http://localhost:5000/api/event/all", {
      params: {
        name: "Programming"
      }
    })
    .then(function(response) {
      events = response["data"];
    })
    .catch(function(error) {
      console.log(error);
    });

    function viewAttendees(){
      navigate("viewAttendees",{replace:true})
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

  .eventRow{
    counter-increment: rowNumber;
  }

  table,tr,td:first-child::before{
     content: counter(rowNumber);
     
  }

  tr {
    height: 8vh;
     border: 1px black solid;
     background-color: #0a5878;
  }

  tr:nth-child(even){
  background-color: #0e7ba7;
  }

</style>

<div class="content">
  <h1>My Events</h1>
  <table>
    <tr>
      <th>N.o.</th>
      <th>Event Name</th>
      <th>Location</th>
    </tr>
    {#each events as event}
      <tr class="eventRow" on:click={viewAttendees}>
      
        <td></td>
        <td>{event.name}</td>
        <td>{event.location}</td>
      </tr>
      {:else}
      <tr>
        <td colspan="100%">
          <h5 class="text-center">There are no Events.</h5>
        </td>
      </tr>
    {/each}

  </table>
</div>
