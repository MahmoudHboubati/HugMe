import {
    Controller
} from '../entities';
import '../services/facebook.service';

export default class FacebookController extends Controller {
    constructor() {
        super(...arguments);
        this.title = 'facebook hugger';
    }
    getMyLastName() {
        var self = this;

        self.FacebookService.getMyLastName().then(
            function(response) {
                self.last_name = response.last_name;
            },
            function(reason, error) {
                self.$log.error(error);
            });
    }

    login() {
        this.FacebookService.login();
    }

    checkState() {
        this.FacebookService.checkLoginState();
    }
}

FacebookController.$inject = ['FacebookService', '$log'];
