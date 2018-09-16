<template>
  <div class="col-8 offset-2">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Arrival</th>
          <th scope="col">Leave</th>
          <th scope="col">Worktime</th>
        </tr>
      </thead>
      <tbody>
          <app-worktime-slot></app-worktime-slot>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import WorktimeSlot from "./WorktimeEntry.vue";

export default {
  components: {
    appWorktimeSlot: WorktimeSlot
  }
};
</script>
