import svgSprite from "gulp-svg-sprite";
const config = {
	mode: {
		symbol: {
			sprite: 'icons.svg',
			//example: true
		}
	},
	svg: {
		rootAttributes: {
			// style: 'display: none;',
			// 'aria-hidden': true
		},
		xmlDeclaration: false
	},
	shape: {
		transform: [
			{
				svgo: {}
			}
		]
	}
}
export const svg = () => {
	return app.gulp.src(`${app.path.src.svgicons}`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SVG",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(svgSprite(config))
		// .pipe(app.plugins.rename({ extname: ".html" }))
		.pipe(app.gulp.dest('./build/'))
}