const saveConfig = require('../lib/saveConfig.js');
const shared = require('../lib/shared.js');

module.exports = {

  saveConfig(req, res, next) {
    saveConfig(req.body)
      .then(result => res.json(result))
      .catch(next);
  },

  getDeviceTypes(req, res, next) {
    return res.json(shared.deviceTypesByRoom);
  },
};
