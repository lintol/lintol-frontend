module.exports = function () {
  return {
    profiles: require('./test/e2e/mocks/profiles.json'),
    processors: require('./test/e2e/mocks/processors.json'),
    reports: require('./test/e2e/mocks/reports.json')
  }
}

