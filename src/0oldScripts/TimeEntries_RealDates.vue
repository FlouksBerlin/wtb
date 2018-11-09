<template>
	<v-container>
		<v-layout row wrap>
			<v-card class="elevation-2 mt-5">
				<v-toolbar color="green lighten-1" dense>
					<v-toolbar-title>New Time-Entry</v-toolbar-title>
				</v-toolbar>
				<v-card-text style="margin-bottom: -30px;">
					<v-form>
						<v-container pa-0>
							<v-layout row wrap>
								<v-flex xs12 sm3>
									<v-menu ref="menuAT" :close-on-content-click="false" v-model="menuAT" :nudge-right="40" :return-value.sync="newTimeEntry.timeArrival"
									 lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
										<v-text-field slot="activator" v-model="newTimeEntry.timeArrival" label="Arrival Time" prepend-inner-icon="access_time" color="green"
										 box readonly clearable></v-text-field>
										<v-time-picker v-if="menuAT" v-model="newTimeEntry.timeArrival" @change="$refs.menuAT.save(newTimeEntry.timeArrival)" format="24hr"
										 color="green"></v-time-picker>
									</v-menu>
								</v-flex>
								<v-flex xs12 sm3>
									<v-menu ref="menuLT" :close-on-content-click="false" v-model="menuLT" :nudge-right="40" :return-value.sync="newTimeEntry.timeLeaving"
									 lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
										<v-text-field slot="activator" v-model="newTimeEntry.timeLeaving" label="Leaving Time" prepend-inner-icon="time_to_leave"
										 color="green" box readonly clearable></v-text-field>
										<v-time-picker v-if="menuLT" v-model="newTimeEntry.timeLeaving" @change="$refs.menuLT.save(newTimeEntry.timeLeaving)" format="24hr"
										 color="green"></v-time-picker>
									</v-menu>
								</v-flex>
								<v-flex xs12 sm6>
									<v-text-field v-model="newTimeEntry.comment" box label="Comment" prepend-inner-icon="edit" clearable>
									</v-text-field>
								</v-flex>
							</v-layout>
						</v-container>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn icon @click="saveEntry()" :disabled="!newTimeEntry.timeArrival || !newTimeEntry.timeLeaving" color="success">
						<v-icon>save</v-icon>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-layout>

		<v-divider class="my-5"></v-divider>
    <v-container fluid grid-list-xl class="listcontainer">
    <v-layout row justify-space-between>
      <v-flex xs1>id#</v-flex>
      <v-flex xs1>Beginn</v-flex>
      <v-flex xs1>Ende</v-flex>
      <v-flex xs1>ist</v-flex>
      <v-flex xs1>pause</v-flex>
      <v-flex xs1>ist (netto)</v-flex>
      <v-flex xs1>soll</v-flex>
      <v-flex xs1>gleitzeit</v-flex>
    </v-layout>
		<v-layout row justify-space-between v-for="(entry, index) in timeEntries" :key="index">
			<v-flex xs1> {{ entry.id }} </v-flex>
      <v-flex xs1> {{ entry.timeArrival | moment("HH:mm") }} </v-flex>
			<v-flex xs1> {{ entry.timeLeaving | moment("HH:mm") }} </v-flex>
			<v-flex xs1> {{ actualWorktime(entry) | moment("HH:mm")}} </v-flex>
      <v-flex xs1> {{ breakTime(actualWorktime(entry)) }}</v-flex>
      <v-flex xs1>s</v-flex>
      <v-flex xs1>s</v-flex>
      <v-flex xs1> {{  }} </v-flex>
		</v-layout>
    </v-container>
	</v-container>
</template>

<script>
export default {
  data() {
    return {
      menuAT: false,
      menuLT: false,
      newTimeEntry: {
        timeArrival: null,
        timeLeaving: null,
        comment: ''
      },
      timeEntries: [
        {
          timeArrival: 1540623600000,
          timeLeaving: 1540654200000,
          id: '#1'
        },
        {
          timeArrival: 1540882500116,
          timeLeaving: 1540911601991,
          id: '#2'
        }
      ]
    };
  },
  computed: {},
  methods: {
    saveEntry() {
      const submittableTimeEntry = {
        timeArrival: this.submittableTime(this.newTimeEntry.timeArrival),
        timeLeaving: this.submittableTime(this.newTimeEntry.timeLeaving),
        comment: this.newTimeEntry.comment
      };

      this.$store.dispatch('createTimeEntry', submittableTimeEntry);

      console.log(submittableTimeEntry);
      this.timeEntries.push(submittableTimeEntry);
      this.newTimeEntry = {};
    },

    submittableTime(time) {
      const date = new Date();
      const hours = time.match(/^(\d+)/)[1];
      const minutes = time.match(/:(\d+)/)[1];
      date.setHours(hours);
      date.setMinutes(minutes);
      return date;
    },

    actualWorktime(entry) {
      var diff = this.$moment(entry.timeLeaving).diff(
        this.$moment(entry.timeArrival)
      );
      return this.$moment.utc(diff);
    },

    breakTime(actualWorktime) {
      const actualDuration = this.$moment.duration(actualWorktime.get);
      return actualDuration;
      console.log(actualDuration);
      const actualMinutes = actualWorktime.minute();
    },

    timeStringToDecimal(time) {
      var hoursMinutes = time.split(/[.:]/);
      var hours = parseInt(hoursMinutes[0], 10);
      var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
      return (hours + minutes / 60).toFixed(2);
    }
  }
};
</script>

<style scoped>
.listcontainer .row {
  border-bottom: solid 1px lightgrey;
}
</style>
