<script>
import { Router, Link, Route } from "svelte-routing";

import Navbar from '../components/Navbar';
import ImportUsers from './ImportUsers';
import Dashboard from './Dashboard';
import EditUser from './EditUser';
import RemoveUser from './RemoveUser';

let url = '/';

</script>

<style>
</style>

<div class="content">
  <Router url="{url}">
    <Navbar />
    <Route path="/" component="{Dashboard}" />
    <Route path="importUsers" component="{ImportUsers}" />
    <Route path="editUser" component="{EditUser}" />
    <Route path="removeUser" component="{RemoveUser}" />
  </Router>
</div>
