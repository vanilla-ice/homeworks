// Ваш код
var gulp         = require('gulp'),
    less         = require('gulp-less'),
    autoprefixer = require('autoprefixer'),
    watch        = require('gulp-watch'),
    browserSync  = require('browser-sync'),
    sourcemaps   = require('gulp-sourcemaps'),
    uglify       = require('gulp-uglify'),
    imagemin     = require('gulp-imagemin'),
    eslint       = require('gulp-eslint'),
    postcss      = require('gulp-postcss'),
    concat       = require('gulp-concat'),
    reload       = browserSync.reload;



gulp.task('compress', function() {
    gulp.src('src/js/**/*.js')
      .pipe(concat('all.js'))
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('build/js/'));
});

gulp.task('template', function() {
    gulp.src('src/**/*.html').pipe(gulp.dest('build/'));
});

gulp.task('minimg', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'));
});

gulp.task('style', function () {
    return gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/css/'))
        .pipe(reload({stream: true}));
});


gulp.task('watch', function () {
    watch('./src/**/*.less', function () {
        gulp.start('style');
    });
    watch('.src/**/*.html', function() {
        gulp.start('templates');
    });
    watch('.src/**/*.js', function() {
        gulp.start('compress');
    });
});

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Server
var config = {
    server: {
        baseDir: './build'
    },
    ghostMode: {
        clicks: false,
        forms: false,
        scroll: false
    },
    tunnel: false,
    ui: false,
    host: 'localhost',
    logPrefix: 'Simple Project Template'
};
gulp.task('server', function () {
    browserSync(config);
});


// Default task
gulp.task('default', ['minimg', 'lint', 'style', 'template', 'compress', 'server', 'watch']);
