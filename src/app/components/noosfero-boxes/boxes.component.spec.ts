import {Component} from 'ng-forward';

import {Box, Profile} from "../../models/interfaces";
import {Boxes} from './boxes.component';

import {
    createComponentFromClass,
    quickCreateComponent,
    provideEmptyObjects,
    createProviderToValue,
    getAngularServiceFactory,
    provideFilters
} from "../../../spec/helpers";

// this htmlTemplate will be re-used between the container components in this spec file
const htmlTemplate: string = '<noosfero-boxes [boxes]="ctrl.boxes" [owner]="ctrl.profile"></noosfero-blog>';


describe("Boxes Component", () => {

    beforeEach(() => {
        angular.mock.module("templates");
    });

    @Component({
        selector: 'test-container-component',
        template: htmlTemplate,
        directives: [Boxes],
        providers: []
    })
    class BoxesContainerComponent {
        boxes: Box[] = [
            { id: 1, position: 1 },
            { id: 2, position: 2 }
        ];

        owner: Profile = {
            id: 1,
            identifier: 'profile-name',
            type: 'Person'
        };
    }

    it("renders boxes into a container", (done: Function) => {
        createComponentFromClass(BoxesContainerComponent).then((fixture) => {
            let boxesHtml = fixture.debugElement;
            expect(boxesHtml.query('div.col-md-7').length).toEqual(1);
            expect(boxesHtml.query('div.col-md-2-5').length).toEqual(1);

            done();
        });
    });

    it("check the boxes order", (done: Function) => {
        createComponentFromClass(BoxesContainerComponent).then((fixture) => {

            let boxesComponent: Boxes = fixture.debugElement.componentViewChildren[0].componentInstance;
            let boxesContainer: BoxesContainerComponent = fixture.componentInstance;

            expect(boxesComponent.boxesOrder(boxesContainer.boxes[0])).toEqual(1);
            expect(boxesComponent.boxesOrder(boxesContainer.boxes[1])).toEqual(0);

            done();
        });
    });
});
