import { Config } from './entities';

export default class RoutesConfig extends Config {
    configure() {
        // For any unmatched url, redirect to /state1
        this.$urlRouterProvider.otherwise("/hug");
        //
        // Now set up the states
        this.$stateProvider
            .state('hug', {
                url: "/hug",
                templateUrl: "client/templates/hug.html"
            })
            .state('facebook', {
                url: "/facebook",
                templateUrl: "client/templates/facebook.html",
                controller: 'FacebookController as facebook'
            });
    }
}

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
