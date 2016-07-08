import {Pipe, Inject} from "ng-forward";

@Pipe("displayBoxes")
export class DisplayBoxes {

    transform(boxes: noosfero.Box[], layout: string) {
        let function_str: string = "visible_on" + layout;
        let valid_boxes: number[] = [];
        let selected: noosfero.Box[] = [];
        boxes = boxes || [];

        if (layout === "rightbar") {
          valid_boxes = this.visible_on_right_bar();
        }else {
          valid_boxes = this.visible_on_default();
        }

        for (let box of boxes) {
            if (valid_boxes.indexOf(box.position) !== -1) {
              selected.push(box);
            }
        }
        return selected;
    }

    private visible_on_default() {
        return [1, 2, 3];
    }

    private visible_on_right_bar() {
        return [1, 3];
    }

}

