/* eslint-disable no-undef */
const Promise = require('bluebird');
const shared = require('./shared.js');

/**
 * @private
 * @description Get id of slug module.
 * @param {*} options - Param we want to save.
 * @param {*} id - Id of the module concerned.
 * @returns {Promise} Resolving with id module.
 * @example
 * setParam(options, id)
 * .then(id => {
 * //......
 * })
 */
function setParam(options, id) {
  const param = {
    name: 'Homekit_devices',
    value: JSON.stringify(options),
    type: 'hidden',
    module: id,
    description: 'Binary\'s device for Homekit. It is used to control it',
  };

  return gladys.param.setValue(param)
    .then(() => Promise.resolve('SAVE_SUCCESS'))
    .catch((e) => {
      sails.log.error(new Error(`Homekit module: Binary device's list not saved. Error ${e}`));
      return Promise.resolve('SAVE_ERROR');
    });
}

/**
 * @private
 * @description Get id of slug module
 * @param {string} slug - Slug of the module we want the id of.
 * @returns {Promise} Resolving with id module.
 * @example
 * getIdModule(slug)
 * .then(id => {
 * //......
 * })
 */
function getIdModule(slug) {
  return gladys.module.get()
    .then((modules) => {
      Promise.filter(modules, module => module.slug === slug);
      then((selectedModule) => {
        Promise.resolve(module.id);
      });
      Promise.reject(new Error('id not found !'));
    });
}

module.exports = function saveConfig(options) {
  shared.config = options;
  return getIdModule('homekit')
    .then(id => setParam(options, id))
    .then(answer => Promise.resolve(answer));
};
