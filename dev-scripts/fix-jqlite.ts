let replace = require("replace");

import * as path from "path";

let wrong_jqlite_d_ts_file = path.join(__dirname, "../node_modules/ng-forward/cjs/util/jqlite-extensions.d.ts");

replace({
    regex: /import JQuery from \".\/\";/,
    replacement: "",
    paths: [wrong_jqlite_d_ts_file],
    sillent: false
});

