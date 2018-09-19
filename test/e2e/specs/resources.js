// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
const visiblePauseTime = 1000;

module.exports = {
  /* 'check resource row exists test': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#resources')
      .waitForElementVisible('#resources-row', visiblePauseTime)
      .end()
  }, */
  /* 'click add url button': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#resources')
      .click('#addFromUrl')
      .waitForElementVisible('#addUrlModal', visiblePauseTime)
      .end()
  },
  'check number of selected resources': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#resources')
      .waitForElementVisible('#resourceTable', visiblePauseTime);
      browser.assert.cssClassPresent("#numberOfSelectedResources", "rightSeparator");
      browser.assert.containsText("#numberOfSelectedResources", "0 Selected")
      .end()
  }, */
  /* 'check if Choose Function has options': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#resources')
      .waitForElementVisible('#resourceTable', visiblePauseTime)
      .click('#resourceAction')
      .waitForElementVisible('#resourceAction option',visiblePauseTime)
      .end()
  } */
  /* 'click upload your files button': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#resources')
      .waitForElementVisible('#resources-row', visiblePauseTime)
      .end()
  },
  'search resources': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#resources')
      .setValue('input[id=searchResources]', 'waste')
      .waitForElementVisible('#resources-row', visiblePauseTime);
      browser.assert.value("#resourceName", "waste-sites.geojson")
      .end()
  },
  'filter by type': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#resources')
      .waitForElementVisible('#resources-row', visiblePauseTime)
      .click('#typeFilter option[value=geojson]')
      .waitForElementVisible('#resources-row', visiblePauseTime);
      browser.assert.value("#resourceName", "waste-sites.geojson")
      .end()
  },
  'filter by source': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#resources')
      .waitForElementVisible('#resources-row', visiblePauseTime)
      .click('#sourceFilter option[value=CKAN]')
      .waitForElementVisible('#resources-row', visiblePauseTime);
      browser.assert.value("#resourceName", "waste-sites.geojson")
      .end()
  },
  'check resource status': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#resources')
      .waitForElementVisible('#resources-row', visiblePauseTime);
      browser.assert.value("#resourceName", "Report Run")
      .end()
  },
  'Archive resource': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#resources')
      .waitForElementVisible('#resources-row', visiblePauseTime)
      .click('#resourceAction option[value=Archive]')
      browser.assert.value("#numberOfSelectedResources", "0 Selected")
      .end()
  },
  'Delete resource': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#resources')
      .waitForElementVisible('#resources-row', visiblePauseTime)
      .click('#resourceAction option[value=Delete]')
      browser.assert.value("#numberOfSelectedResources", "0 Selected")
      .end()
  },
  'filter by date': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#resources')
      .waitForElementVisible('#resources-row', visiblePauseTime);
      .click('#dateFilter option[value=geojson]')
      .waitForElementVisible('#resources-row', visiblePauseTime);
      browser.assert.value("#resourceName", "waste-sites.geojson")
      .end()
  },
  'click upload your files button': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .click('#resources')
      .click('#uploadYourFiles')
      .waitForElementVisible('#addUrlModal', visiblePauseTime)
      .end()
  }*/
}
