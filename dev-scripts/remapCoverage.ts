/**
 * @script remap-coverage.ts
 *
 * Esse script serve para transformar as informações de cobertura geradas pelo karma-coverage
 * e que originalmente é construída apontando para os arquivos javascript (já que os testes são executados em javascript)
 * para a informação de cobertura apontando para os arquivos Typescript, utilizando os source maps gerados pelo compilador
 * typescript
 * @author: Abner Oliveira
 *
 * Examplo de uso:
 *
 * Na linha de comando, na pasta raiz do projeto, digite:
 *
 * ts-node dev-scripts/remap-coverage.ts
 *
 * Observação: O karma já deve ter sido executado antes, e a pasta de coverage deve ser "./coverage"
 */

import * as path from "path";
import * as fs from "fs";

let remapIstanbul = require("remap-istanbul");

// pasta onde os arquivos do coverage são gerados
let coveragePath = path.join(__dirname, "..", "coverage");

// o pré-processador "coverage" do runner de tests "karma" gera uma pasta
// de coverage para cada browser em que os testes foram executados
// iteraremos arqui então entre essas pastas para realizar o remap de cada uma

console.log("COVERAGE PATH:", coveragePath);
// lendo o diretório coveragePath
fs.readdir(coveragePath, (err, directories) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
    // para cada diretório na pasta coveragePath faz map transformando o path para o caminho absoluto
    directories.map((file) => {
        return path.join(coveragePath, file);
    }).forEach((coverageFolder) => {

        let coverageFile = path.join(coverageFolder, "coverage-final.json");

        let replace = require("replace");

        let absoluteProjectPath = path.join(__dirname, "../");

        // replace({
        //     regex: absoluteProjectPath,
        //     replacement: "",
        //     paths: [coverageFile],
        //     sillent: true
        // });
        // para cada pasta executa o remap do coverage que está apontando para os arquivos js
        // para apontar para os arquivos Typecript
        // gerando dois reports: JSON e HTML
        // remapIstanbul(coverageFile,
        //     {
        //         "exclude":
        //         "json": path.join(coverageFolder, "coverage-final-remaped.json")
        //     });

        // replace({
        //     regex: "src/webpack:/",
        //     replacement: "",
        //     paths: [coverageFile],
        //     sillent: true
        // });

        let loadCoverage = require('remap-istanbul/lib/loadCoverage');
        let remap = require('remap-istanbul/lib/remap');
        let writeReport = require('remap-istanbul/lib/writeReport');

        let collector = remap(loadCoverage(coverageFile), {
            /*exclude: 'Reflect',
            readFile: function(filePath): any {
                let pathNormalized = filePath.replace("webpack:///./src/", "");
                pathNormalized = pathNormalized.replace(/\.ts\?(\w+)"/, ".ts\"");
                console.log("FILE PATH: ", pathNormalized);
                if (!fs.existsSync(pathNormalized)) {
                    console.warn(new Error('Could not find file: "' + pathNormalized + '"'));
                    return '';
                }
                return fs.readFileSync(pathNormalized);
            }*/
        });

        let Store = require("istanbul").Store;
        let store = Store.create("fslookup");
        store.get = function(key) {
            let pathNormalized = key.replace("src/webpack:/", "");
            pathNormalized = pathNormalized.replace(/\.ts\?(\w+)/, ".ts");
            return fs.readFileSync(pathNormalized, 'utf8');
        }
        writeReport(collector, 'html', coverageFolder, store);
        writeReport(collector, 'json', path.join(coverageFolder, 'coverage-final-remaped.json'), store);
    });

});
