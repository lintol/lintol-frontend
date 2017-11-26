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
  'add new processor button exist test': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#processors')
      .waitForElementVisible('#addNewProcessorButton', visiblePauseTime)
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
  'add new processor page exists test': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#processors')
      .waitForElementVisible('#addNewProcessorButton', visiblePauseTime)
      .click('#addNewProcessorButton')
      .waitForElementVisible('#addProcessorPanel', visiblePauseTime)
      .end()
  },
  'populate new processor test': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#processors')
      .waitForElementVisible('#addNewProcessorButton', visiblePauseTime)
      .click('#addNewProcessorButton')
      .waitForElementVisible('#processorName', visiblePauseTime)
      .waitForElementVisible('#processorDescription', visiblePauseTime)
      .setValue('input[id=processorName]', 'bob processor')
      .setValue('textarea[id=processorDescription]', 'bob description')
      browser.assert.value("#processorName", "bob processor");
      browser
      .click('#addProcessor')
      .waitForElementVisible('#processorTable', visiblePauseTime)
      .end()
  }
}
