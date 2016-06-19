import {DisplayBoxes} from './display-boxes.filter';

describe("Boxes Filters", () => {
    describe("Display Boxes Filter", () => {

        let boxes: noosfero.Box[] = [
            {id: 1, position: 1 },
            {id: 2, position: 2 },
            {id: 3, position: 3 },
            {id: 4, position: 4 }
        ];

        let expected_on_default: noosfero.Box[] = [
            {id: 1, position: 1 },
            {id: 2, position: 2 },
            {id: 3, position: 3 },
        ];

        let expected_on_rightbar: noosfero.Box[] = [
            {id: 1, position: 1 },
            {id: 3, position: 3 },
        ];

        it("filter boxes when layout is set to default", done => {
          let filter = new DisplayBoxes();

          let filtered_boxes: noosfero.Box[] = filter.transform(boxes, "default");
          expect(filtered_boxes.length).toEqual(3);
          expect(filtered_boxes).toEqual(expected_on_default);
          done();
        });

        it("filter boxes when layout is set to rightbar", done => {
          let filter = new DisplayBoxes();

          let filtered_boxes: noosfero.Box[] = filter.transform(boxes, "rightbar");
          expect(filtered_boxes.length).toEqual(2);
          expect(filtered_boxes).toEqual(expected_on_rightbar);
          done();
        });

        it("filter boxes with default layout when invalid layout is given", done => {
          let filter = new DisplayBoxes();

          let filtered_boxes: noosfero.Box[] = filter.transform(boxes, "");
          expect(filtered_boxes.length).toEqual(3);
          expect(filtered_boxes).toEqual(expected_on_default);
          done();
        });
    });
});
