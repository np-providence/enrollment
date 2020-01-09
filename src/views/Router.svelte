<script>
import { Router, Link, Route } from "svelte-routing";

import Navbar from '../components/Navbar';
import CreateEvent from './CreateEvent';
import Dashboard from './Dashboard';
import Events from './MyEvents';

let url = '/';

</script>

<style>
</style>

<div class="content">
  <Router url="{url}">
    <Navbar />
    <Route path="/" component="{Dashboard}" />
    <Route path="createEvent" component="{CreateEvent}" />
    <Route path="myEvents" component="{Events}" />
  </Router>
</div>
