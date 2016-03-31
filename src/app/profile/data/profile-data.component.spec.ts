import * as helpers from "./../../../spec/helpers";

import {Injectable, Provider, provide} from "ng-forward";
import {providers} from 'ng-forward/cjs/testing/providers';

import {ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';

import {ProfileDataComponent} from "./profile-data.component";
import {TranslateProfile} from '../../shared/pipes/translate-profile.filter';

let templateHtml = '<profile-data [profile]="ctrl.profile"></profile-data>';

describe('Profile data component', () => {

    let profileMock = <noosfero.Profile>{
        id: 1,
        name: 'Profile Test',
        identifier: 'profile-test',
        type: 'Person'
    };

    beforeEach(() => {

        angular.mock.module("templates");
        angular.mock.module("angularMoment");

        providers((provide: any) => {
            return <any>helpers.provideFilters('TranslateProfile', 'translateFilter');
        });
    });

    let buildComponent = (): Promise<ComponentFixture> => {
        return helpers.quickCreateComponent({
            directives: [ProfileDataComponent],
            template: templateHtml,
            properties: {
                profile: profileMock
            }
        });
    };

    it('renders profile-data directive', () => {
        buildComponent().then((fixture: ComponentFixture) => {
            let profileData: ProfileDataComponent = fixture.debugElement.componentViewChildren[0].componentInstance;

            expect(fixture.debugElement.query('div.table-responsive').length).toEqual(1);
            expect(fixture.debugElement.query('span.label-info').length).toEqual(1);
        });
    });

    it('renders profile-data directive with custom fields', () => {
        profileMock.additional_data = {
            'Address': 'Street A, Number 102'
        };
        buildComponent().then((fixture: ComponentFixture) => {
            let profileData: ProfileDataComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
            profileData.profile = profileMock;

            expect(profileData.hasCustomFields()).toBeTruthy();
            expect(fixture.debugElement.query('div.profile-custom-fields').length).toEqual(1);
        });
    });
});
