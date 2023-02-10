import concat from 'gulp-concat'

export const script = () => {
    return app.gulp.src(app.path.src.components)
        .pipe(concat('all.js'))
        .pipe(app.gulp.dest(app.path.src.jsFolder))
}