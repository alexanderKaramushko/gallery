"use strict";

const $ = require("gulp-load-plugins")({
  rename: {
    "gulp-svg-sprite": "svg"
  }
});
const gulp = require("gulp");

module.exports = function(options) {
  return function() {
    return (
      gulp
        .src(options.src, { since: gulp.lastRun("build:svg") })
        // .pipe(
        //   $.newer({
        //     dest: options.dst,
        //     ext: ".svg"
        //   })
        // )
        .pipe(
          $.svgmin({
            js2svg: {
              pretty: true
            }
          })
        )
        .pipe(
          $.cheerio({
            run: function($) {
              $("[fill]").removeAttr("fill");
              $("[stroke]").removeAttr("stroke");
              $("[style]").removeAttr("style");
            },
            parserOptions: { xmlMode: true }
          })
        )
        .pipe($.replace("&gt;", ">"))
        .pipe(
          $.svg({
            mode: {
              symbol: {
                sprite: "../../sprite.svg",
                render: {
                  scss: {
                    dest: "../../../../../src/scss/_sprites.scss",
                    template: "src/scss/tmpl/_sprites_template.scss"
                  }
                }
              }
            }
          })
        )
        .pipe(gulp.dest(options.dst))
    );
  };
};
