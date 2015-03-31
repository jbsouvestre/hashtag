var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var public = path.join(__dirname, 'public');
var dist = path.join(__dirname, 'dist');

var publicPath = '/_assets/';

module.exports = {
    cache: true,
    entry: path.join(public, 'js', 'app.js'),
    output: {
        path: dist,
        publicPath: publicPath,
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.(html|hbs)$/,
            loader: 'handlebars-loader?helperDirs[]='+__dirname+'/public/js/helpers'
        }]
    },
    resolve: {
        alias: {
            marionette: 'backbone.marionette',
            bootstrap: 'bootstrap-sass',
            __templates__: __dirname + '/public/templates'
        }
    },
    plugins: [
        function(){
            this.plugin('done', function(stats){
                var jsonstats = stats.toJson({
                    chunkModules: true,
                });
                jsonstats.publicPath = publicPath;
                fs.writeFileSync(
                    path.join(__dirname, 'build', 'stats.json'),
                    JSON.stringify(jsonstats, null, 4)
                );
            });
        },
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};