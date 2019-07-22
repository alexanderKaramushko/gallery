"use strict";

const gulp = require("gulp");
const browserSync = require("browser-sync").create();

const paths = {
  html: {
    src: "src/index.html",
    dst: "dest/"
  },
  scss: {
    src: "src/scss/style.scss",
    dst: "dest/css"
  },
  js: {
    src: "src/js/script.js",
    dst: "dest/js"
  },
  assets: {
    src: "src/assets/**/*.*",
    dst: "dest/assets/"
  },
  serve: {
    server: "dest/",
    watch: "src/**/*.*"
  },
  svg: {
    src: "src/assets/icons/*.svg",
    dst: "dest/assets/icons/sprites"
  }
};

function lazyRequireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
}

lazyRequireTask("build:html", "./tasks/html.js", {
  src: paths.html.src,
  dst: paths.html.dst
});

lazyRequireTask("build:scss", "./tasks/scss.js", {
  src: paths.scss.src,
  dst: paths.scss.dst
});

lazyRequireTask("build:js", "./tasks/js.js", {
  src: paths.js.src,
  dst: paths.js.dst
});

lazyRequireTask("build:assets", "./tasks/assets.js", {
  src: paths.assets.src,
  dst: paths.assets.dst
});

lazyRequireTask("build:svg", "./tasks/svg.js", {
  src: paths.svg.src,
  dst: paths.svg.dst
});

lazyRequireTask("serve", "./tasks/serve.js", {
  server: paths.serve.server,
  watch: paths.serve.watch
});

gulp.task(
  "build",
  gulp.series(
    "build:html",
    "build:scss",
    "build:js",
    "build:assets",
    "build:svg"
  )
);

gulp.task("default", gulp.series("build", "serve"));
