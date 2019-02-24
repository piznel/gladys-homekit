/* eslint-disable require-jsdoc */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable no-undef */


(function () {
  angular
    .module('gladys')
    .controller('homekitCtrl', homekitCtrl);

  homekitCtrl.$inject = ['homekitService', '$translate', '$scope'];

  function homekitCtrl(homekitService, $translate, $scope) {
    /* jshint validthis: true */
    const vm = this;


    /**
    * @private
    * @description save Homekit devices as Parameter.
    * @returns {Promise} Resolve with notification.
    * @example
    * saveConfig()
    */
    function saveConfig() {
      const homekitDevice = {};

      vm.homekitDevices.forEach((room) => {
        room.deviceTypes.forEach((deviceType) => {
          if (deviceType.friendlyName && deviceType.friendlyName.trim().length > 0) {
            homekitDevice[deviceType.id] = {
              homekit: deviceType.homekit,
              friendlyName: deviceType.friendlyName.trim(),
              categorie: deviceType.categorie,
            };
          }
        });
      });
      return homekitService.saveConfig(homekitDevice)
        .then((answer) => {
          if (answer.status === 200) {
            if (answer.data === 'SAVE_SUCCESS') {
              homekitService.successNotificationTranslated('CONFIG_SAVE');
            } else {
              homekitService.errorNotificationTranslated('CONFIG_UNSAVE');
            }
          } else {
            homekitService.errorNotificationTranslated('CONFIG_UNSAVE');
          }
        });
    }

    // eslint-disable-next-line consistent-return
    function categories(category) {
      if (Object.prototype.hasOwnProperty.call(categoryList, category)) {
        return categoryList[category];
      }
    }

    function activate() {
      vm.remoteIsBusy = true;

      const child = document.getElementsByClassName('nav nav-tabs');
      child[0].parentNode.removeChild(child[0]);

      return homekitService.getDeviceTypes()
        .then((data) => {
          if (data.status === 200) {
            vm.homekitDevices = data.data;
            vm.ready = true;
            vm.remoteIsBusy = false;
          } else {
            homekitService.errorNotificationTranslated('ERROR');
          }
        })
        .catch((err) => {
          sails.log.error(err);
        });
    }

    vm.rooms = [];
    vm.remoteIsBusy = false;
    vm.ready = false;
    vm.devicetypes = [];
    vm.homekitDevices = [];
    vm.saveConfig = saveConfig;
    vm.categories = categories;

    categoryList = {
      light: [
        { id: 'light', label: $translate('ON_OFF') },
        { id: 'hue', label: $translate('COLOR') },
        { id: 'brightness', label: $translate('BRIGHTNESS') },
        { id: 'saturation', label: $translate('SATURATION') },
      ],
      outlet: [
        { id: 'outlet', label: $translate('OUTLET') },
        { id: 'outletInUse', label: $translate('INUSE') },
      ],
      'binary-Sensor': [
        { id: 'binary-Sensor', label: $translate('BINARY_SENSOR') },
        { id: 'motion-Sensor', label: $translate('MOTION_SENSOR') },
        { id: 'smoke-Sensor', label: $translate('SMOKE_SENSOR') },
        { id: 'leak-Sensor', label: $translate('LEAK_SENSOR') },
      ],
      switch: [{ id: 'switch', label: $translate('SWITCH') }],
      'temperature-sensor': [{ id: 'temperature-sensor', label: $translate('TEMPERATURE_SENSOR') }],
      'humidity-sensor': [{ id: 'humidity-sensor', label: $translate('HUMIDITY_SENSOR') }],
      'light-sensor': [{ id: 'light-sensor', label: $translate('LIGHT_SENSOR') }],
      'door-opening-sensor': [{ id: 'door-opening-sensor', label: $translate('DOOR_OPEN_SENSOR') }],
      'window-opening-sensor': [{ id: 'window-opening-sensor', label: $translate('WINDOW_OPEN_SENSOR') }],
    };

    activate();
  }
}());
