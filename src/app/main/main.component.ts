import {Component, StateConfig} from 'ng-forward';
import {Profile} from '../profile/profile.component';

@Component({
    selector: 'main-content',
    templateUrl: "app/main/main.html",
})
export class MainContent {
    constructor() {
        console.log("MAIN");
    }

}

@Component({
    selector: 'main',
    template: '<div ng-view></div>'
})
@StateConfig([
    {
        url: '/',
        component: MainContent,
        name: 'main',
        resolve: {
            currentUser: function(AuthService) {
                return AuthService.loginFromCookie();
            }
        }
    },
    {
        url: "^/:profile",
        // abstract: true,
        component: Profile,
        name: 'main.profile',
        views: {
            "content": {
                templateUrl: "app/profile/profile.html",
            }
        }
    }
])
export class Main {

}
