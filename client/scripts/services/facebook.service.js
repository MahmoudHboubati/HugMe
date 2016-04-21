import {
    Service
} from '../entities';

export default class FacebookService extends Service {
    constructor() {
        super(...arguments);
        this.status = '';
    }

    init() {
        window.fbAsyncInit = function() {
            FB.init({
                appId: '1701215236807557',
                status: true,
                xfbml: true,
                version: 'v2.6'
            });
        };
    }

    getMeInformation() {
        var deferred = this.$q.defer();

        FB.api('/me', {
            fields: ['first_name', 'last_name']
        }, function(response) {
            if (!response || response.error) {
                deferred.reject(response.error.message);
            } else {
                deferred.resolve(response);
            }
        });

        return deferred.promise;
    }

    getFriends() {
        var deferred = this.$q.defer();

        /* make the API call */
        FB.api(
            "/me/friends",
            function(response) {
                if (!response && response.error) {
                    deferred.reject(response.error.message);
                } else {
                    deferred.resolve(response);
                }
            }
        );

        return deferred.promise;
    }

    getFeed(userId) {
        var deferred = this.$q.defer();

        /* make the API call */
        FB.api(
            "/" + userId + "/feed",
            function(response) {
                if (!response && response.error) {
                    deferred.reject(response.error.message);
                } else {
                    deferred.resolve(response);
                }
            }
        );

        return deferred.promise;
    }

    login() {
        var deferred = this.$q.defer();

        FB.login(function(response) {
            if (!response && response.error) {
                deferred.reject(response.error.message);
            } else {
                deferred.resolve(response);
            }
        }, {
            scope: 'user_friends, public_profile'
        });

        return deferred.promise;
    }
}

FacebookService.$inject = ['$q', '$log'];
