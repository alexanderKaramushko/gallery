"use strict";

const $ = require("gulp-load-plugins")();
const gulp = require("gulp");
const browserSync = require("browser-sync").create();

module.exports = function(options) {
  return function() {
    return gulp
      .src(options.src, { since: gulp.lastRun("build:html") })
      .pipe($.newer({ dest: "dest/", ext: ".html" }))
      .pipe($.debug({ title: "html" }))
      .pipe(gulp.dest(options.dst))
      .pipe(browserSync.stream());
  };
};
