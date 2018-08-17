import moment from 'moment';
// UTC
class Time {
    getCurrentDateTime() {
      const rawDateTime = new Date();
      const DateTime = moment(rawDateTime);
      return DateTime;
    }
}

const time = new Time();
module.exports = time;