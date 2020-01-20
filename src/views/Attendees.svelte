<script>
import { selectedEvent } from './../stores.js';
import { writable,get } from 'svelte/store';
import AttendeeTable from '../components/AttendeeTable';

let event = get(selectedEvent)
console.log(event)
</script>

<div class="content">
    <h1>{event.name}</h1>
    <div class="section">
    Location: {event.location} <br>
    DateTime:  <br>
    Total number of sessions: {event.numOfWeek * event.sesPerWeek} <br>
    
    
    </div>
    <div class="section">
     <AttendeeTable />
    </div>
</div>

<style>
.section{
    display: inline-block;
}
</style>