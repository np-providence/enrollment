<script>
import { Router, Link, Route } from "svelte-routing";
import Navbar from '../components/Navbar';

import Enrol from './Enrol';
import Dashboard from './Dashboard';
import Attendance from './Attendance';

export let url = "";
</script>

<style>
</style>

<div class="content">
  <Router url="{url}">
    <Navbar />
    <Route path="/" component="{Dashboard}" />
    <Route path="enrol" component="{Enrol}" />
    <Route path="attendance" component="{Attendance}" />
  </Router>
</div>
