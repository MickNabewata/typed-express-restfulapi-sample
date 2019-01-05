var gulp = require('gulp');
var typescript = require('gulp-typescript');
var uglify = require('gulp-uglify');

/** ビルドタスク */
gulp.task("build", function() {

    var pj = typescript.createProject("./tsconfig.json");

    //#region src

    // www
    gulp.src(["src/www"])
        // Copy
        .pipe(gulp.dest("bin"));

    // ts
    gulp.src(["src/**/*.ts"])
        // typescript compile
        .pipe(pj()).js
        // Minimize
        .pipe(uglify())
        // Copy
        .pipe(gulp.dest("bin"));

    // js
    gulp.src(["src/**/*.js"])
        // Minimize
        .pipe(uglify())
        // Copy
        .pipe(gulp.dest("bin"));

    // jade
    gulp.src(["src/**/*.jade"])
        // Copy
        .pipe(gulp.dest("bin"));

    //#endregion

    //#region public

    // all
    gulp.src(["public/**/*.*"])
        // Copy
        .pipe(gulp.dest("bin/public"));

    //#endregion

});