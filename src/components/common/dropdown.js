/**
*  function that will return a unqiue array of properties from a list of objects
*/
export function getUniqueListOfValues (array, property) {
  return array.map(item => item[property]).filter((value, index, self) => self.indexOf(value) === index);
}
