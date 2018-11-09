<template>
			<v-card class="elevation-2 mt-4 worktimeEntry">
				<v-toolbar color="green lighten-1" dense>
					<v-toolbar-title>{{worktimeEntry.timeArrival}}</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon>
						<v-icon>edit</v-icon>
					</v-btn>
					<v-btn icon>
						<v-icon>delete</v-icon>
					</v-btn>
				</v-toolbar>
				<v-card-text>
					<v-form>
						<v-container>
							<v-layout>
								<v-flex xs12 sm4>
                    <v-menu ref="menuAT" :close-on-content-click="false" v-model="menuAT" :nudge-right="40" :return-value.sync="timeAT" lazy transition="scale-transition"
                    offset-y full-width max-width="290px" min-width="290px">
                      <v-text-field slot="activator" v-model="timeAT" label="Arrival Time" prepend-inner-icon="access_time"
                      color="green" box readonly clearable></v-text-field>
                      <v-time-picker v-if="menuAT" v-model="timeAT" @change="$refs.menuAT.save(timeAT)" format="24hr" color="green"></v-time-picker>
                    </v-menu>
								</v-flex>
								<v-flex xs12 sm4>
                    <v-menu ref="menuLT" :close-on-content-click="false" v-model="menuLT" :nudge-right="40" :return-value.sync="timeLT" lazy transition="scale-transition"
                    offset-y full-width max-width="290px" min-width="290px">
                      <v-text-field slot="activator" v-model="timeLT" label="Arrival Time" prepend-inner-icon="access_time"
                      color="green" box readonly clearable></v-text-field>
                      <v-time-picker v-if="menuLT" v-model="timeLT" @change="$refs.menuLT.save(timeLT)" format="24hr" color="green"></v-time-picker>
                    </v-menu>
								</v-flex>
								<v-flex xs12 sm3 offset-sm1>
									<v-text-field v-model="worktimeEntry.overtime" box disabled label="Overtime" :prepend-inner-icon="overtimeIcon">
									</v-text-field>
								</v-flex>
							</v-layout>
						</v-container>
					</v-form>
				</v-card-text>
			</v-card>

</template>


<script>
export default {
  props: ["worktimeEntry"],
  data() {
    return {
      menuAT: false,
      timeAT: null,
      menuLT: false,
      timeLT: null
    };
  },
  computed: {
    overtimeIcon() {
      if (this.worktimeEntry.overtime > 0) {
        return "trending_up";
      } else {
        return "trending_down";
      }
    }
  }
};
</script>



<style>
.worktimeEntry .v-form > .container {
	margin-bottom: -30px;
}
.time-picker {
  display: inline-block;
  position: relative;
  font-size: 1em;
  width: 10em;
  font-family: sans-serif;
  vertical-align: middle;
}

.time-picker * {
  box-sizing: border-box;
}

.time-picker input.display-time {
  border: 1px solid #d2d2d2;
  width: 10em;
  height: 2.2em;
  padding: 0.3em 0.5em;
  font-size: 1em;
}

.time-picker .clear-btn {
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  margin-top: -0.15em;
  z-index: 3;
  font-size: 1.1em;
  line-height: 1em;
  vertical-align: middle;
  width: 1.3em;
  color: #d2d2d2;
  background: rgba(255, 255, 255, 0);
  text-align: center;
  font-style: normal;

  -webkit-transition: color 0.2s;
  transition: color 0.2s;
}

.time-picker .clear-btn:hover {
  color: #797979;
  cursor: pointer;
}

.time-picker .time-picker-overlay {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.time-picker .dropdown {
  position: absolute;
  z-index: 5;
  top: calc(2.2em + 2px);
  left: 0;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
  width: 10em;
  height: 20em;
  font-weight: normal;
}

.time-picker .dropdown .select-list {
  width: 10em;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: space-between;
}

.time-picker .dropdown ul {
  padding: 0;
  margin: 0;
  list-style: none;

  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}

.time-picker .dropdown ul.minutes,
.time-picker .dropdown ul.seconds,
.time-picker .dropdown ul.apms {
  border-left: 1px solid #fff;
}

.time-picker .dropdown ul li {
  text-align: center;
  padding: 0.3em 0;
  color: #161616;
}

.time-picker .dropdown ul li:not(.hint):hover {
  background: rgba(0, 0, 0, 0.08);
  color: #161616;
  cursor: pointer;
}

.time-picker .dropdown ul li.active,
.time-picker .dropdown ul li.active:hover {
  background: #41b883;
  color: #fff;
}

.time-picker .dropdown .hint {
  color: #a5a5a5;
  cursor: default;
  font-size: 0.8em;
}
</style>
