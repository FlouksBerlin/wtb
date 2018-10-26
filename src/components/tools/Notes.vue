<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="green lighten-1" dense>
					<v-toolbar-title>New Time-Entry</v-toolbar-title>
				</v-toolbar>

        <v-card-text primary-title>
        <v-form>
          <v-layout>
            <v-flex xs4 mx-2>
              <v-text-field box prepend-inner-icon="access_time" clearable></v-text-field>
            </v-flex>
            <v-flex xs4 mx-2>
              <v-text-field box prepend-inner-icon="access_time" clearable></v-text-field>
            </v-flex>
            <v-flex xs4 mx-2>
              <v-text-field box prepend-inner-icon="access_time" clearable></v-text-field>
            </v-flex>
          </v-layout>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn flat>Share</v-btn>
          <v-btn flat color="purple">Explore</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      newTimeEntry: null,
      worktimeEntries: [
        {
          id: 'ajskdu1',
          timeArrival: 1540537078598,
          timeLeaving: 1540558550956,
          overtime: -1
        },
        {
          id: 'pawl827',
          timeArrival: 1540446935947,
          timeLeaving: 1540475109726,
          overtime: +2
        }
      ],
      overTimeIcon: {
        up: 'trending_up',
        down: 'trending_down'
      }
    };
  }
};
</script>

<style>
th {
  width: 200px;
}
</style>
