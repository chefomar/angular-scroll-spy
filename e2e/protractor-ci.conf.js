const { config } = require('./protractor.conf');

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--headless', '--no-sandbox']
  }
};

exports.config = config;
