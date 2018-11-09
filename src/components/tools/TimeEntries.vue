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
                  <v-menu
                    ref="menuAT"
                    :close-on-content-click="false"
                    v-model="menuAT"
                    :nudge-right="40"
                    :return-value.sync="newTimeEntry.arrivalTime"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="newTimeEntry.arrivalTime"
                      label="Arrival Time"
                      prepend-inner-icon="access_time"
                      color="green"
                      box
                      readonly
                      clearable
                    ></v-text-field>
                    <v-time-picker
                      v-if="menuAT"
                      v-model="newTimeEntry.arrivalTime"
                      @change="$refs.menuAT.save(newTimeEntry.arrivalTime);"
                      format="24hr"
                      color="green"
                      min="5:00"
                      max="11:59"
                    ></v-time-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm3>
                  <v-menu
                    ref="menuLT"
                    :close-on-content-click="false"
                    v-model="menuLT"
                    :nudge-right="40"
                    :return-value.sync="newTimeEntry.leavingTime"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="newTimeEntry.leavingTime"
                      label="Leaving Time"
                      prepend-inner-icon="time_to_leave"
                      color="green"
                      box
                      readonly
                      clearable
                    ></v-text-field>
                    <v-time-picker
                      v-if="menuLT"
                      v-model="newTimeEntry.leavingTime"
                      @change="$refs.menuLT.save(newTimeEntry.leavingTime);"
                      format="24hr"
                      color="green"
                      min="12:00"
                    ></v-time-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    v-model="newTimeEntry.comment"
                    box
                    label="Comment"
                    prepend-inner-icon="edit"
                    clearable
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="saveEntry();"
            :disabled="!newTimeEntry.arrivalTime || !newTimeEntry.leavingTime"
            color="success"
          >
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
        <v-flex xs1>Arbeitszeit (Brutto)</v-flex>
        <v-flex xs1>Pausenlänge</v-flex>
        <v-flex xs1>Arbeitszeit (netto)</v-flex>
        <v-flex xs1>Sollarbeitszeit</v-flex>
        <v-flex xs1>Gleitzeit</v-flex>
      </v-layout>
      <v-layout
        row
        justify-space-between
        v-for="(entry, index) in timeEntries"
        :key="index"
      >
        <v-flex xs1> {{ entry.id }} </v-flex>
        <v-flex xs1> {{ entry.arrivalTime | decimalTime }} </v-flex>
        <v-flex xs1> {{ entry.leavingTime | decimalTime }} </v-flex>
        <v-flex xs1> {{ grossWorkTime(entry) | decimalTime }} </v-flex>
        <v-flex xs1> {{ breakWorkTime(entry) | decimalTime }}</v-flex>
        <v-flex xs1> {{ netWorkTime(entry) | decimalTime }} </v-flex>
        <v-flex xs1> {{ entry.targetTime | decimalTime }} </v-flex>
        <v-flex xs1>
          <v-icon
            small
            class="mr-2"
            :color="overtime(entry) < 0 ? 'red' : 'green'"
          >
            {{ overtime(entry) < 0 ? 'trending_down' : 'trending_up' }}
          </v-icon>
          {{ overtime(entry) | decimalTime }}
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { workTimeMixin } from '@/mixins/workTime';

export default {
  mixins: [workTimeMixin],

  data() {
    return {
      menuAT: false,
      menuLT: false,
      newTimeEntry: {
        arrivalTime: null,
        leavingTime: null,
        comment: ''
      },
      timeEntries: [
        {
          arrivalTime: 7.93, //7:56
          leavingTime: 16.65, //16:39
          targetTime: 8,
          id: '#1'
        },
        {
          arrivalTime: 8.2, //8:12
          leavingTime: 18.73, //18:42
          targetTime: 8,
          id: '#2'
        },
        {
          arrivalTime: 8.57, //8:32
          leavingTime: 14.18, //14:11
          targetTime: 8,
          id: '#2'
        },
        {
          arrivalTime: 7.5, //8:32
          leavingTime: 15.47, //14:11
          targetTime: 8,
          id: '16 Di'
        },
        {
          arrivalTime: 7.42, //8:32
          leavingTime: 13.79, //14:11
          targetTime: 8,
          id: '19 Fr'

        },
        {
          arrivalTime: 8.15, //8:32
          leavingTime: 14.59, //14:11
          targetTime: 8,
          id: '26 Fr'
        }
      ]
    };
  },

  computed: {},
  methods: {
    saveEntry() {
      const submittableTimeEntry = {
        arrivalTime: this.timeStringToDecimal(this.newTimeEntry.arrivalTime),
        leavingTime: this.timeStringToDecimal(this.newTimeEntry.leavingTime),
        targetTime: 8,
        comment: this.newTimeEntry.comment
      };

      //this.$store.dispatch('createTimeEntry', submittableTimeEntry);


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
    }
  }
};
</script>


<style scoped>
.listcontainer .row {
  border-bottom: solid 1px lightgrey;
}
</style>
