/**
 * Created by admin on 2017/2/23.
 */
var gulp=require("gulp");
var less=require("gulp-less");
var filter= require('gulp-filter');
var imagemin=require('gulp-imagemin');
var clean = require('gulp-clean');
var browserSync=require("browser-sync").create();
var reload=browserSync.reload;

gulp.task('clean', function(){
    return gulp.src('dist', { read:false })
        .pipe(clean());
});

gulp.task("html",function(){
    gulp.src(["src/*.html","src/html/*.html"])
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('images', function() {
    gulp.src(["src/imgs/*.{png,jpg,jpeg,gif}"])
        .pipe(imagemin())
        .pipe(gulp.dest("dist/imgs"))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('less', function () {
    return gulp.src(["src/css/*.less","src/css/*.css"])
        .pipe(less({sourcemap: true}))
        .pipe(gulp.dest('dist/css'))// Write the CSS & Source maps
        .pipe(filter('**/*.css')) // Filtering stream to only css files
        .pipe(browserSync.reload({stream:true}));
});

gulp.task("js",function(){
    return gulp.src(["src/js/*.js","src/js/lib/*.js"])
        .pipe(gulp.dest("dist/js"));
});
gulp.task('js-watch', ['js'], browserSync.reload);

gulp.task("default",function(){

    browserSync.init({
        server: "./"
    });

    gulp.watch("src/css/*.css",["less"]).on("change",reload);
    gulp.watch("src/html/*.html",["html"]).on("change",reload);
    gulp.watch("src/js/*.js", ['js-watch']);
    gulp.watch("src/images/*", ['images']);
});

gulp.task("init",["less","html","js","images"]);