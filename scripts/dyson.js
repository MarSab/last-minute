var express = require('express'),
    dyson = require('dyson'),
    path = require('path'),
    stylus = require('express-stylus'),
    nib = require('nib');

var options = {
    configDir: path.join(__dirname, '../data'),
};

var publicDir = path.join(__dirname, '../public/css');

var myApp = express();
myApp.use(express.static('public'));

myApp.use(stylus({
    src: publicDir,
    use: [nib()],
    import: ['nib']
}));

myApp.use(express.static(publicDir));

var configs = dyson.getConfigurations(options);
dyson.registerServices(myApp, options, configs);
myApp.listen(8765);
