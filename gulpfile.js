var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var clean = require('gulp-clean');
var zip = require('gulp-zip');
var minifyJs = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
var notify = require('gulp-notify');
/*css编译*/
gulp.task('less', function() {
        return gulp.src('src/less/**/*.less',!'src/less/logo.less')
            .pipe(plumber())
        .pipe(less())
            .pipe(autoprefixer('last 2 versions', 'last 1 Chrome versions', 'last 2 Explorer versions', 'last 3 Safari versions', 'Firefox >= 20'))
            .pipe(concat('index.css'))
            //.pipe(rename('index.css'))
            .pipe(gulp.dest('dist/css'))
            .pipe(notify({
                message:'css编译完成'
            }));
    });
/*css压缩*/
gulp.task('minifyCss',['less'],function(){
    return gulp.src('dist/css/index.css')
    .pipe(minifyCss())
        .pipe(rename('index.min.css'))
    .pipe(gulp.dest('dist/css'))
        .pipe(livereload())
        .pipe(notify({
            message:'css压缩完成'
        }));

});
gulp.task('logo',function(){
    return gulp.src('src/less/logo.less')
        .pipe(less())
        .pipe(minifyCss())
        .pipe(rename('logo.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({
            message:'logo.css编译完成'
        }));
});
/*html压缩*/
gulp.task('minifyHtml',function(){
    return gulp.src('src/html/**/*.html')
        .pipe(minifyHtml({
            removeComments: true,  //清除HTML注释
            collapseWhitespace: true,  //压缩HTML
            collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
            removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
            minifyJS: true,  //压缩页面JS
            minifyCSS: true  //压缩页面CSS
        }))
        .pipe(gulp.dest('dist/html'))
        .pipe(livereload())
        .pipe(notify({
            message:'html压缩完成'
        }));
});
/*js代码检查*/
gulp.task('jshint',function(){
    return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter());
});
/*合并js*/
gulp.task('concatJs',function(){
    return gulp.src('src/js/**/*.js')
        .pipe(concat('index.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({
            message:'合并js完成'
        }));
});
/*压缩js*/
gulp.task('minifyJs',['concatJs'],function(){
    return gulp.src('dist/js/index.js')
        .pipe(minifyJs())
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload())
        .pipe(notify({
            message:'压缩js完成'
        }));

});
/*压缩图片*/
gulp.task('imagemin',function(){
    return gulp.src('src/image/*.jpg')
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/image'))
        .pipe(notify({
            message:'压缩图片完成'
        }))
        .pipe(livereload());
});
gulp.task('json',function(){
    return gulp.src('src/json/**/*.json')
        .pipe(gulp.dest('dist/json'))
        .pipe(notify({
            message:'json复制完成'
        }))
        .pipe(livereload());
});
/*打包zip*/
gulp.task('zip',function(){
    return gulp.src('dist/**')
        .pipe(zip('jd.zip'))
        .pipe(gulp.dest(''))
        .pipe(notify({
            message:'打包zip完成'
        }));
});
/*删除打包zip*/
gulp.task('clean',function(){
    return gulp.src('jd.zip')
        .pipe(clean());
});
gulp.task('watch', function () {
        livereload.listen();
       gulp.watch(['src/less/**/*.less','!src/less/logo.less'], ['minifyCss']);/*css编译压缩*/
    gulp.watch(['src/less/logo.less'], ['logo']);/*css编译压缩*/
    gulp.watch(['src/html/**/*.html'], ['minifyHtml']);/*html压缩*/
    gulp.watch(['src/js/**/*.js'], ['minifyJs']);/*js压缩*/
    //gulp.watch(['src/image/*.*'], ['imagemin']);/*j图片压缩*/
    gulp.watch(['src/json/**/*.json'], ['json']);/*js压缩*/
     });
/*默认任务*/
gulp.task('default',['clean'],function(){
    gulp.run('minifyCss','logo','minifyJs'/*,'imagemin'*/,'minifyHtml','json','zip','watch');
});