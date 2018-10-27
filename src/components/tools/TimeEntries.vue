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
		<v-layout row wrap v-for="(entry, index) in timeEntries" :key="index">
			<v-flex xs3> {{ entry.timeArrival | moment() }} </v-flex>
			<v-flex xs3> {{ entry.timeLeaving | moment() }} </v-flex>
			<v-flex xs3> {{ entry.comment }} </v-flex>
			<v-flex xs3> {{ overtime(entry) }} </v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	created(){
		this.$moment.locale('de');
	},
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
          id: 'ajskdu1',
          timeArrival: 1540621469413,
          timeLeaving: 1540653844161,
          comment: 'erster eintrag',
          overtime: -1
        },
        {
          id: 'pawl827',
          timeArrival: 1540446935947,
          timeLeaving: 1540475109726,
          comment: 'zweiter eintrag',
          overtime: +2
        }
      ]
    };
  },
  computed: {
		
	},
  methods: {
    saveEntry() {
			const submittableTimeEntry = {
				timeArrival: this.submittableTime(this.newTimeEntry.timeArrival),
				timeLeaving: this.submittableTime(this.newTimeEntry.timeLeaving),
				comment: this.newTimeEntry.comment
			}

			this.$store.dispatch('createTimeEntry', submittableTimeEntry)

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
		overtime(entry) {
			var diff = entry.timeLeaving - entry.timeArrival
			return this.msToTime(diff)
		},
		msToTime( ms ) {
			// 1- Convert to seconds:
			var seconds = ms / 1000;
			// 2- Extract hours:
			var hours = parseInt( seconds / 3600, 10 ); // 3,600 seconds in 1 hour
			seconds = seconds % 3600; // seconds remaining after extracting hours
			// 3- Extract minutes:
			var minutes = parseInt( seconds / 60, 10 ); // 60 seconds in 1 minute
			// 4- Keep only seconds not extracted to minutes:
			seconds = Math.round(seconds % 60);
			return hours+":"+minutes+":"+seconds
			//alert( hours+":"+minutes+":"+seconds);
		}
  }
};
</script>

<style>

</style>
