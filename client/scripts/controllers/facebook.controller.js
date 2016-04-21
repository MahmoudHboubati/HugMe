import {
    Controller
} from '../entities';
import '../services/facebook.service';

export default class FacebookController extends Controller {
    constructor() {
        super(...arguments);
        this.title = 'facebook hugger';
        this.friends = [];
        this.friends.posts = [];
    }

    getMyLastName() {
        var self = this;

        self.FacebookService.getMeInformation().then(
            function(response) {
                self.last_name = response.last_name;
                self.first_name = response.first_name;
            },
            function(reason, error) {
                self.$log.error(error);
            });
    }

    getFriends() {
        var self = this;

        self.FacebookService.getFriends().then(
            function(friends) {
                // self.posts = friends;
                _.forEach(friends, function(friend) {
                    self.friends.push(friend);
                });
            },
            function(reason, error) {
                self.$log.error(error);
            });
    }

    getFeeds() {
        var self = this;
        _.forEach(this.friends, function(friend) {
            friend.posts.push(self.getFeed(friend.id));
        });
    }

    getFeed(userId) {
        var self = this;
        var feed = undefined;

        self.FacebookService.getFeed(userId).then(
            function(response) {
                feed = response;
            },
            function(reason, error) {
                self.$log.error(error);
            });

        return feed;
    }

    login() {
        var self = this;

        self.FacebookService.login().then(
            function(response) {
                self.posts = response;
            },
            function(reason, error) {
                self.$log.error(error);
            });
    }
}

FacebookController.$inject = ['FacebookService', '$log'];
