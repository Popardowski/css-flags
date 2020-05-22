const project = {
		'assetsPath': './',
		'cssPath'   : './'
	},

	// GULP MODULES;
	gulp            = require('gulp'),
	watch           = require('gulp-watch'),
	sass            = require('gulp-sass'),
	cleanCSS        = require('gulp-clean-css'),
	mediaQueries    = require('gulp-group-css-media-queries'),
	concat          = require('gulp-concat');

gulp.task('styles', function(){
  return gulp.src('./flags.scss')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(mediaQueries())
		.pipe(concat('flags.dev.css'))
		.pipe(gulp.dest(project.assetsPath))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(cleanCSS({
			advanced: true,
			semanticMerging: true,
			mediaMerging: true,
			keepSpecialComments: 1
		}))
		.pipe(concat('flags.css'))
		.pipe(gulp.dest(project.cssPath));
});

gulp.task('watch-styles', function(){
	gulp.watch(['./**/*.scss'], gulp.series(['styles']));
});

gulp.task('default', gulp.parallel(['styles', 'watch-styles']));
