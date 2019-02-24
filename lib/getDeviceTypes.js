const Promise = require('bluebird');
const shared = require('./shared.js');

const unmanagedCategory = ['music', 'television', 'phone', 'computer', 'battery-sensor'];

/**
 * @private
 * @description Adds categories to deviceTypes of one "Light" device.
 * @param {number} idDevice - Id of the device.
 * @param {Object} deviceTypes - List of all devicetypes by room.
 * @returns {Promise} Resolving with some deviceType.category add.
 * @example
 * deviceLight(12, deviceTypes)
 */
function deviceLight(idDevice, deviceTypes) {
  return Promise.filter(deviceTypes, deviceType => deviceType.device === idDevice)
    .then(filteredDeviceTypes => Promise.map(filteredDeviceTypes, (deviceType) => {
      // brightness
      if (deviceType.type.match(/bright/i)) {
        deviceType.category = 'brightness';
        return deviceType;
      }
      // brightness
      if (deviceType.type.match(/intens/i)) {
        deviceType.category = 'brightness';
        return deviceType;
      }
      // saturation
      if (deviceType.type.match(/satur/i)) {
        deviceType.category = 'saturation';
        return deviceType;
      }
      // Hue
      if (deviceType.type.match(/color/i)) {
        deviceType.category = 'hue';
        return deviceType;
      }
      if (deviceType.category !== 'light') {
        deviceType.category = 'unknown';
      }
      return deviceType;
    }));
}

/**
 * @private
 * @description Adds categories to all "light" devices.
 * @param {Object} deviceTypes - List of all devicetypes by room.
 * @returns {Promise} Resolving with all devices with deviceTypes "light" change.
 * @example
 * addCategoriesLight(deviceTypes)
 * .then((deviceTypes) => {
 *    //........
 * })
 */
function addCategoriesLight(deviceTypes) {
  return Promise.each(deviceTypes, (room) => {
    delete room.house;
    return Promise.each(room.deviceTypes, (deviceType) => {
      if (deviceType.category === 'light') {
        return deviceLight(deviceType.device, room.deviceTypes);
      }
      return deviceType;
    });
  });
}

/**
 * @private
 * @description Adds categories to deviceTypes of one "outlet" device.
 * @param {number} idDevice - Id of the device.
 * @param {Object} deviceTypes - List of all devicetypes by room.
 * @returns {Promise} Resolving with some deviceType.category add.
 * @example
 * deviceOutlet(12, deviceTypes)
 *  * .then((deviceTypes) => {
  *    //........
  * })
 */
function deviceOutlet(idDevice, deviceTypes) {
  return Promise.filter(deviceTypes, deviceType => deviceType.device === idDevice)
    .then(filteredDeviceTypes => Promise.map(filteredDeviceTypes, (deviceType) => {
      // inUse
      if (deviceType.type.match(/use/i)) {
        deviceType.category = 'outletInUse';
        return deviceType;
      }
      if (deviceType.category !== 'outlet') {
        deviceType.category = 'Unknown';
      }
      return deviceType;
    }));
}

/**
 * @private
 * @description Adds categories to all "outlet" devices.
 * @param {Object} deviceTypes - List of all devicetypes by room.
 * @returns {Promise} Resolving with all devices with deviceTypes "outlet" change.
 * @example
 * addCategoriesOutlet(deviceTypes)
 * .then((deviceTypes) => {
 *    //........
 * })
 */
function addCategoriesOutlet(deviceTypes) {
  return Promise.each(deviceTypes, room => Promise.each(room.deviceTypes, (deviceType) => {
    if (deviceType.category === 'outlet') {
      return deviceOutlet(deviceType.device, room.deviceTypes);
    }
    return deviceTypes;
  }));
}

/**
 * @private
 * @description Adds categories to all "switch" and "binary sensor" devices.
 * @param {Object} deviceTypes - List of all devicetypes by room.
 * @returns {Promise} Resolving with all devices with deviceTypes "outlet" change.
 * @example
 * addCategoriesSwitchAndBinarySensor(deviceTypes)
 * .then((deviceTypes) => {
 *    //........
 * })
 */
function addCategoriesSwitchAndBinarySensor(deviceTypes) {
  return Promise.each(deviceTypes, room => Promise.each(room.deviceTypes, (deviceType) => {
    if (deviceType.category === null && deviceType.type === 'binary') {
      if (deviceType.sensor === 0) {
        deviceType.category = 'switch'; // Switch
      } else {
        deviceType.category = 'binary-Sensor'; // Binary Sensor (motion, smoke, ...)
      }
    }
  }));
}


/**
 * @private
 * @description Remove devicetypes with "unknow", "null" or "unmanaged" categories.
 * @param {Object} deviceTypes - List of all devicetypes by room.
 * @returns {Promise} Resolving with all devices without deviceTypes with "unknow", "null" or "unmanaged" categories.
 * @example
 * removeCategoryNullandUnknown(deviceTypes)
 * .then((deviceTypes) => {
 *    //........
 * })
 */
function removeCategoryNullandUnknown(deviceTypes) {
  return Promise.each(deviceTypes, async (room) => {
    // eslint-disable-next-line arrow-body-style
    const filteredDeviceTypes = await Promise.filter(room.deviceTypes, (deviceType) => {
      return (deviceType.category && deviceType.category !== 'unknown' && !unmanagedCategory.includes(deviceType.category));
    });
    // eslint-disable-next-line no-return-assign
    return room.deviceTypes = filteredDeviceTypes;
  });
}


/**
 * @private
 * @description Remove empty room.
 * @param {Object} deviceTypes - List of all devicetypes by room.
 * @returns {Promise} Resolving with all rooms that have devices.
 * @example
 * removeEmptyRoom(deviceTypes)
 * .then((deviceTypes) => {
 *    //........
 * })
 */
function removeEmptyRoom(deviceTypes) {
  return Promise.filter(deviceTypes, room => (room.deviceTypes && room.deviceTypes.length > 0));
}

/**
 * @private
 * @description Add "homekit" porperties.
 * @param {Object} deviceTypes - List of all devicetypes by room.
 * @returns {Promise} Resolving with all devicetypes with new Homekit's properties.
 * @example
 * changeOwnProperty(deviceTypes)
 * .then((deviceTypes) => {
 *    //........
 * })
 */
function changeOwnProperty(deviceTypes) {
  return Promise.each(deviceTypes, room => Promise.map(room.deviceTypes, (deviceType) => {
    deviceType.homekit = false;
    deviceType.friendlyName = '';

    if (Object.prototype.hasOwnProperty.call(shared.config, deviceType.id)) {
      deviceType.homekit = shared.config[deviceType.id].homekit;
      deviceType.friendlyName = shared.config[deviceType.id].friendlyName;
      deviceType.category = shared.config[deviceType.id].category;
    }
  }));
}

module.exports = function getDeviceTypes() {
  // eslint-disable-next-line no-undef
  return gladys.deviceType.getByRoom()
    .then(deviceTypes => addCategoriesLight(deviceTypes))
    .then(deviceTypes => addCategoriesOutlet(deviceTypes))
    .then(deviceTypes => addCategoriesSwitchAndBinarySensor(deviceTypes))
    .then(deviceTypes => removeCategoryNullandUnknown(deviceTypes))
    .then(deviceTypes => removeEmptyRoom(deviceTypes))
    .then(deviceTypes => changeOwnProperty(deviceTypes));
};
