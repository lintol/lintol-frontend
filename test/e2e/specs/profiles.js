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
  'add new profile button exist test': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#profiles')
      .waitForElementVisible('#addNewProfileButton', visiblePauseTime)
      .end()
  },
  'check profile row exists test': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#profiles')
      .waitForElementVisible('#profiles-row', visiblePauseTime)
      .end()
  },
  'add new profile page exists test': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#profiles')
      .waitForElementVisible('#addNewProfileButton', visiblePauseTime)
      .click('#addNewProfileButton')
      .waitForElementVisible('#add-profile-panel', visiblePauseTime)
      .end()
  },
  'populate new profile test': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#profiles')
      .waitForElementVisible('#addNewProfileButton', visiblePauseTime)
      .click('#addNewProfileButton')
      .waitForElementVisible('#profileName', visiblePauseTime)
      .waitForElementVisible('#profileDescription', visiblePauseTime)
      .waitForElementVisible('#profileScript', visiblePauseTime)
      .setValue('input[id=profileName]', 'bob profile')
      .setValue('textarea[id=profileDescription]', 'bob description')
      .setValue('textarea[id=profileScript]', 'bob script')
      .click('#addProfile')
      .waitForElementVisible('#profileTable', visiblePauseTime)
      .end()
  },
  'edit profile test': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#profiles')
      .click('#profileAction option[value=edit]')
      .waitForElementVisible('#editProfilePanel', visiblePauseTime)
      .waitForElementVisible('#profileName', visiblePauseTime)
      .waitForElementVisible('#profileDescription', visiblePauseTime)
      .waitForElementVisible('#profileScript', visiblePauseTime)
      .setValue('input[id=profileName]', 'bob profile')
      .setValue('textarea[id=profileDescription]', 'bob description')
      .setValue('textarea[id=profileScript]', 'bob script')
      .click('#saveProfileChanges')
      .waitForElementVisible('#profileTable', visiblePauseTime)
      .end()
  }
}
