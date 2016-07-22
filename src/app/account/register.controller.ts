import { Input } from "ng-forward";
import { IModalComponent } from "../shared/components/interfaces";

export class RegisterController {

    static $inject = ["$log", "$stateParams", "$scope"];
    ctrl: IModalComponent;

    constructor(
        private $log: ng.ILogService,
        private $stateParams: any
    ) { }

    closeTerms() {
        this.ctrl.modalInstance.dismiss('ok');
    }
}
