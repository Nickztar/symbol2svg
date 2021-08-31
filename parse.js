var fs = require('fs');
var path = require('path');

var markup = fs.readFileSync('icons.svg').toString();
var lines = markup.split(/\n/g);
var symbols = {};
var currentSymbol = null;

lines.forEach(function(line){
    var open = line.match(/symbol.*?id="(.*?)"/);
    var close = line.match(/<\/symbol>/);
    if(currentSymbol){
        symbols[currentSymbol].push(line);
    }
    if(open){
        currentSymbol = open[1];
        symbols[currentSymbol] = [line];
    }
    if(close){
        symbols[currentSymbol] = symbols[currentSymbol].join('\n').replace('<symbol', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"').replace('</symbol', '</svg');
        fs.writeFileSync(path.join(__dirname, 'src/svg/' + currentSymbol + '.svg'), symbols[currentSymbol]);
        currentSymbol = null;
    }
});

console.log( Object.keys(symbols) );