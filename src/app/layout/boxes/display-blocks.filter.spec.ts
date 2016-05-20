import {quickCreateComponent} from "../../../spec/helpers";
import {DisplayBlocks} from './display-blocks.filter';

describe("Filters", () => {
    describe("Display Blocks Filter", () => {

        let translatorService = jasmine.createSpyObj("translatorService", ["currentLanguage"]);

        it("not fail when blocks is null", done => {
            let filter = new DisplayBlocks(translatorService);
            expect(filter.transform(null, true, <noosfero.User>{})).toEqual([]);
            done();
        });

        it("return blocks when no setting is passed", done => {
            let blocks = [{}];
            let filter = new DisplayBlocks(translatorService);
            expect(filter.transform(<any>blocks, true, <noosfero.User>{})).toEqual(blocks);
            done();
        });

        it("return blocks when no display is passed", done => {
            let blocks = [{ setting: {} }];
            let filter = new DisplayBlocks(translatorService);
            expect(filter.transform(<any>blocks, true, <noosfero.User>{})).toEqual(blocks);
            done();
        });

        it("filter invisible blocks", done => {
            let blocks = [{ settings: { display: "never" } }];
            let filter = new DisplayBlocks(translatorService);
            expect(filter.transform(<any>blocks, true, <noosfero.User>{})).toEqual([]);
            done();
        });

        it("filter blocks with except_home_page in homepage", done => {
            let blocks = [{ settings: { display: "except_home_page" } }];
            let filter = new DisplayBlocks(translatorService);
            expect(filter.transform(<any>blocks, true, <noosfero.User>{})).toEqual([]);
            done();
        });

        it("filter blocks with home_page_only outside homepage", done => {
            let blocks = [{ settings: { display: "home_page_only" } }];
            let filter = new DisplayBlocks(translatorService);
            expect(filter.transform(<any>blocks, false, <noosfero.User>{})).toEqual([]);
            done();
        });

        it("show all blocks when display_user is all for logged user", done => {
            let blocks = [{ settings: { display_user: "all" } }];
            let filter = new DisplayBlocks(translatorService);
            expect(filter.transform(<any>blocks, true, <noosfero.User>{})).toEqual(blocks);
            done();
        });

        it("show all blocks when display_user is all for not logged user", done => {
            let blocks = [{ settings: { display_user: "all" } }];
            let filter = new DisplayBlocks(translatorService);
            expect(filter.transform(<any>blocks, true, null)).toEqual(blocks);
            done();
        });

        it("filter blocks when display_user is logged for not logged user", done => {
            let blocks = [{ settings: { display_user: "logged" } }];
            let filter = new DisplayBlocks(translatorService);
            expect(filter.transform(<any>blocks, true, null)).toEqual([]);
            done();
        });

        it("filter blocks when display_user is not_logged for logged user", done => {
            let blocks = [{ settings: { display_user: "not_logged" } }];
            let filter = new DisplayBlocks(translatorService);
            expect(filter.transform(<any>blocks, true, <noosfero.User>{})).toEqual([]);
            done();
        });

        it("filter blocks with different language", done => {
            let blocks = [{ settings: { language: "en" } }];
            translatorService.currentLanguage = jasmine.createSpy("currentLanguage").and.returnValue("pt");
            let filter = new DisplayBlocks(translatorService);
            expect(filter.transform(<any>blocks, true, <noosfero.User>{})).toEqual([]);
            done();
        });
    });
});
