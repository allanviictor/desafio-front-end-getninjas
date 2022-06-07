const gulp = require('gulp');
const { parallel } = require('gulp');
const sass =require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

function style() {
    return gulp.src(['./src/sass/style.sass']) 
    .pipe(sass({ includePaths: ['./node_modules'] })) 
    .pipe(concat('style.css')) 
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/')) 
    .pipe(browserSync.stream())
    
}

function js() {
    return gulp.src(['./src/js/app.js','./src/js/api.js'])
    .pipe(concat('app.js')) 
    .pipe(gulp.dest('./dist')) 
    .pipe(browserSync.stream())
}

function html() {
    return gulp.src('./src/pages/*.html')
    .pipe(gulp.dest('./dist'))
}


function watch() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })
    gulp.watch(['./src/sass/**/*.sass','./src/sass/**/*.scss'], style)
    gulp.watch('./src/pages/*.html', html)
    gulp.watch('./src/js/*.js', js)
    gulp.watch('./dist/*.html').on('change', browserSync.reload)
}


exports.style = style;
exports.watch = watch;
exports.html = html;
exports.js = js;
exports.default = parallel(watch, style, html, js);
