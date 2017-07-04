
// require("core-js/shim");
// require("reflect-metadata");


// require all spec files 
requireAll((<any>require).context("./", true, /spec.ts$/));
function requireAll(r: any): any {
    r.keys().forEach(r);
}