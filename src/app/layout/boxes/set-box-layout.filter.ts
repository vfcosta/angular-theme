import {Pipe, Inject} from "ng-forward";

@Pipe("setBoxLayout")
export class SetBoxLayout {

    transform(pos: number, layout: string) {
        if (layout === "rightbar") {
          return this.right_bar(pos);
        }else {
          return this.default(pos);
        }
    }

    private default(position: number) {
        if (position === 1) {
          return "col-md-6 col-md-push-3";
        }else if (position === 2) {
          return "col-md-3 col-md-pull-6";
        }else {
          return "col-md-3";
        }
    }

    private right_bar(position: number) {
        if (position === 1) {
          return "col-sm-12 col-md-8";
        }else {
          return "col-sm-12 col-md-4";
        }
    }

}
