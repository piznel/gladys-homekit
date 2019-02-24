/* eslint-disable no-undef */
module.exports = function uninstall() {
  return gladys.param.delete({ name: 'Homekit_devices' });
};
