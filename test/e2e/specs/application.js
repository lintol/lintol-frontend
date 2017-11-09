// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  const visiblePauseTime = 1000;
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
  'menu exists Test': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#navigation', 2000)
      .end()
  },
  'menu items exist': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#profiles', visiblePauseTime)
      .waitForElementVisible('#reports', visiblePauseTime)
      .waitForElementVisible('#users', visiblePauseTime)
      .waitForElementVisible('#settings', visiblePauseTime)
      .end()
  },
  'test profiles panel exist': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#profiles', visiblePauseTime)
      .click('#profiles')
      .waitForElementVisible('#profiles-panel', visiblePauseTime)
      .end()
  },
  'test reports panel exist': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#reports', visiblePauseTime)
      .click('#reports')
      .waitForElementVisible('#reports-panel', visiblePauseTime)
      .end()
  },
  'test users panel exist': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#users', visiblePauseTime)
      .click('#users')
      .waitForElementVisible('#users-panel', visiblePauseTime)
      .end()
  },
  'test settings panel exist': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#settings', visiblePauseTime)
      .click('#settings')
      .waitForElementVisible('#settings-panel', visiblePauseTime)
      .end()
  }
}
