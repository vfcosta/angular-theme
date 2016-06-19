import {SetBoxLayout} from './set-box-layout.filter';

describe("Boxes Filters", () => {
    describe("Set Box Layout Filter", () => {
        let box_layout_filter = new SetBoxLayout();
        describe("When layout is set to default", () =>  {
            it("return style when box position is 1 ", done => {
                expect(box_layout_filter.transform(1, "default")).toEqual("col-md-6 col-md-push-3");
                done();
            });
            it("return style when box position is 2", done => {
                expect(box_layout_filter.transform(2, "default")).toEqual("col-md-3 col-md-pull-6");
                done();
            });
            it("return style when any other position is given", done => {
                expect(box_layout_filter.transform(null, "default")).toEqual("col-md-3");
                expect(box_layout_filter.transform(3, "default")).toEqual("col-md-3");
                expect(box_layout_filter.transform(99, "default")).toEqual("col-md-3");
                done();
            });
       });

        describe("When layout is set to right_bar", () =>  {
            it("return style when box position is 1 ", done => {
                expect(box_layout_filter.transform(1, "rightbar")).toEqual("col-sm-12 col-md-8");
                done();
            });
            it("return style when box other position is given", done => {
                expect(box_layout_filter.transform(2, "rightbar")).toEqual("col-sm-12 col-md-4");
                done();
            });
        });
    });
});
