import {providers} from 'ng-forward/cjs/testing/providers';

import {Input, Component, provide} from 'ng-forward';

import * as helpers from "../../../spec/helpers";

import {ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {ContentViewerComponent} from './content-viewer.component';

// this htmlTemplate will be re-used between the container components in this spec file
const htmlTemplate: string = '<content-viewer [article]="ctrl.article" [profile]="ctrl.profile"></content-viewer>';

describe('Content Viewer Component', () => {

    let stateParamsService: any;
    let stateMock = jasmine.createSpyObj("$state", ["go"]);
    let mocks = helpers.getMocks();

    // loading the templates
    beforeEach(() => {
        angular.mock.module("templates");

        stateParamsService = { page: 1 };

        providers((provide: any) => {
            return <any>[
                provide('articleService', {
                    useValue: mocks.articleService
                }),
                provide('profileService', {
                    useValue: mocks.profileService
                }),
                provide('$stateParams', {
                    useValue: stateParamsService
                }),
                provide('$state', {
                    useValue: stateMock
                })
            ];
        });
    });

    let buildComponent = (): Promise<ComponentFixture> => {
        return helpers.quickCreateComponent({
            providers: [
                helpers.provideEmptyObjects('Restangular')
            ],
            directives: [ContentViewerComponent],
            template: htmlTemplate
        });
    };

    it('renders content viewer directive', (done: Function) => {
        buildComponent().then((fixture: ComponentFixture) => {
            expect(fixture.debugElement.query('content-viewer').length).toEqual(1);

            done();
        });
    });

    it('check if article was loaded', (done: Function) => {
        let article: any = {
            id: 1,
            title: 'The article test'
        };
        let profile: any = {
            id: 1,
            identifier: 'the-profile-test',
            type: 'Person'
        };

        mocks['profileService'].getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(Promise.resolve(profile));
        mocks['articleService'].getArticleByProfileAndPath = jasmine.createSpy("getArticleByProfileAndPath").and.returnValue(Promise.resolve({ data: article }));

        // helpers.mocks.profileService.getCurrentProfile = () => {
        //     return helpers.mocks.promiseResultTemplate(profile);
        // };
        //
        // helpers.mocks.articleService.getArticleByProfileAndPath = (profile: noosfero.Profile, path: string) => {
        //     return helpers.mocks.promiseResultTemplate({
        //         data: article
        //     });
        // };


        buildComponent().then((fixture: ComponentFixture) => {
            let contentViewerComp: ContentViewerComponent = fixture.debugElement.componentViewChildren[0].componentInstance;

            //FIXME refactor this test after migrate it to angular 2
            // expect(contentViewerComp.profile).toEqual(profile);
            // expect(contentViewerComp.article).toEqual(article);

            done();
        });
    });
});
