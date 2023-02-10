import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import sassGlob from 'gulp-sass-glob'
const sass = gulpSass(dartSass)

export const scss = () => {
    return app.gulp.src(app.path.src.scss)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error <%= error.message %>"
            })
        ))
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream())
}