/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
(function () {
  angular
    .module('gladys')
    .factory('homekitService', homekitService);

  homekitService.$inject = ['$http', 'Notification', '$translate'];

  function homekitService($http, Notification, $translate) {
    const service = {
      saveConfig,
      getDeviceTypes,
      translation,
      successNotificationTranslated,
      errorNotificationTranslated,
    };

    return service;

    function saveConfig(options) {
      return $http({ method: 'PATCH', url: '/homekit/save/', data: options });
    }

    function getDeviceTypes() {
      return $http({ method: 'GET', url: '/homekit/device/' });
    }

    function translation(key) {
      return $translate(key);
    }

    function successNotificationTranslated(key, complement) {
      return $translate(key)
        .then((text) => {
          let response = text;
          if (complement) {
            response += complement;
          }
          Notification.success(response);
        });
    }

    function errorNotificationTranslated(key, complement) {
      return $translate(key)
        .then((text) => {
          let response = text;
          if (complement) {
            response += complement;
          }
          Notification.error(response);
        });
    }
  }
}());
