var fs = require('fs');
var postcss = require('postcss');
var pxtorem = require('postcss-pxtorem');
var pttorem = require('postcss-pt2rem');
//var css = fs.readFileSync(src, 'utf8');
const config = JSON.parse(fs.readFileSync('src.config', 'utf8'));
const cliArgs = process.argv.slice(2);
const cssList = cliArgs.concat(config.css || []);;

cssList.map( file => {
    var css = fs.readFileSync(file, 'utf8');
    var processedCss;

    //process px to rem
    processedCss = postcss(pxtorem(config.px_options)).process(css).css;
    //process pt to rem
    processedCss = postcss(pttorem(config.pt_options)).process(processedCss).css;

    fs.writeFile(file, processedCss, function (err) {
        if (err) {
            console.error(err.message);
        }
        else
        {
            console.log(`${file} convert done.`);
        }
    });
});
