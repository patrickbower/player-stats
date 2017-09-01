const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const sass = require('gulp-sass');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglifycss = require('gulp-uglifycss');
const connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        livereload: true
    });
});

gulp.task('styles', ['clean-styles'], function() {
    return gulp
        .src('./src/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(
            uglifycss({
                maxLineLen: 80,
                uglyComments: true
            })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/styles'));
});

gulp.task('scripts', ['clean-scripts'], function() {
    return browserify({
        entries: './src/js/main.js',
        debug: true,
        sourceMaps: true
    })
        .transform(
            babelify.configure({
                presets: ['es2015']
            })
        )
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe($.uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/scripts'));
});

gulp.task('clean-scripts', function() {
    return gulp.src('./public/scripts/*.js', { read: false }).pipe(clean());
});

gulp.task('clean-styles', function() {
    return gulp.src('./public/styles/*.css', { read: false }).pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['styles']);
    gulp.watch('src/js/*.js', ['scripts']);
});
gulp.task('build', ['styles', 'scripts']);
gulp.task('serve', ['connect', 'watch']);
