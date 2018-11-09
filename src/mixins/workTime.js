export const workTimeMixin = {
  methods: {
    msToTime(ms) {
      // 1- Convert to seconds:
      var seconds = ms / 1000;
      // 2- Extract hours:
      var hours = parseInt(seconds / 3600, 10); // 3,600 seconds in 1 hour
      seconds = seconds % 3600; // seconds remaining after extracting hours
      // 3- Extract minutes:
      var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
      // 4- Keep only seconds not extracted to minutes:
      seconds = Math.round(seconds % 60);
      return hours + ':' + minutes;
      //alert( hours+":"+minutes+":"+seconds);
    },

    timeStringToDecimal(time) {
      time = time + '';
      var hoursMinutes = time.split(/[.:]/);
      var hours = parseInt(hoursMinutes[0], 10);
      var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
      return hours + minutes / 60;
    },

    //Bruttoarbeitszeit
    grossWorkTime(entry) {
      let { arrivalTime, leavingTime } = entry;
      let diff;
      if (leavingTime > arrivalTime) {
        diff = leavingTime - arrivalTime;
      } else {
        diff = leavingTime - arrivalTime + 24;
      }
      return diff;
    },

    breakWorkTime(entry) {
      let { arrivalTime, leavingTime } = entry;
      let diff = leavingTime - arrivalTime;
      if (diff > 6.25) {
        return 0.75;
      } else if (diff > 2) {
        return 0.25;
      } else {
        return 0;
      }
    },

    //Nettoarbeitszeit
    netWorkTime(entry) {
      let { arrivalTime, leavingTime } = entry;
      let grossWorkTime = this.grossWorkTime(entry);
      let firstBreak = 0.25;
      let secondBreak = 0.5;

      if (6.25 < grossWorkTime) {
        if (grossWorkTime < 6.75) {
          return 6;
        }
        return grossWorkTime - firstBreak - secondBreak;
      } else if (2.0 < grossWorkTime) {
        if (grossWorkTime < 2.25) {
          return 2;
        }
        return grossWorkTime - firstBreak;
      } else {
        return grossWorkTime;
      }
      return 'N/A';
    },

    //Sollarbeitszeit
    overtime(entry) {
      return this.netWorkTime(entry) - entry.targetTime;
    }
  }
};
