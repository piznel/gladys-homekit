/* eslint-disable no-undef */
const Promise = require('bluebird');
const shared = require('./shared.js');
const getDevice = require('./getDeviceTypes.js');
const createAccessories = require('./createAccessories');
const bridge = require('./bridge.js');

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
