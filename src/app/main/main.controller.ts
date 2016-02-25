import {Component, StateConfig} from 'ng-forward';

@Component({
    selector: 'main',
    template: `aaaa <div ui-view></div>`
})
@StateConfig([
    {
        url: '/',
        component: Main2,
        // templateUrl: "app/main/main.html",
        name: 'main2',
        // resolve: {
        // currentUser: function(AuthService) {
        // return AuthService.loginFromCookie();
        // }
        // }
    }
])
export class Main {

}

@Component({
    selector: 'Main2',
    template: `test main2`
})
export class Main2 {

}
