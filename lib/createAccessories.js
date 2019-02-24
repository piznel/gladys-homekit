
const Promise = require('bluebird');
// const { deviceTypesByRoom } = require('./shared.js');
const homekitAccessory = require('../accessories/');
// const shared = require('./shared');

/**
 * @private
 * @description Group all devicetype by id device.
 * @param {Object} roomDeviceTypes - List of all devicetypes by room.
 * @returns {Promise} Resolving with a JSON with id device property. With all devicetypes as sub-property.
 * @example
 * groupByDevice(roomDeviceTypes)
 * .then((deviceTypeByDevice) => {
 *    //........
 * })
 */
function groupByDevice(roomDeviceTypes) {
  return Promise.reduce(roomDeviceTypes, (result, room) => result.concat(room.deviceTypes), [])
    .then(deviceTypesWithoutRoom => Promise.reduce(deviceTypesWithoutRoom, (deviceTypeByDevice, deviceType) => {
      const val = roomDeviceTypes.device;
      deviceTypeByDevice[val] = deviceTypeByDevice[val] || [];
      deviceTypeByDevice[val].push(deviceType);
      return deviceTypeByDevice;
    }, {}));
}


/**
 * @private
 * @description Find all Homekit's services and caracteristics from deviceType categories of a device.
 * @param {Object} deviceTypes - List of devicetypes of a device.
 * @returns {Promise} Resolving with all Homekit's services and caracteristics of the device.
 * @example
 * getHomekitServices(deviceTypes)
 * .then((deviceTypes) => {
 *    //........
 * })
 */
function getHomekitServices(deviceTypes) {
  const homekitServices = [];
  Object.keys(deviceTypes).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(deviceTypes, key)) {
      const { category } = deviceTypes[key];
      const deviceType = deviceTypes[key];
      switch (category) {
      case 'light':
        homekitServices.Lightbulb = homekitServices.Lightbulb || [];
        homekitServices.Lightbulb.push({ On: deviceType });
        break;
      case 'brightness':
        homekitServices.Lightbulb = homekitServices.Lightbulb || [];
        homekitServices.Lightbulb.push({ Brightness: deviceType });
        break;
      case 'saturation':
        homekitServices.Lightbulb = homekitServices.Lightbulb || [];
        homekitServices.Lightbulb.push({ Saturation: deviceType });
        break;
      case 'hue':
        homekitServices.Lightbulb = homekitServices.Lightbulb || [];
        homekitServices.Lightbulb.push({ Hue: deviceType });
        break;
      case 'temperature-sensor':
        homekitServices.TemperatureSensor = homekitServices.TemperatureSensor || [];
        homekitServices.TemperatureSensor.push({ CurrentTemperature: deviceType });
        break;
      case 'humidity-sensor':
        homekitServices.HumiditySensor = homekitServices.HumiditySensor || [];
        homekitServices.HumiditySensor.push({ CurrentRelativeHumidity: deviceType });
        break;
      case 'switch':
        homekitServices.Switch = homekitServices.Switch || [];
        homekitServices.Switch.push({ On: deviceType });
        break;
      case 'outlet':
        homekitServices.Outlet = homekitServices.Outlet || [];
        homekitServices.Outlet.push({ On: deviceType });
        break;
      case 'outletInUse':
        homekitServices.Outlet = homekitServices.Outlet || [];
        homekitServices.Outlet.push({ OutletInUse: deviceType });
        break;
      case 'light-sensor':
        homekitServices.LightSensor = homekitServices.LightSensor || [];
        homekitServices.LightSensor.push({ CurrentAmbientLightLevel: deviceType });
        break;
      case 'motion-Sensor':
        homekitServices.MotionSensor = homekitServices.MotionSensor || [];
        homekitServices.MotionSensor.push({ MotionDetected: deviceType });
        break;
      case 'smoke-Sensor':
        homekitServices.SmokeSensor = homekitServices.SmokeSensor || [];
        homekitServices.SmokeSensor.push({ SmokeDetected: deviceType });
        break;
      case 'leak-Sensor':
        homekitServices.LeakSensor = homekitServices.LeakSensor || [];
        homekitServices.LeakSensor.push({ LeakDetected: deviceType });
        break;
      case 'binary-Sensor':
      case 'door-opening-sensor':
      case 'window-opening-sensor':
        homekitServices.ContactSensor = homekitServices.ContactSensor || [];
        homekitServices.ContactSensor.push({ ContactSensorState: deviceType });
        break;
      default:
        break;
      }
    }
  });
  return Promise.resolve(homekitServices);
}

/**
 * @private
 * @description Create all Homekit's caracteristics of a device.
 * @param {Array} homekitServices - List of device's service.
 * @returns {Promise} Resolving with all Homekit's caracteristics of the device.
 * @example
 * createAccessory(homekitServices) {
 * .then((Accessories) => {
 *    //........
 * })
 */
function createAccessory(homekitServices) {
  const accessories = [];
  let homekit = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [service, caracteristics] of Object.entries(homekitServices)) {
    homekit = {};
    switch (service) {
    case 'Lightbulb':
      // accessory = new homekitAccessory.Light(caracteristics);
      break;
    case 'TemperatureSensor':
      homekit = new homekitAccessory.TemperatureSensor(caracteristics[0]);
      break;
    case 'HumiditySensor':
      // accessory = new homekitAccessory.Light(caracteristics);
      break;
    case 'Switch':
      // accessory = new homekitAccessory.Light(caracteristics);
      break;
    case 'outlet':
      // accessory = new homekitAccessory.Light(caracteristics);
      break;
    case 'LightSensor':
      // accessory = new homekitAccessory.Light(caracteristics);
      break;
    case 'MotionSensor':
      // accessory = new homekitAccessory.Light(caracteristics);
      break;
    case 'SmokeSensor':
      // accessory = new homekitAccessory.Light(caracteristics);
      break;
    case 'LeakSensor':
      // accessory = new homekitAccessory.Light(caracteristics);
      break;
    case 'ContactSensor':
      // accessory = new homekitAccessory.Light(caracteristics);
      break;
    default:
      break;
    }
    if (homekit) {
      // shared.accessories.set(homekit.id, homekit.accessory);
      accessories.push(homekit.accessory);
    }
  }
  return Promise.resolve(accessories);
}

module.exports = function createAccessories(deviceTypesByRoom) {
  const accessories = [];
  // Group all devicetype by id device.
  return groupByDevice(deviceTypesByRoom)
    .then(deviceTypeByDevice => Promise.forEach(deviceTypeByDevice, (key) => {
      const deviceTypes = deviceTypeByDevice[key];
      return getHomekitServices(deviceTypes)
        .then(homekitServices => createAccessory(homekitServices))
        .then((deviceAccessories) => {
          accessories.concat(deviceAccessories);
        });
    }))
    .then(() => Promise.resolve(accessories));
};
