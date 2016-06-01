import { Inject, Input, Component, Output, EventEmitter, provide } from 'ng-forward';
import {RegisterService} from "./../../lib/ng-noosfero-api/http/register.service";

@Component({
    selector: 'noosfero-register',
    templateUrl: 'app/account/register-component.html',
    providers: [
        provide('registerService', { useClass: RegisterService })
    ]
})

@Inject("$state", RegisterService)
export class RegisterComponent {
    @Input() account: any;

    constructor(private $state: ng.ui.IStateService, public registerService: RegisterService) {
        this.account = {};
    }

    signup() {
        if (this.account.password === this.account.password_confirmation) {
            this.registerService.createAccount(this.account).then((response) => {
                if (response.status === 201) {
                    this.$state.transitionTo('main.environment');
                } else {
                    throw new Error('Invalid attributes');
                }
            });
        } else {
            alert("Wrong password confirmation.");
        }
    }

}
