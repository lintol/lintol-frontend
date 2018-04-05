import { convertDate, convertDateTime, convertToTimeStamp, dateList, filter, selectedFiltered } from '@/components/common/date.js';

describe('convertDate', () => {
  it('convertDate is a function', () => {
    expect(convertDate).to.be.a('function');
  });
  it('return the correct date', () => {
    expect(convertDate('2018-03-18')).to.equal('18th Mar 2018');
  });
  it('return the undefined date and time', () => {
    expect(convertDate('')).to.equal('undefined');
  });
});

describe('convertDateTime', () => {
  it('convertDateTime is a function', () => {
    expect(convertDate).to.be.a('function');
  });
  it('return the correct date and time', () => {
    expect(convertDateTime('2018-03-18 12:01')).to.equal('12:01 18th Mar 2018');
  });
  it('return the undefined date and time', () => {
    expect(convertDateTime('')).to.equal('undefined');
  });
});

describe('convertToTimeStamp', () => {
  it('convertToTimeStamp is a function', () => {
    expect(convertToTimeStamp).to.be.a('function');
  });
  it('return the correct date and time', () => {
    expect(convertToTimeStamp('2018-03-18 14:12:47')).to.equal('1521382367');
  });
  it('return the undefined date and time', () => {
    expect(convertToTimeStamp('')).to.equal('undefined');
  });
});

describe('dateList', () => {
  it('dateList is a function', () => {
    expect(dateList).to.be.a('function');
  });
  var objects = [];
  var object = {
    createdAt: {
      date: '2018-02-01'
    }
  };
  var object2 = {
    createdAt: {
      date: '2018-02-02'
    }
  };
  var sameObject2 = {
    createdAt: {
      date: '2018-02-02'
    }
  };
  objects.push(object);
  objects.push(object2);
  objects.push(sameObject2);
  it('return a list of unique dates', () => {
    expect(dateList(objects).length).to.equal(2);
  });
});

describe('filter', () => {
  it('filter is a function', () => {
    expect(filter).to.be.a('function');
  });
  var objects = [];
  var object = {
    user: 'mary'
  };
  var object2 = {
    user: 'john'
  };
  var object3 = {
    user: 'mike'
  };
  objects.push(object);
  objects.push(object2);
  objects.push(object3);
  it('return the list of properties from objects', () => {
    expect(filter(objects, 'user').length).to.equal(3);
  });
});

describe('selectedFiltered', () => {
  it('selectedFiltered is a function', () => {
    expect(selectedFiltered).to.be.a('function');
  });
  var objects = [];
  var object = {
    user: 'mary',
    role: {
      type: 'admin'
    }
  };
  var object2 = {
    user: 'john',
    role: {
      type: 'admin'
    }
  };
  var object3 = {
    user: 'mike',
    role: {
      type: 'admin'
    }
  };
  objects.push(object);
  objects.push(object2);
  objects.push(object3);
  it('return the list of properties from objects', () => {
    expect(selectedFiltered(objects, 'mary', 'user').length).to.equal(1);
  });
  it('return the list of properties from object inside an object.', () => {
    expect(selectedFiltered(objects, 'admin', 'role', 'type').length).to.equal(3);
  });
});
