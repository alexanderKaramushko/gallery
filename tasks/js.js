"use strict";

const $ = require("gulp-load-plugins")();
const gulp = require("gulp");
const multipipe = require("multipipe");
const browserSync = require("browser-sync").create();

module.exports = function(options) {
  return function() {
    return multipipe(
      gulp.src(options.src),
      $.newer({
        dest: "dest/js/**/*.js",
        ext: ".js"
      }),
      $.debug({ title: "js" }),
      $.include(),
      $.babel({
        presets: ["@babel/env"]
      }),
      $.uglify(),
      $.rename({ suffix: ".min" }),
      gulp.dest(options.dst),
      browserSync.stream()
    ).on(
      "error",
      $.notify.onError(function(error) {
        return {
          title: "js",
          message: error.message
        };
      })
    );
  };
};
