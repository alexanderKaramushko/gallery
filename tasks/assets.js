"use strict";

const $ = require("gulp-load-plugins")();
const gulp = require("gulp");
const isProd = !process.env.NODE_ENV || process.env.NODE_ENV == 'prod';
console.log(isProd)

module.exports = function(options) {
  return function() {
    return gulp
      .src(options.src)
      .pipe(
        $.newer({
          dest: options.dst,
        })
      )
      .pipe($.if(isProd, $.imagemin()))
      .pipe(gulp.dest(options.dst));
  };
};