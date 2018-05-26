/**
*  function that will return a unqiue array of properties from a list of objects
*/
export function getUniqueListOfValues (array, property, property2) {
  if (property2) {
    return array.filter(item => item[property]).map(item => item[property][property2]).filter((value, index, self) => self.indexOf(value) === index);
  } else {
    return array.map(item => item[property]).filter((value, index, self) => self.indexOf(value) === index);
  }
}
