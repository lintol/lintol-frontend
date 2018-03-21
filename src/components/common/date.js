import moment from 'moment';

export function convertDate (dateString) {
  if (dateString === undefined || dateString === '') {
    return 'undefined';
  } else {
    return moment(dateString).format('Do MMM YYYY');
  }
}

export function convertDateTime (dateString) {
  if (dateString === undefined || dateString === '') {
    return 'undefined';
  } else {
    return moment(dateString).format('HH:mm Do MMM YYYY');
  }
}

export function convertToTimeStamp (dateString) {
  if (dateString === undefined || dateString === '') {
    return 'undefined';
  } else {
    return moment(dateString).format('X'); // for seconds timestamp
  }
}

/**
* used to create a array of dates from a list of objects. Used for date drops downs.
*/
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

/**
*  returns a list of results that match 1 layer or 2 layer props that equal the selected variable.
*/
export function selectedFiltered (result, selected, prop1, prop2) {
  if (selected !== '') {
    result = result.filter((element) => {
      if (prop2) {
        return element[prop1][prop2] === selected;
      } else {
        return element[prop1] === selected;
      }
    });
  }
  return result;
}
