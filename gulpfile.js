var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var copy = require('gulp-file-copy');
var sass = require('gulp-sass');
var base64 = require('gulp-base64');
var uglify = require('gulp-uglify');

/**
 * 修改 gulp-strip-debug 配置，不要删除 alert 调试方法
 * http://blog.yongyuan.us/2015/08/24/%E4%BF%AE%E6%94%B9%20gulp-strip-debug%20%E9%85%8D%E7%BD%AE%EF%BC%8C%E4%B8%8D%E8%A6%81%E5%88%A0%E9%99%A4%20alert%20%E8%B0%83%E8%AF%95%E6%96%B9%E6%B3%95/
 * */
var stripDebug = require('gulp-strip-debug');

var autoprefixer = require('gulp-autoprefixer'); // 参数详解:http://www.ydcss.com/archives/94

// clean
gulp.task('clean:dist', function() {
    return gulp.src(['dist/*'])
        .pipe(clean());
});
gulp.task('clean:release', function() {
    return gulp.src(['release/*'])
        .pipe(clean());
});

// scss
gulp.task('style', function() {
    gulp.src(['src/scss/*.scss','!src/scss/var.scss'])
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'));
});

// ts
gulp.task('ts', function() {
    var tsResult = gulp.src([
        'src/ts/asciiArt/ijia/puremvc/Interface.ts',
        'src/ts/asciiArt/ijia/puremvc/Observer.ts',
        'src/ts/asciiArt/ijia/puremvc/View.ts',
        'src/ts/asciiArt/ijia/puremvc/Controller.ts',
        'src/ts/asciiArt/ijia/puremvc/Model.ts',
        'src/ts/asciiArt/ijia/puremvc/Notification.ts',
        'src/ts/asciiArt/ijia/puremvc/Facade.ts',
        'src/ts/asciiArt/ijia/puremvc/Notifier.ts',
        'src/ts/asciiArt/ijia/puremvc/MacroCommand.ts',
        'src/ts/asciiArt/ijia/puremvc/SimpleCommand.ts',
        'src/ts/asciiArt/ijia/puremvc/Mediator.ts',
        'src/ts/asciiArt/ijia/puremvc/Proxy.ts',

        'src/ts/asciiArt/ijia/utils/*',
        'src/ts/asciiArt/ijia/events/*',
        'src/ts/asciiArt/ijia/dom/*',
        'src/ts/asciiArt/ijia/*',

        'src/ts/asciiArt/notify/*',
        'src/ts/asciiArt/utils/*',
        'src/ts/asciiArt/controller/BaseCommand.ts',
        'src/ts/asciiArt/controller/bootstrap/*',
        'src/ts/asciiArt/controller/command/*',
        'src/ts/asciiArt/controller/*',
        'src/ts/asciiArt/generator/BaseGenerator.ts',
        'src/ts/asciiArt/generator/*',
        'src/ts/asciiArt/view/BaseMediator.ts',
        'src/ts/asciiArt/view/component/button/*',
        'src/ts/asciiArt/view/component/*',
        'src/ts/asciiArt/view/stage/msg/*',
        'src/ts/asciiArt/view/stage/*',
        'src/ts/asciiArt/view/*',

        'src/ts/asciiArt/*'
    ])
        .pipe(sourcemaps.init())
        .pipe(ts({
            target: "ES5",
            module: "commonjs"
        }));

    return tsResult.js.pipe(concat("ijia-ascii-art.js")).pipe(sourcemaps.write('.')).pipe(gulp.dest('dist/js'));
});

// copy
gulp.task('copy', function() {
    return gulp.src(['src/images/*'])
        .pipe(gulp.dest('dist/images/'));
});

// dist
gulp.task('default', /*['clean:dist'], */function() {
    gulp.start('ts', 'style', 'copy');
});



// release
gulp.task('release:style', function() {
    gulp.src([
        'dist/css/common.css', 'dist/css/animation.css', 'dist/css/button.css'
    ])
        .pipe(base64())
        .pipe(minifycss())
        .pipe(concat('ijia-codeImage-builder.css'))
        .pipe(gulp.dest('release/css'));
});

gulp.task('release:js', function() {
    gulp.src('dist/js/*.js')
        .pipe(stripDebug({debugger: true, console: ['log'], alert: false}))
        .pipe(uglify())
        .pipe(gulp.dest('release/js'));
});
gulp.task('release', ['clean:release'], function() {
    gulp.start('release:style', 'release:js');
});