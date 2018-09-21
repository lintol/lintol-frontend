// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
const visiblePauseTime = 1000;

module.exports = {
<<<<<<< HEAD
   'check report row exists test': function (browser) {
=======
  /* 'check report row exists test': function (browser) {
>>>>>>> bc844817a02480f79de830dccdb391abe118ad58
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#reports')
<<<<<<< HEAD
      .waitForElementVisible('#reportTable', visiblePauseTime)
      .waitForElementVisible('#report-row', visiblePauseTime)
      .end()
  },
  'check if view Report button correctly redirect': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#reports')
      .waitForElementVisible('#reportTable', visiblePauseTime)
      .waitForElementVisible('#report-row', visiblePauseTime)
      .click('#report-row input')
      .assert.urlEquals('http://localhost:8080/#/application/reports/reportview/c1c27a67-5dac-4069-8d70-20057cddf8e3/listreportview')
      .end()
  },
  'check if dateFilter has options': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#reports')
      .waitForElementVisible('#reportTable', visiblePauseTime)
      .click('#dateFilter')
      .waitForElementVisible('#dateFilter option', visiblePauseTime)
      .end()
  },
  'check if selectedUser has options': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#reports')
      .waitForElementVisible('#reportTable', visiblePauseTime)
      .click('#userFilter')
      .waitForElementVisible('#userFilter option', visiblePauseTime)
      .end()
  },
  'check if selectedUser works': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#reports')
      .waitForElementVisible('#reportTable', visiblePauseTime)
      .click('#userFilter')
      .waitForElementVisible('#userFilter option', visiblePauseTime)
      .click('#userFilter option:nth-child(2)')
      .assert.elementCount('#report-row', 1)
      .end()
  },
  'check if profileFilter has options': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#reports')
      .waitForElementVisible('#reportTable', visiblePauseTime)
      .click('#profileFilter')
      .waitForElementVisible('#profileFilter option', visiblePauseTime)
      .end()
  }
=======
      .waitForElementVisible('#reports-row', visiblePauseTime)
      .end()
  } */
>>>>>>> bc844817a02480f79de830dccdb391abe118ad58
}
