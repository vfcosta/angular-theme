import {bundle, Component, StateConfig} from 'ng-forward';

@Component({
    selector: 'main-content',
    templateUrl: "app/main/main.html",
})
export class MainContent {

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
    }
])
export class Main {

}
