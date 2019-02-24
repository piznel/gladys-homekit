/* eslint-disable no-undef */
/* eslint-disable func-names */
const translationsEN = {
  SAVE_SETTINGS: 'Save',
  HELP_HOMEKIT: 'Help',
  HOMEKIT_TEXT_0: 'The "Homekit" management of your devices is done by the category you choose in the "See more" page of each device.',
  HOMEKIT_TEXT_1: 'Only certain categories of Gladys allow a link with "Homekit": "Light", "Temperature Sensor", "Humidity Sensor", "Light Sensor", "Door Open Sensor", "Window Open Sensor" and "Socket".',
  HOMEKIT_TEXT_2: '1. Select the devices you want to drive from Homekit.',
  HOMEKIT_TEXT_3: '2. Give them a name, if you wish, that will be used as an identifier by Homekit.',
  HOMEKIT_TEXT_4: '3. Check each category, if necessary modify them by choosing another one from the proposed list.',
  HOMEKIT_TEXT_5: '4. Save and restart Gladys.',
  HOMEKIT_TEXT_6: '5. From the "House" application on your iPhone/iPad, search for new devices.',
  DEVICE: 'Device',
  DEVICETYPE: 'Devicetype',
  HOMEKIT_ACTIF: 'Actif',
  HOMEKIT_NAME: 'Homekit Name',
  HOMEKIT_CATEGORY: 'Homekit Category',
  CONFIG_SAVE: 'Successful registration!',
  CONFIG_UNSAVE: 'Error when saving your settings.',
  // Categories
  LIGHT: 'Light',
  COLOR: 'Color (Hue)',
  BRIGHTNESS: 'Brightness',
  SATURATION: 'Saturation',
  MOTION_SENSOR: 'Motion sensor',
  SMOKE_SENSOR: 'Smoke sensor',
  LEAK_SENSOR: 'Leak sensor',
  ON_OFF: 'On/off',
  OPEN_CLOSE: 'Open/close',
  TEMPERATURE_SENSOR: 'Temperature sensor',
  HUMIDITY_SENSOR: 'Humidity sensor',
  LIGHT_SENSOR: 'Light sensor',
  DOOR_OPEN_SENSOR: 'Door open sensor',
  WINDOW_OPEN_SENSOR: 'Window open sensor',
  PLUG: 'Plug',
  INUSE: 'Inuse',
  BINARY_SENSOR: 'Binary sensor (generic)',
  SWITCH: 'Switch',
};

const translationsFR = {
  SAVE_SETTINGS: 'Enregistrer',
  HELP_HOMEKIT: 'Aide',
  HOMEKIT_TEXT_0: 'La gestion par "Homekit" de vos appareils se fait par la catégorie que vous choisissez dans la page "Voir plus" de chaque périphérique.',
  HOMEKIT_TEXT_1: 'Seules certaines catégories de Gladys permettent un lien avec "Homekit" : "Lumière", "Capteur de température", "Capteur d\'humidité", "Capteur de luminosité", "Capteur d\'ouverture de porte", "Capteur d\'ouverture de fenêtre" et "Prise".',
  HOMEKIT_TEXT_2: '1. Sélectionnez les périphériques que vous voulez piloter depuis Homekit.',
  HOMEKIT_TEXT_3: '2. Donnez-leur un nom, si vous le souhaitez, qui sera utilisé comme identifiant par Homekit.',
  HOMEKIT_TEXT_4: '3. Vérifiez chaque catégorie, au besoin modifiez-les en en choisissant une autre dans la liste proposée.',
  HOMEKIT_TEXT_5: '4. Enregistrez et redémarrez Gladys.',
  HOMEKIT_TEXT_6: "5. Depuis l'application \"Maison\" de votre iPhone/iPad, recherchez de nouveaux appareils.",
  DEVICE: 'Périphérique',
  DEVICETYPE: 'Fonction',
  HOMEKIT_ACTIF: 'Actif',
  HOMEKIT_NAME: 'Nom Homekit',
  HOMEKIT_CATEGORY: 'Categorie Homekit',
  CONFIG_SAVE: 'Enregistrement réussi !',
  CONFIG_UNSAVE: 'Erreur lors de l\'enregistrement de vos paramètres.',
  // Categories
  LIGHT: 'Lumière',
  COLOR: 'Couleur (Hue)',
  BRIGHTNESS: 'Luminosité',
  SATURATION: 'Saturation',
  MOTION_SENSOR: 'Alarme de mouvement',
  SMOKE_SENSOR: 'Alarme de fumée',
  LEAK_SENSOR: 'Alarme de fuite',
  ON_OFF: 'Allumé/Eteint',
  OPEN_CLOSE: 'Ouvert/fermé',
  TEMPERATURE_SENSOR: 'Capteur de température',
  HUMIDITY_SENSOR: 'Capteur d\'humidité',
  LIGHT_SENSOR: 'Capteur de luminosité',
  DOOR_OPEN_SENSOR: 'Capteur d\'ouverture de porte',
  WINDOW_OPEN_SENSOR: 'Capteur d\'ouverture de fenêtre',
  OUTLET: 'Prise électrique',
  INUSE: 'EN cours d\'utilisation',
  BINARY_SENSOR: 'Alarme binaire (générique)',
  SWITCH: 'Interrupteur simple',
};

angular
  .module('gladys')
  .config(['$translateProvider', function ($translateProvider) {
    // add translation table
    $translateProvider
      .translations('en', translationsEN)
      .translations('fr', translationsFR);
  }]);
