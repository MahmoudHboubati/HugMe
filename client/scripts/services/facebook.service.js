import {
    Service
} from '../entities';

export default class FacebookService extends Service {
    constructor() {
        super(...arguments);
        this.init();
        this.status = '';
    }

    init() {
        if (Meteor.isClient) {
            window.fbAsyncInit = function() {
                FB.init({
                    appId: '1701215236807557',
                    status: true,
                    xfbml: true,
                    version: 'v2.6'
                });
            };
        }
    }

    login() {
        if (Meteor.isClient) {
            FB.login(function(response) {
                this.statusChangeCallback(response);
            });
        }
    }

    statusChangeCallback(response) {
        this.status = response.status;
    }

    getMyLastName() {
        var deferred = this.$q.defer();
        if (Meteor.isClient) {
            FB.api('/me', {
                fields: 'last_name'
            }, function(response) {
                if (!response || response.error) {
                    deferred.reject(response.error.message);
                } else {
                    deferred.resolve(response);
                }
            });
        } else {
            deferred.reject('FB runs in server side');
        }
        return deferred.promise;
    }
}

FacebookService.$inject = ['$q', '$log'];
