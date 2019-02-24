/* eslint-disable no-undef */
const Promise = require('bluebird');
const shared = require('./homekit.shared.js');
const getDevice = require('./homekit.getDeviceTypes.js');
const createAccessories = require('./homekit.createAccessories');
const bridge = require('./homekit.bridge.js');

module.exports = function init() {
  return gladys.param.getValue('Homekit_devices')
    .then((devices) => {
      shared.config = JSON.parse(devices);
      return getDevice()
        .then(deviceTypes => Promise.filter(deviceTypes, deviceType => (deviceType.homeKit)))
        .then(filteredDeviceTypes => createAccessories(filteredDeviceTypes))
        .then(accessories => bridge(accessories));
    })
    .catch(err => sails.log.error('Homekit Module : failed to load config'));
};
