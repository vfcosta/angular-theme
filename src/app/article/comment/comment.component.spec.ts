import {Provider, provide, Component} from 'ng-forward';
import * as helpers from "../../../spec/helpers";

import {CommentComponent} from './comment.component';

const htmlTemplate: string = '<noosfero-comment [article]="ctrl.article" [comment]="ctrl.comment"></noosfero-comment>';

describe("Components", () => {
    describe("Comment Component", () => {

        beforeEach(angular.mock.module("templates"));

        @Component({ selector: 'test-container-component', directives: [CommentComponent], template: htmlTemplate, providers: helpers.provideFilters("translateFilter") })
        class ContainerComponent {
            article = { id: 1 };
            comment = { title: "title", body: "body" };
        }

        it("render a comment", done => {
            helpers.createComponentFromClass(ContainerComponent).then(fixture => {
                expect(fixture.debugElement.queryAll(".comment").length).toEqual(1);
                done();
            });
        });

        it("not render a post comment tag in the beginning", done => {
            helpers.createComponentFromClass(ContainerComponent).then(fixture => {
                expect(fixture.debugElement.queryAll("noosfero-post-comment").length).toEqual(0);
                done();
            });
        });

        it("render a post comment tag when click in reply", done => {
            helpers.createComponentFromClass(ContainerComponent).then(fixture => {
                let component: CommentComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                component.reply();
                fixture.debugElement.getLocal("$rootScope").$apply();
                expect(fixture.debugElement.queryAll("noosfero-post-comment").length).toEqual(1);
                done();
            });
        });

    });
});
