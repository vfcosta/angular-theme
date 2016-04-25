import {providers} from 'ng-forward/cjs/testing/providers';

import {Input, Component, provide} from 'ng-forward';

import * as helpers from "../../../spec/helpers";

import {ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {ContentViewerActionsComponent} from './content-viewer-actions.component';

// this htmlTemplate will be re-used between the container components in this spec file
const htmlTemplate: string = '<content-viewer-actions [article]="ctrl.article" [profile]="ctrl.profile"></content-viewer-actions>';

describe('Content Viewer Actions Component', () => {

    beforeEach(() => {

        angular.mock.module("templates");

        providers((provide: any) => {
            return <any>[
                provide('ProfileService', {
                    useValue: helpers.mocks.profileService
                }),
                provide('ArticleService', {
                    useValue: helpers.mocks.articleService
                })
            ];
        });
    });

    let buildComponent = (): Promise<ComponentFixture> => {
        return helpers.quickCreateComponent({
            providers: [
                helpers.provideEmptyObjects('Restangular'),
                helpers.provideFilters('translateFilter')
            ],
            directives: [ContentViewerActionsComponent],
            template: htmlTemplate
        });
    };

    it('renders content viewer actions directive', (done: Function) => {
        buildComponent().then((fixture: ComponentFixture) => {
            expect(fixture.debugElement.query('content-viewer-actions').length).toEqual(1);

            done();
        });
    });

    it('return article parent as container when it is not a folder', (done: Function) => {
        buildComponent().then((fixture: ComponentFixture) => {
            let component = fixture.debugElement.componentViewChildren[0].componentInstance;
            let article = <noosfero.Article>({ id: 1, type: 'TextArticle', parent: { id: 2 } });
            expect(component.getArticleContainer(article)).toEqual(2);
            done();
        });
    });

    it('return article as container when it is a folder', (done: Function) => {
        buildComponent().then((fixture: ComponentFixture) => {
            let component = fixture.debugElement.componentViewChildren[0].componentInstance;
            let article = <noosfero.Article>({ id: 1, type: 'Folder' });
            expect(component.getArticleContainer(article)).toEqual(1);
            done();
        });
    });

    it('return article as container when it is a blog', (done: Function) => {
        buildComponent().then((fixture: ComponentFixture) => {
            let component = fixture.debugElement.componentViewChildren[0].componentInstance;
            let article = <noosfero.Article>({ id: 1, type: 'Blog' });
            expect(component.getArticleContainer(article)).toEqual(1);
            done();
        });
    });

    it('check if profile was loaded', (done: Function) => {
        let profile: any = {
            id: 1,
            identifier: 'the-profile-test',
            type: 'Person'
        };

        helpers.mocks.profileService.getCurrentProfile = () => {
            return helpers.mocks.promiseResultTemplate(profile);
        };

        buildComponent().then((fixture: ComponentFixture) => {
            let contentViewerComp: ContentViewerActionsComponent = fixture.debugElement.componentViewChildren[0].componentInstance;

            expect(contentViewerComp.profile).toEqual(jasmine.objectContaining(profile));

            done();
        });
    });

});
