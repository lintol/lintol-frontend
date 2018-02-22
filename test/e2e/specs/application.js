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
      .click('#profilesLink')
      .waitForElementVisible('#profiles-panel', visiblePauseTime)
      .assert.cssClassPresent('#profilesLink', 'active')
      .assert.urlEquals('http://localhost:8080/#/profiles/profiletable')
      .end()
  },
  'test processors panel exist': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#processors', visiblePauseTime)
      .click('#processorsLink')
      .waitForElementVisible('#processorPanel', visiblePauseTime)
      .assert.cssClassPresent('#processorsLink', 'active')
      .assert.urlEquals('http://localhost:8080/#/processors/processortable')
      .end()
  },
  'test reports panel exist': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#reports', visiblePauseTime)
      .click('#reports')
      .waitForElementVisible('#reportsPanel', visiblePauseTime)
      .assert.cssClassPresent('#reportsLink', 'active')
      .assert.urlEquals('http://localhost:8080/#/reports/reporttable')
      .end()
  },
  'test users panel exist': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#users', visiblePauseTime)
      .click('#users')
      .waitForElementVisible('#users-panel', visiblePauseTime)
      .assert.cssClassPresent('#usersLink', 'active')
      .assert.urlEquals('http://localhost:8080/#/users')
      .end()
  },
  'test settings panel exist': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#settings', visiblePauseTime)
      .click('#settings')
      .waitForElementVisible('#settings-panel', visiblePauseTime)
      .assert.cssClassPresent('#settingsLink', 'active')
      .assert.urlEquals('http://localhost:8080/#/settings')
      .end()
  },
  'logo links back to home page': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#settings', visiblePauseTime)
      .click('#settings')
      .waitForElementVisible('#settings-panel', visiblePauseTime)
      .click('#home')
      .assert.urlEquals('http://localhost:8080/#/profiles/profiletable')
      .end()
  }
}
