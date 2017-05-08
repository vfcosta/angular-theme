import * as helpers from "../../../spec/helpers";
import { ProfileHeaderComponent } from './profile-header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { TypeaheadModule } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/of";
import 'rxjs/add/observable/throw';

describe("Components", () => {
    describe("Profile Header Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<ProfileHeaderComponent>;
        let component: ProfileHeaderComponent;

        beforeEach(async(() => {
            spyOn(mocks.designModeService, 'isInDesignMode').and.returnValue(true);
            TestBed.configureTestingModule({
                declarations: [ProfileHeaderComponent],
                providers: [
                    { provide: "designModeService", useValue: mocks.designModeService }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [NgPipesModule, TypeaheadModule.forRoot(), FormsModule]
            });
            fixture = TestBed.createComponent(ProfileHeaderComponent);
            component = fixture.componentInstance;
            component.profile = <noosfero.Profile> {id: 1, permissions: ['allow_edit'], top_image: { url: 'teste.png'}};
        }));

        it('verify if design mode is initialized correctly', () => {
            component.ngOnInit();
            expect(component.designModeService.isInDesignMode).toHaveBeenCalled();
            expect(component.designMode).toBeTruthy();
        });

        it('verify if return the correct profile background', () => {
            expect(component.profileBackground()).toEqual('background-image: url("teste.png")');
        });
    });
});