import { Inject, Input, Component, Output, EventEmitter,  } from 'ng-forward';

@Component({
    selector: 'noosfero-register',
    templateUrl: 'app/account/register-component.html',
})

@Inject("$http")
export class RegisterComponent {
    constructor(private $http: ng.IHttpService) { }

    signup (account: any) {
        if (account.password === account.passwordConfirmation) {
            this.$http.post("http://localhost:3000/api/v1/register", "login="+account.login+"&email="+account.email+"&password="+account.password).then((response) => {
                console.log("User " + account.login + " created, please activate your account.");
            });
        } else {
            alert("Wrong password confirmation.");
        }
    }

}
