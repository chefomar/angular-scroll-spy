const { config } = require('./protractor.conf');

config.capabilities = {};

config.multiCapabilities = [
  {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--no-sandbox']
    }
  },
  {
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: ['--headless']
    }
  }
];

exports.config = config;
