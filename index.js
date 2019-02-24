/* eslint-disable no-undef */
/* eslint-disable func-names */

const init = require('./lib/homekit.init.js');
const homekitController = require('./controller/homekitController.js');
const install = require('./lib/homekit.install.js');

module.exports = function (sails) {
  gladys.on('ready', () => {
    init();
  });

  return {
    install,
    routes: {
      before: {
        'patch /homekit/save': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
        'get /homekit/device': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
      },
      after: {
        'patch /homekit/save': homekitController.saveConfig,
        'get /homekit/device': homekitController.getDeviceTypes,
      },
    },
  };
};
