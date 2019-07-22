"use strict";

const gulp = require("gulp");
const browserSync = require("browser-sync").create();

module.exports = function(options) {
  return function() {
    browserSync.init({
      server: options.server
    });

    gulp.watch(
      options.watch,
      gulp.series("build", function(done) {
        browserSync.reload();
        done();
      })
    );
  };
};
