"use strict";

const $ = require("gulp-load-plugins")();
const gulp = require("gulp");
const multipipe = require("multipipe");
const autoprefixer = require("autoprefixer");
const uncss = require("postcss-uncss");
const browserSync = require("browser-sync").create();

var plugins = [
  autoprefixer({ browsers: ["last 2 version"] })
  // uncss({
  //   html: "dest/index.html"
  // })
];

module.exports = function(options) {
  return function() {
    return multipipe(
      gulp.src(options.src, { since: gulp.lastRun("build:scss") }),
      $.newer({ dest: options.dst, ext: ".css" }),
      $.debug({ title: "scss" }),
      $.sass(),
      $.postcss(plugins),
      $.cssmin(),
      $.rename({ suffix: ".min" }),
      gulp.dest(options.dst),
      browserSync.stream()
    ).on(
      "error",
      $.notify.onError(function(error) {
        return {
          title: "scss",
          message: error.message
        };
      })
    );
  };
};
