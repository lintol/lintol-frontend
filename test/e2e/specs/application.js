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
      .waitForElementVisible('#processors', visiblePauseTime)
      .waitForElementVisible('#users', visiblePauseTime)
      .waitForElementVisible('#resources', visiblePauseTime)
      .end()
  },
  'test profiles panel exist': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#profiles', visiblePauseTime)

      .click('#profiles')
      .waitForElementVisible('#profiles-panel', visiblePauseTime)
      .assert.cssClassPresent('#profiles', 'menuEntryActive')
      .assert.urlEquals('http://localhost:8080/#/application/profiles/profiletable')
      .end()
  },
  'test processors panel exist': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#processors', visiblePauseTime)
      .click('#processors')
      .waitForElementVisible('#processor-panel', visiblePauseTime)
      .assert.cssClassPresent('#processors', 'menuEntryActive')
      .assert.urlEquals('http://localhost:8080/#/application/processors/processortable')
      .end()
  },
  'test reports panel exist': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#reports', visiblePauseTime)
      .click('#reports')
      .waitForElementVisible('#reports-panel', visiblePauseTime)
      .assert.cssClassPresent('#reports', 'menuEntryActive')
      .assert.urlEquals('http://localhost:8080/#/application/reports/reporttable')
      .end()
  },
  'test users panel exist': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#users', visiblePauseTime)
      .click('#users')
      .waitForElementVisible('#users-panel', visiblePauseTime)
      .assert.cssClassPresent('#users', 'menuEntryActive')
      .assert.urlEquals('http://localhost:8080/#/application/users/usertable')
      .end()
  },
  'test resources panel exist': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#resources', visiblePauseTime)
      .click('#resources')
      .waitForElementVisible('#resources-panel', visiblePauseTime)
      .assert.cssClassPresent('#resources', 'menuEntryActive')
      .assert.urlEquals('http://localhost:8080/#/application/resources/resourcetable')
      .end()
  },
  'logo links back to home page': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#resources', visiblePauseTime)
      .click('#resources')
      .waitForElementVisible('#resources-panel', visiblePauseTime)
      .click('#home')
      .assert.urlEquals('http://localhost:8080/#/application/profiles/profiletable')
      .end()
  }
}
