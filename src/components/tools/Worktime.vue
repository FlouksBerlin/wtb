<template>
  <v-card class="elevation-4">
    <v-toolbar dense>
      <v-toolbar-title>{{Date()}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>edit</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
    <v-form>
      <v-container>
          <app-worktime-entry></app-worktime-entry>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
  
</template>

<script>
import WorktimeSlot from "./WorktimeEntry.vue";

export default {
  components: {
    appWorktimeEntry: WorktimeSlot
  }
};
</script>
