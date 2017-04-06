var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),    
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel');


gulp.task('css', function () {
    return gulp.src('src/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js',function(){
  gulp.src('src/js/script.js')
    .pipe(sourcemaps.init())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('html',function() {
    gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "dist"
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});


gulp.task('default', ['css', 'js', 'html', 'browser-sync'], function () {
    gulp.watch("src/sass/**/*.scss", ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("src/*.html", ['html','bs-reload']);
});
