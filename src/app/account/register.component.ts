import { Inject, Input, Component, Output, EventEmitter } from 'ng-forward';
import { RegisterService } from './register.service';

@Component({
    selector: 'noosfero-register',
    templateUrl: 'app/account/register-component.html'
})

@Inject(RegisterService)
export class RegisterComponent {
    constructor(private registerService: RegisterService) { }

    signup (account: any) {
        if (account.password === account.passwordConfirmation) {
            this.registerService.createAccount(account);
        } else {
            alert("Wrong password confirmation.");
        }
    }

}
