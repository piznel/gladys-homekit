const hap = require('hap-nodejs');

const { Accessory } = hap;
const { Service } = hap;
const { Characteristic } = hap;
const { uuid } = hap;


module.exports = class TemperatureSensor {
  constructor(caracteristics) {
    this.init(caracteristics);
    this.id = null;
    this.currentTemperature = null;
    this.accessoryUUID = null;
    this.accessory = {};
    this.waitForNewValue();
  }

  init(caracteristics) {
    if (caracteristics.length === 1 && Object.prototype.hasOwnProperty.call(caracteristics, 'CurrentTemperature')) {
      const deviceType = caracteristics.CurrentTemperature;
      this.id = deviceType.id;
      this.currentTemperature = deviceType.lastValue;
      this.accessoryUUID = uuid.generate(`gladys:accessories:temperature-sensor:${this.id}`);
      this.accessory = new Accessory('Temperature Sensor', this.accessoryUUID);
      // set some basic property
      this.accessory.getService(Service.AccessoryInformation)
        .setCharacteristic(Characteristic.Manufacturer, this.deviceType.service)
        .setCharacteristic(Characteristic.Model, this.deviceType.name)
        .setCharacteristic(Characteristic.SerialNumber, this.deviceType.deviceTypeIdentifier);

      // send the current temperature to Homekit
      this.accessory.addService(Service.TemperatureSensor, this.deviceType.friendlyName)
        .getCharacteristic(Characteristic.CurrentTemperature)
        .on('get', (callback) => {
          callback(null, this.currentTemperature);
        });
    }
  }

  // gladys.emit('devicetype-exec', data);
  waitForNewValue() {
    // eslint-disable-next-line no-undef
    gladys.on('newDeviceState', (deviceState) => {
      if (this.id && deviceState.devicetype === this.id) {
        this.setTemperature(deviceState.value);
      }
    });
  }


  // update the temperature
  setTemperature(newTemperature) {
    this.currentTemperature = this.controleTemperature(newTemperature);
  }

  // Temperature unity must be °C, with max precision 0.1
  controleTemperature(temperature) {
    let tempTemperature = null;
    if (this.deviceType.unit.match(/c/i)) {
      tempTemperature = temperature;
    } else {
      tempTemperature = (temperature - 32) / 1.8;
    }
    tempTemperature = Math.round(tempTemperature * 10) / 10;
    return tempTemperature;
  }
};
