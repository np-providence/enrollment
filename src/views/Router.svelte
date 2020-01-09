<script>
import { Router, Link, Route } from "svelte-routing";

import Navbar from '../components/Navbar';

import Enrolment from './Enrolment';
import Dashboard from './Dashboard';
import Attendance from './Attendance';

let url = '/';

</script>

<style>
</style>

<div class="content">
  <Router url="{url}">
    <Navbar />
    <Route path="/" component="{Dashboard}" />
    <Route path="enrol" component="{Enrolment}" />
    <Route path="attendance" component="{Attendance}" />
  </Router>
</div>
