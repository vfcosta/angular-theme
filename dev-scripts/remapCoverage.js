"use strict";
var path = require("path");
var fs = require("fs");
var remapIstanbul = require("remap-istanbul");
var coveragePath = path.join(__dirname, "..", "coverage");
console.log("COVERAGE PATH:", coveragePath);
fs.readdir(coveragePath, function (err, directories) {
    if (err) {
        console.error(err.message);
        throw err;
    }
    directories.map(function (file) {
        return path.join(coveragePath, file);
    }).forEach(function (coverageFolder) {
        var coverageFile = path.join(coverageFolder, "coverage-final.json");
        var replace = require("replace");
        var absoluteProjectPath = path.join(__dirname, "../");
        var loadCoverage = require('remap-istanbul/lib/loadCoverage');
        var remap = require('remap-istanbul/lib/remap');
        var writeReport = require('remap-istanbul/lib/writeReport');
        var collector = remap(loadCoverage(coverageFile), {});
        var Store = require("istanbul").Store;
        var store = Store.create("fslookup");
        store.get = function (key) {
            var pathNormalized = key.replace("src/webpack:/", "");
            pathNormalized = pathNormalized.replace(/\.ts\?(\w+)/, ".ts");
            return fs.readFileSync(pathNormalized, 'utf8');
        };
        writeReport(collector, 'html', coverageFolder, store);
        writeReport(collector, 'json', path.join(coverageFolder, 'coverage-final-remaped.json'), store);
    });
});
//# sourceMappingURL=remapCoverage.js.map