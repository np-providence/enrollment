<script>
import { onMount } from 'svelte';
import { Navigate } from 'svelte-routing';

let eventName = '',
    numberOfSessions = 1,
    numberOfWeeks = 1,
    location = '',
    error = '';

</script>

<style>
input{
    border: solid grey 1px;
    padding: 5px;
    margin-bottom: 10px;
    width: 30%;
}
select{
    width:30%
} 
.formButton{
        width: 100px
}
</style>

<div class="content">
<h2>Create Event</h2>
    Event Name: <br/><input  name="event name" type="text" placeholder="Event Name" bind:value={eventName}> <br/>
    Number of Sessions per Week: <br/><input title="Number of Sessions Per Week" name="number of sessions per week" type="number" bind:value={numberOfSessions}> <br/>
    Number of Weeks: <br/> <input  name="number of weeks" type="number" bind:value={numberOfWeeks}> <br/>
    Location: <br/><select name="location" bind:value={location}>
    <option value="test">test</option>
    </select><br/><br/>
    
    <input class="formButton" type="submit" value="Submit">
  
</div>