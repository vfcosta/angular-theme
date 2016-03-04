import {createComponentFromClass, quickCreateComponent} from "./../../../spec/helpers";
import {Navbar} from "./";
import {AUTH_EVENTS} from "./../auth";
import {User} from "./../../models/interfaces";
import {Injectable, Provider, provide} from "ng-forward";



describe("Navbar Component", () => {

    let $rootScope: ng.IRootScopeService;
    let user = <User>{
        id: 1,
        login: "user"
    };
    
    beforeEach(angular.mock.module("templates"));
    
    // beforeEach(inject((_$rootScope_: ng.IRootScopeService) => {
    //     $rootScope = _$rootScope_;
    // }));

    it('should get the loggedIn user', (done: Function) => {
      
        
        let scope = jasmine.createSpyObj("scope", ["$on"]);
        
        let providers = [
            
            
            new Provider('moment', { useValue: {} }),
            new Provider('$modal', { useValue: {} }),
            new Provider('AuthService', { useValue: {} }),
            new Provider('Session', { useValue: {
                getCurrentUser: () => { return user}
            } }),
            new Provider('$scope', { useValue: scope }),
            new Provider('$state', { useValue: {} }),
            new Provider('AUTH_EVENTS', { useValue: {AUTH_EVENTS} })
        ];
        
        
        
        quickCreateComponent({
            providers: providers,
            template: "<acme-navbar></acme-navbar>",
            directives: [Navbar]
        }).then(fixture => {
            let navbarInstance: Navbar = fixture.debugElement.componentViewChildren[0].componentInstance;
            expect(navbarInstance).toBeDefined();
            expect(navbarInstance["currentUser"]).toEqual(user)
            done();
        })
    });

});