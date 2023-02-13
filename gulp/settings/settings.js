// path
export const path = {
    build: {
        html: './build/',
        css: './build/css/',
        img: './build/img/',
        js: './build/js/'
    },
    src: {
        html: './src/*.pug',
        img: './src/img/**/*.{jpg,jpeg,png,gif}',
        scss: './src/scss/style.scss',
        components: './src/common/**/*.js',
        js: './src/js/app.js',
        jsFolder: './src/js/',
        svgicons: './src/img/icons/*.svg'
    },
    clean: './app'
}

// plugins

import notify from 'gulp-notify'
import plumber from 'gulp-plumber'
import rename from 'gulp-rename'
import browsersync from 'browser-sync'

export const plugins = {
    notify,
    plumber,
    rename,
    browsersync
}