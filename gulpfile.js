var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack');
var gutil = require('gulp-util');
var webpackConfig = require('./webpack.config');
var WebpackDevServer = require('webpack-dev-server');

gulp.task('styles:dev', function() {
    gulp.src('public/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                path.join(__dirname, 'node_modules', 'bootstrap-sass', 'assets', 'stylesheets'),
                path.join(__dirname, 'node_modules', 'font-awesome', 'scss')
            ],
            onError: function(err) {
                throw new gutil.PluginError('webpack-dev-server', err);
            }
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('build-dev', ['webpack:build-dev', 'styles:dev'], function(){
    gulp.watch(['public/**/*'], ['webpack:build-dev', 'styles:dev']);
});

gulp.task('webpack:build', function(callback) {
    var config = Object.create(webpackConfig);
    config.plugins = config.plugins.concat(
        new webpack.DefinePlugin({
            'process:end': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    webpack(config, function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack:build', err);
        }
        gutil.log('[webpack:build]', stats.toString({
            colors: true
        }));
        callback();
    });
});

var devConfig = Object.create(webpackConfig);

devConfig.devtool = 'sourcemap';
devConfig.debug = true;
var devCompiler = webpack(devConfig);

gulp.task('webpack:build-dev', function(callback) {
    devCompiler.run(function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack:build', err);
        }

        gutil.log('[webpack:build-dev]', stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('webpack-dev-server', function() {
    var config = Object.create(webpackConfig);
    config.devtool = 'eval';
    config.debug = true;

    new WebpackDevServer(webpack(config), {
        publicPath: '/' + config.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8100, 'localhost', function(err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
        gutil.log('[webpack-dev-server]', 'http://localhost:8100/webpack-dev-server/index.html');
    });
});