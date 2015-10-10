var gulp = require('gulp');
var jshint = require('gulp-jshint');
var fixmyjs = require('gulp-fixmyjs');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('processImage',function(){
    gulp.src('src/image/*').pipe(gulp.dest('dist/image'));
});

gulp.task('default',['processImage'] ,function(){
    return gulp.src('src/script/lib/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(fixmyjs())
        .pipe(uglify())
        .pipe(gulp.dest('dist/script/lib'));
        /*.pipe(concat('all.js'))
        .pipe(gulp.dest('dist/script/lib'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/script/lib'));*/
});
