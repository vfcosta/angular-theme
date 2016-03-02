import * as glob from "glob";
import * as path from "path";
import * as fs from "fs";
let directories = glob.sync("./src/app/**/**/");

// maps to absolute path
directories = directories.map((directory: string) => {
    return path.resolve(__dirname, "..", directory);
});

// iterate to generate the index folders
directories.forEach((directory: string) => {
    // skips the app directory
    if (!/\/app$/.test(directory)) {
        let current_files = glob.sync("./*.ts", { nodir: true, cwd: directory, ignore: ['./index.ts', './*.spec.ts'] });
        console.log("DIRECTORY: ", directory);
        console.log("FILES: ", current_files);

        let indexPath = path.join(directory, "index.ts");

        let index_ts_content: string = "/* Module Index Entry - generated using the script npm run generate-index */\n";

        let exports_content = current_files.map((file) => {
            return `export * from "./${path.basename(file, ".ts")}";\n`;
        });

        fs.writeFileSync(indexPath, index_ts_content + exports_content.join(""));

    }



});
