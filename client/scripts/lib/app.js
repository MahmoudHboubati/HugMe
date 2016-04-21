// Libs
import angular from 'angular';
import 'angular-animate';
import 'angular-meteor';
import 'angular-aria';
// import 'angular-sanitize';
import 'angular-ui-router';

// Modules
import Definer from '../definer';
import RoutesConfig from '../routes';
import FacebookController from '../controllers/facebook.controller';

// Services
import FacebookService from '../services/facebook.service';

// Runners
import FacebookRunner from '../runners/facebook.runner';

// App
const App = angular.module('HugMe', [
  'angular-meteor',
  'ui.router'
]);

new Definer(App)
  .define(RoutesConfig)
  .define(FacebookController)
  .define(FacebookService)
  .define(FacebookRunner);

// Startup
if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}

function onReady() {
  angular.bootstrap(document, ['HugMe']);
}
