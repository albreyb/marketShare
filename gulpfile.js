var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('scripts', function(){
  // minifying, first thing: tell gulp where the source of the files are using .src
  return gulp.src('services/*.js') // uses specify the directive
    // .pipe(concat('all.min.js')) concats files before uglifying
        .pipe(uglify()) // pipes the uglify function for minification
        .pipe(gulp.dest('services_min')); // .dest is the destination folder of your minified files
});

gulp.task('js', function(){
  return browserify('./client/data', {debug: true})
         .bundle()
         .pipe(source('bundle.js'))
         .pipe(gulp.dest('client'));
});

//tips and tricks: always return the stream, it's the only way gulp can know 
// when a command is completed

