<script>
  import { onMount } from 'svelte';
  import { getStudents } from '../api';

  onMount(() => {
    getStudents()
    .then(r => r.json())
    .then(console.info);
  });

</script>

<style>
</style>

<div class="content">
  <table>
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </table>
</div>
