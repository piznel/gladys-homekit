/* eslint-disable no-undef */
const queries = require('./queries.js');

const slug = 'homekit';

/**
 * @private
 * @description Create "Homekit_devices" if it doesn't exist, or update id if it has changed
 * @param {number} id - Id of the module.
 * @returns {Promise} Resolving with param created.
 * @example
 * createParam(12)
 */
function createParam(id) {
  const paramDevice = {
    name: 'Homekit_devices',
    value: {},
    type: 'hidden',
    module: id,
    description: 'Binary\'s device for Homekit. It is used to control it',
  };

  return gladys.param.getValue(paramDevice.name)
    .then(() => gladys.utils.sql(queries.updateIdParam, [paramDevice.module]))
    .catch(() => gladys.param.setValue(paramDevice));
}

/**
 * @private
 * @description Get id of slug module
 * @returns {Promise} Resolving with id module.
 * @example
 * getIdModule()
 * .then(id => {
 * //......
 * })
 */
function getIdModule() {
  return gladys.module.get()
    .then((modules) => {
      Promise.filter(modules, module => module.slug === slug);
      then((filteredModule) => {
        Promise.resolve(filteredModule.id);
      });
      Promise.reject(new Error('id not found !'));
    });
}

module.exports = function install() {
  return getIdModule()
    .then(id => createParam(id))
    .catch((err) => {
      sails.log.error('Homekit module : install failed with error ', err);
      return 'success';
    });
};
