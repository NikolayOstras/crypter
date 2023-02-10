import imagemin from 'gulp-imagemin'
export const img = () => {
    return app.gulp.src(app.path.src.img)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 // 0 to 7
        }))
        .pipe(app.gulp.dest(app.path.build.img))
}