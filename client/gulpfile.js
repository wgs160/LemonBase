/**
 * Created by 15031493 on 2015/5/27.
 * 弃用
 */

/*var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var minifycss = require('gulp-clean-css');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');

var lessPath = "src/less";

//编译less
gulp.task('less', function () {
    gulp.src([lessPath+'/base.less',lessPath+'/lemon.less',lessPath+'/!*.less'])
        .pipe(less())
        .pipe(concat("lemon.css"))
        .pipe(autoprefixer({
            //browsers: 'last 2 versions,Chrome > 30'
            browsers: 'Chrome > 30,safari > 5'
        }))
        .pipe(minifycss({
            keepBreaks: true    //压缩保持换行
        }))
        .pipe(gulp.dest('src/css'))
});



//启动热部署监视less
gulp.task('watch', ["less","webpack-dev-server"], function () {
    gulp.watch(lessPath+'/!*.less', ['less']);
})

// The development server (the recommended option for development)
gulp.task("default", ["less"]);

//热部署
gulp.task("webpack-dev-server", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;
    //不用命令行，用gulp启动需要配置hot插件和入口热部署配置
    myConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:8080', "webpack/hot/dev-server");
    myConfig.plugins.push(new webpack.HotModuleReplacementPlugin());


    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: myConfig.output.publicPath,
        historyApiFallback: true,
        hot:true,
        proxy: {
            "/api": "http://localhost:3000"
        },
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
            if(err) throw new gutil.PluginError("webpack-dev-server", err);
            gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
        });
});*/
/*

// 开发build 并监听
// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", ["webpack:build-dev"], function() {
    gulp.watch(["src/!**!/!*"], ["webpack:build-dev"]);
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
    // run webpack
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

// 生产build
gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});*/
