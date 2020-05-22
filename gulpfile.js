const project = {
		'cssPath'   : './css'
	},

	// GULP MODULES;
	gulp            = require('gulp'),
	watch           = require('gulp-watch'),
	sass            = require('gulp-sass'),
	cleanCSS        = require('gulp-clean-css'),
	mediaQueries    = require('gulp-group-css-media-queries'),
	imageOpt        = require('gulp-image'),
	concat          = require('gulp-concat');

gulp.task('styles', function(){
  return gulp.src('./sass/flags.scss')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(mediaQueries())
		.pipe(concat('flags.dev.css'))
		.pipe(gulp.dest(project.cssPath))
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

gulp.task('images', function(){
	return gulp.src('images/**/*')
		.pipe(imageOpt({
			pngquant: true,
			optipng: false,
			zopflipng: true,
			jpegRecompress: false,
			mozjpeg: true,
			gifsicle: true,
			svgo: true,
			concurrent: 10
		}))
		.pipe(gulp.dest(project.cssPath));
});

gulp.task('watch-styles', function(){
	gulp.watch(['./sass/**/*.scss'], gulp.series(['styles']));
});

gulp.task('default', gulp.parallel(['styles', 'watch-styles', 'images']));
