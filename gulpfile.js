import gulp from 'gulp'
import { path } from './gulp/settings/settings.js'
import { plugins } from './gulp/settings/settings.js'

import { script } from './gulp/task/script.js'
import { reset } from './gulp/task/reset.js'
import { build } from './gulp/task/build.js'
import { html } from './gulp/task/html.js'
import { scss } from './gulp/task/scss.js'
import { serve } from './gulp/task/serve.js'
import { css } from './gulp/task/css.js'
import { img } from './gulp/task/img.js'
import { svg } from './gulp/task/svg.js'



global.app = {
    gulp: gulp,
    path: path,
    plugins: plugins
}

const js = gulp.series(script, build)

const watcher = () => {
    gulp.watch('./src/**/*.pug', html)
    gulp.watch('./src/**/*.scss', scss)
    gulp.watch('./src/components/**/*.js', script)
    gulp.watch('./src/js/*.js', build)
}

const main = gulp.parallel(html, scss, js)
const buildApp = gulp.series(reset, main, css, img)
const dev = gulp.series(reset, html, scss, js, gulp.parallel(watcher, serve))


gulp.task('image', img)
gulp.task('svg', svg)
gulp.task('html', html)
gulp.task('build', buildApp)
gulp.task('dev', dev)
