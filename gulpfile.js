const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const prettyError = require('gulp-prettyerror');
const rename = require('gulp-rename'),
terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');

//Sass required element -  https://www.npmjs.com/package/gulp-sass
const sass = require('gulp-sass');
//Minify our css -  https://www.npmjs.com/package/gulp-uglifycss
const uglifycss = require('gulp-uglifycss');

// Create Sass task for compiling sass
gulp.task('sass', function(done) {
  gulp
    .src('./sass/style.scss', { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions']
      })
    )
    .pipe(uglifycss())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./build/css'));

  done();
});

// Set-up BrowserSync and watch
gulp.task('browser-sync', function(done) {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp
  .watch(['build/css/*.css', 'build/js/*.js'])
  .on('change', browserSync.reload);

  done();
});

gulp.task("scripts", function() {
  return gulp
    .src("./js/*.js") // What files do we want gulp to consume?
    .pipe(terser()) // Call the terser function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

gulp.task('watch', function(done) {
  gulp.watch('sass/*.scss', gulp.series('sass'));
  gulp.watch("js/*.js", gulp.series('scripts'));
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));
