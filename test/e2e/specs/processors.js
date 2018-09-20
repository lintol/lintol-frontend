// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
const visiblePauseTime = 1000;

module.exports = {
  'website up Test': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .end()
  },
   'check processor row exists test': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#processors')
      .waitForElementVisible('#processors-row', visiblePauseTime)
      .end()
  },
  'check if the search is visible': function (browser) {
   const devServer = browser.globals.devServerURL
   browser
     .url(devServer)
     .waitForElementVisible('#app', 2000)
     .click('#processors')
     .waitForElementVisible('#processorSearch', visiblePauseTime)
     .end()
 },
 'check if the search works': function (browser) {
  const devServer = browser.globals.devServerURL
  browser
    .url(devServer)
    .waitForElementVisible('#app', 2000)
    .click('#processors')
    .waitForElementVisible('#processorSearch', visiblePauseTime)
    .setValue('#processorSearch','CSV')
    .pause(2000)
    .assert.elementCount('#processors-row', 2)
    .clearValue('#processorSearch')
    .setValue('#processorSearch','Information')
    .pause(2000)
    .assert.elementCount('#processors-row', 1)
    .end();
  },
   'check processor count to 5': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#processors')
      .assert.containsText('.numberOfProcessors','5 Processors')
      .end()
  },
}
