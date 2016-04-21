import { Runner } from '../entities';

export default class FacebookRunner extends Runner {
    run() {
        if (Meteor.isClient) {
            this.FacebookService.init();
        }
    }
}

FacebookRunner.$inject = ['FacebookService'];
