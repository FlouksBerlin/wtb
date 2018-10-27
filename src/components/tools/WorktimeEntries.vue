<template>
	<v-container>
  <v-layout row wrap>
  <v-flex xs12 md6 offset-md1>
			<worktime-entry v-for="worktimeEntry in worktimeEntries" :worktimeEntry="worktimeEntry" :key="worktimeEntry.id"></worktime-entry>
      <v-divider class="my-5"></v-divider>
      <worktime-entry v-if="newTimeEntry" :worktimeEntry="newTimeEntry"></worktime-entry>
				<v-card class="elevation-4" style="cursor:pointer"  v-else>
					<v-card-text @click="createNewTimeEntry()">
						<v-container>
							<v-layout align-center justify-center row fill-height>
								<v-icon>add</v-icon>
							</v-layout>
						</v-container>
					</v-card-text>
				</v-card>
        </v-flex>
      </v-layout>
	</v-container>
</template>


<script>
import WorktimeEntry from "./WorktimeEntry";

export default {
  components: {
    WorktimeEntry
  },
  data() {
    return {
      newTimeEntry: null,
      worktimeEntries: [
        {
          id: "ajskdu1",
          timeArrival: new Date(),
          timeLeaving: new Date(+1549754588884),
          overtime: -1
        },
        {
          id: "pawl827",
          timeArrival: new Date(),
          timeLeaving: new Date(+1599754588884),
          overtime: +2
        }
      ],
      overTimeIcon: {
        up: "trending_up",
        down: "trending_down"
      }
    };
  },
  computed: {
    overTime() {
      return Date(Math.abs(this.timeLeaving - this.timeArrival));
    }
  },
  methods: {
    CalcWT() {
      alert(this.timeArrival.HH + ":" + this.timeArrival.mm);
    },
    createNewTimeEntry() {
      this.newTimeEntry = {
        id: "piojawfp",
        timeArrival: null,
        timeLeaving: null,
        overtime: null
      };
      console.log("hallo");
    }
  }
};
</script>


<style>

</style>
