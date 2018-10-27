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
			// return entry.timeLeaving - entry.timeArrival
			var diff = this.$moment(entry.timeLeaving).unix() - this.$moment(entry.timeArrival).unix()
			return this.$moment.utc(diff)
		},
  }
};
</script>

<style>

</style>
