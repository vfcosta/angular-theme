import { MainContentComponent } from "./main";
import { DomainComponent } from "./domain/domain.component";
import { AuthService } from "./login/auth.service";
import { EnvironmentService } from "./../lib/ng-noosfero-api/http/environment.service";
import { DomainService } from "./../lib/ng-noosfero-api/http/domain.service";
import { EnvironmentComponent } from "./environment/environment.component";
import { EnvironmentHomeComponent } from "./environment/environment-home.component";

/** @ngInject */
export function noosferoRoutes($stateProvider: any) {
    $stateProvider.state({
        controller: MainContentComponent,
        url: '',
        templateUrl: "app/main/main.html",
        abstract: true,
        name: 'main',
        resolve: {
            currentUser: function(AuthService: AuthService) {
                return AuthService.loginFromCookie();
            },
            currentEnvironment: function(EnvironmentService: EnvironmentService) {
                return EnvironmentService.get();
            }
        }
    });

    $stateProvider.state({
        controller: DomainComponent,
        url: '/',
        name: 'main.domain',
        views: {
            "content": {
                template: "<div></div>",
                controller: DomainComponent,
                controllerAs: "ctrl"
            }
        },
        resolve: {
            contextResult: (DomainService: DomainService) => {
                return DomainService.get("context");
            }
        }
    });    


    $stateProvider.state({
        controller: EnvironmentComponent,
        url: '/',
        name: 'main.environment',
        views: {
            "content": {
                templateUrl: "app/environment/environment.html",
                controller: EnvironmentComponent,
                controllerAs: "ctrl"
            }
        },
        params: { environment: {} }
    });    

    $stateProvider.state({
        controller: EnvironmentHomeComponent,
        url: '',
        name: 'main.environment.home',
        views: {
            "mainBlockContent": {
                templateUrl: "app/environment/environment-home.html",
                controller: EnvironmentHomeComponent,
                controllerAs: "vm"
            }
        },
        params: { environment: {} }
    });    

    console.log("Entrou nas rotas33");
 
}


