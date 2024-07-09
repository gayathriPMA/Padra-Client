
const { defineConfig } = require('cypress');

module.exports = defineConfig({
 
  browser: "browserstack:opera@112",
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true
  },
 "env": {
    "browserstackUsername": "gayathrivarathar_nMB2kK",
    "browserstackAccessKey": "p4EYNwEYXpNExRQkMwpN"
  },
  e2e: {
    baseUrl: "https://dev-app.padraclinic.ca/login",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      supportFile: 'cypress/support/e2e.js'
    },
  },
});
