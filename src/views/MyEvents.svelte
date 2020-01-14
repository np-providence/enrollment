<script>
import axios from "axios";
let events = []
axios.get('http://localhost:5000/api/event', {
    params: {
      name: "Programming"
    }
  }).then(function (response) {
    console.log(response['data']);
    events.push(response['data'])
  })
  .catch(function (error) {
    console.log(error);
  });
  console.log(events)
</script>
<div class="content">
  <h1>My Events </h1>
  <table>
  <tr>
  <th>N.o.</th>
  <th>Event Name</th>
  <th>Location</th>
  </tr>
  
  <tr>
  <td>hi</td>
   <td>{events} </td>
  <td>hi </td>
  </tr>
   <tr>
  <td>hi</td>
   <td>{events} </td>
  <td>hi </td>
  </tr>
   <tr>
  <td>hi</td>
   <td>{events} </td>
  <td>hi </td>
  </tr>
   <tr>
  <td>hi</td>
   <td>{events} </td>
  <td>hi </td>
  </tr>
   <tr>
  <td>hi</td>
   <td>{events} </td>
  <td>hi </td>
  </tr>

  </table>
</div>

<style>
table{
  width: 80vw;
}
tr{
  height: 10vh;
}
td{
  border: 1px black solid;
}
</style>