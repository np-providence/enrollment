<script>
  import { onMount } from 'svelte';
  import { getStudents, getYears, getCourses } from '../api';

  let students = [],
  years = [],
  courses = [];

  function getYear(id) {
    if (id === null) return 'NA';
    return years.filter(x => x.id === id)[0].name;
  }

  function getCourse(id) {
    if (id === null) return 'NA';
    return courses.filter(x => x.id === id)[0].name;
  }

  onMount(() => {
    Promise.all([getStudents(), getYears(), getCourses()])
    .then(async (r) => Promise.all(r.map(x => x.json())))
    .then(results => {
      students = results[0].data;
      years = results[1].data;
      courses = results[2].data;
    });
  });
</script>

<style>
table {
  width: 100%;
}
td, th {
  text-align: left;
}
</style>

<div class="content">
  {#if students !== null}
  <table>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Year</th>
      <th>Course</th>
    </tr>
    {#each students as student}
      <tr>
        <td>{student.name}</td>
        <td>{student.email}</td>
        <td>{getCourse(student.course_id)}</td>
        <td>{getYear(student.year_id)}</td>
      </tr>
    {/each}
  </table>
  {:else}
    <p> No Students to display... </p>
  {/if}
</div>
