<script>
import { onMount } from 'svelte';
import { Link } from 'svelte-routing';
import Select from 'svelte-select';

let eventName = '',
    numberOfSessions = 1,
    numberOfWeeks = 1,
    location = '',
    error = '';

function createEvent(){
    //get location
        location = selectedValue;
        console.log(location['value'])
}

const items = [ {value: '27-01-10', label: '27-01-10'},{value: '27-01-10', label: '27-01-10'} ]; //test data

let selectedValue = undefined
</script>

<style>
input{
    border: solid lightgray 1px;
    padding: 5px;
    margin-bottom: 10px;
    width: 98%;
    height: 32px;
    border-radius: 3px;
}

.formButton{
        width: 100px;
        height: 32px;
        
}
.form{
    width: 30%;
    left:35%;
    position: absolute
}
</style>

<div class="content">
<div class="form"> 
<h2>Create Event</h2>
    Event Name: <br/><input  name="event name" type="text" placeholder="Event Name" bind:value={eventName}> <br/>
    Number of Sessions per Week: <br/><input title="Number of Sessions Per Week" name="number of sessions per week" type="number" bind:value={numberOfSessions}> <br/>
    Number of Weeks: <br/> <input  name="number of weeks" type="number" bind:value={numberOfWeeks}> <br/>
    Location: <br/>
    <Select {items} bind:selectedValue></Select>
    <br/><br/>
    <Link to="/"> 
    <button class="formButton">
      Back
    </button>
  </Link>
  <button class="formButton" type="submit" value="Submit" on:click={createEvent}> Submit</button>
  </div>
</div>