import moment from 'moment';

export function convertDate (dateString) {
  return moment(dateString).format('Do MMMM YYYY');
}

export function dateList (objects) {
  console.log(objects);
  var dateList = [];
  objects.filter((event) => {
    if (event.createdAt && dateList.indexOf(convertDate(event.createdAt.date)) === -1) {
      dateList.push(convertDate(event.createdAt.date));
    }
  });
  return dateList;
}

export function filter (objects, prop) {
  var resultList = [];
  objects.filter((event) => {
    if (resultList.indexOf(event[prop]) === -1) {
      resultList.push(event[prop]);
    }
  });
  return resultList;
}

export function selectedFiltered (result, selected, prop) {
  if (selected !== '') {
    result = result.filter((element) => {
      return element[prop] === selected;
    });
  }
  return result;
}
