// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
const visiblePauseTime = 1000;

module.exports = {
  /* 'website up Test': function (browser) {
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
  'Check if add neew profile button redirect into the right page': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#profiles')
      .waitForElementVisible('#addNewProfileButton', visiblePauseTime)
      .click('#addNewProfileButton')
      .assert.urlEquals('http://localhost:8080/#/application/profiles/addprofile')
      .end()
  },
  'filter exist test': function (browser){
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app',2000)
      .click('#profiles')
      .waitForElementVisible('#nameFilter',visiblePauseTime)
      .end()
  },
  'check if Filter has options': function (browser){
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app',2000)
      .click('#profiles')
      .waitForElementVisible('#nameFilter',visiblePauseTime)
      .click('#nameFilter')
      .waitForElementVisible('#nameFilter option',visiblePauseTime)
      .end()
  },
  'check if Edit/Archive button has options': function (browser){
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app',2000)
      .click('#profiles')
      .waitForElementVisible('#columns',visiblePauseTime)
      .waitForElementVisible('#profiles-row',visiblePauseTime)
      .waitForElementVisible('#profileAction ',visiblePauseTime)
      .click('#profileAction')
      .waitForElementVisible('#profileAction option',visiblePauseTime)
      .end()
  }, */ 
  /*'check profile row exists test': function (browser) {
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
      .setValue('input[id=profileName]', 'bob profile')
      .setValue('textarea[id=profileDescription]', 'bob description')
      // browser.expect.element('#profileName').text.to.equal('bob profile');
      browser.assert.value("#profileName", "bob profile");
      browser.assert.value("#profileDescription", "bob description");
      browser
      .click('#addProfile')
      .waitForElementVisible('#profileTable', visiblePauseTime)
      .end()
  },*/
  /*'edit profile test': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#profiles')
      .click('#profileAction option[value=edit]')
      .waitForElementVisible('#editProfilePanel', visiblePauseTime)
      .waitForElementVisible('#profileName', visiblePauseTime)
      .waitForElementVisible('#profileDescription', visiblePauseTime)
      .clearValue('input[id=profileName]')
      .clearValue('textarea[id=profileDescription]')
      .setValue('input[id=profileName]', 'tom profile')
      .setValue('textarea[id=profileDescription]', 'bbb')
      browser.assert.value("#profileName", "tom profile");
      browser
      .click('#saveProfileChanges')
      .waitForElementVisible('#profileTable', visiblePauseTime)
      .end()
  }*/
}
