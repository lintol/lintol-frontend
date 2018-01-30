import moment from 'moment';

export function convertDate (dateString) {
  return moment(dateString).format('Do MMMM YYYY');
}
