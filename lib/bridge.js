const HAP = require('hap-nodejs');

const { Accessory } = HAP;
const { Bridge } = HAP;
// const { Service } = HAP;
// const { Characteristic } = HAP;
const { uuid } = HAP;


module.exports = function bridge(accessories) {
  // Initialize our storage system
  HAP.init('../cache');

  // Start by creating our Bridge which will host all loaded Accessories
  const gladysBridge = new Bridge('Node Bridge', uuid.generate('Gladys-Homekit-Bridge'));

  // Listen for bridge identification event
  gladysBridge.on('identify', (paired, callback) => {
    // eslint-disable-next-line no-undef
    sails.log('Homekit module : Bridge identify ', paired ? '(paired)' : '(unpaired)');
    callback(); // success
  });

  // Add all accessories to the bridge
  accessories.forEach((accessory) => {
    if (accessories.length !== 0) {
      gladysBridge.addBridgedAccessory(accessory);
    } else {
      // eslint-disable-next-line no-undef
      sails.log('No accessories found.');
    }
  });

  // Publish the Bridge on the local network.
  gladysBridge.publish({
    displayName: 'Gladys Bridge',
    username: 'CC:22:3D:E3:CE:F6',
    port: 51826,
    pincode: '031-45-154',
    category: Accessory.Categories.BRIDGE,
  });

  const signals = { SIGINT: 2, SIGTERM: 15 };
  Object.keys(signals).forEach((signal) => {
    process.on(signal, () => {
      gladysBridge.unpublish();
      setTimeout(() => {
        process.exit(128 + signals[signal]);
      }, 1000);
    });
  });
};
