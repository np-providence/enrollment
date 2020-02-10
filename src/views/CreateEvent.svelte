<script>
import { writable,get } from 'svelte/store';
import { onMount } from "svelte";
import Select from "svelte-select";
import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications';
import { userMessage, user } from './../stores.js';
import axios from "axios";
import { Link, navigate  } from "svelte-routing";
import DatePicker from 'svelte-calendar';


  let eventName = "",
    numberOfSessions = 1,
    numberOfWeeks = 1,
    startDate,
    endDate,
    location = [],
    errorMsg = "",
    selectedValue = undefined,
    n,
    items = []
    ;
 
 const getSelectionLabel = (option) => option.name
onMount(async () => {
   axios
    .get("http://localhost:5000/api/location/all")
    .then(function(response) {
      location =  response["data"];
      console.log(location)
      location.forEach(element => {
       console.log(element)
       length = items.length
       items[length] = {value: element["id"].toString(), label: element["name"] }
        console.log(items)
    })
})
    .catch(function(error) {
      console.log(error);
    })
});
  
  function validateForm() {
    if (eventName === "") {
      errorMsg = "Please enter a Event Name";
      return false;
    } else {
        errorMsg = ''
      return true;
    }
  }

  function createEvent() {
    //get location
    let selectedLocation = []
   
    if (numberOfSessions > 0 && numberOfWeeks > 0) {
      if (selectedValue !== undefined) {
         selectedValue.forEach(element => {
           selectedLocation.push(element["value"])
    });
        if (validateForm() === true) {
          userMessage.update(_ => 'Created new event')
          axios.post('http://localhost:5000/api/event/new',{
              name: eventName,
	            dateTimeEnd: endDate.toUTCString(),
              dateTimeStart: startDate.toUTCString(),
              locations: selectedLocation,
              createdBy: $user.id
          })
          .then((response) => {
               console.log(response);
               navigate("/", { replace: true });
            }, (error) => {
                console.log(error);
                errorMsg = 'Event Name already in use.';
            });
        }
      } else {
        errorMsg = "Please select a location";
      }
    }
    else{
        errorMsg = "Number of Sessions and Weeks cannot be less than 1"
    }
  }
 
</script>

<style>
  input {
    border: solid lightgray 1px;
    padding: 5px;
    margin-bottom: 10px;
    width: 98%;
    height: 32px;
    border-radius: 3px;
  }

  .formButton {
    width: 100px;
    height: 32px;
  }
  .form {
    width: 30%;
    left: 35%;
    position: absolute;
  }

  .Select{
    color:black
    }
</style>

<div class="content" >
<NotificationDisplay bind:this={n} />
  <div class="form" >
    <h2>Create Event</h2>
    Event Name:
    <br />
    <input
      name="event name"
      type="text"
      placeholder="Event Name"
      bind:value={eventName} />
    <br />
    Start Date:
    <br/>
    <DatePicker bind:selected={startDate}/>
    <br/>
    End Date:
    <br/>
    <DatePicker bind:selected={endDate}/>
    <br/>
    Location:
    <br />
    <div class="Select">
      <Select {items} isMulti={true} bind:selectedValue></Select>
    </div>
    <p style="color: red;">{errorMsg}</p>
    <br />
    <Link to="/">
      <button class="formButton">Back</button>
    </Link>
    <button
      class="formButton"
      type="submit"
      value="Submit"
      on:click={createEvent}>
      Submit
    </button>
  </div>
</div>
