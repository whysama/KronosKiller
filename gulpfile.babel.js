import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';

const plugins = loadPlugins();

import popupWebpackConfig from './popup/webpack.config';
import eventWebpackConfig from './event/webpack.config';
import contentWebpackConfig from './content/webpack.config';

gulp.task('popup-js', ['clean'], (cb) => {
    webpack(popupWebpackConfig, (err, stats) => {
        if (err) throw new plugins.util.PluginError('webpack', err);

        plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

gulp.task('event-js', ['clean'], (cb) => {
    webpack(eventWebpackConfig, (err, stats) => {
        if (err) throw new plugins.util.PluginError('webpack', err);

        plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

gulp.task('content-js', ['clean'], (cb) => {
    webpack(contentWebpackConfig, (err, stats) => {
        if (err) throw new plugins.util.PluginError('webpack', err);

        plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

gulp.task('popup-html', ['clean'], () => {
    return gulp.src('popup/src/index.html')
        .pipe(plugins.rename('popup.html'))
        .pipe(gulp.dest('./build'))
});

gulp.task('copy-manifest', ['clean'], () => {
    return gulp.src('manifest.json')
        .pipe(gulp.dest('./build'));
});

gulp.task('copy-image16', ['clean'], () => {
    return gulp.src('img/16.png')
        .pipe(gulp.dest('./build'));
});

gulp.task('copy-image48', ['clean'], () => {
    return gulp.src('img/48.png')
        .pipe(gulp.dest('./build'));
});

gulp.task('copy-image128', ['clean'], () => {
    return gulp.src('img/128.png')
        .pipe(gulp.dest('./build'));
});

gulp.task('copy-css', ['clean'], () => {
    return gulp.src('css/style.css')
        .pipe(gulp.dest('./build'));
});

gulp.task('clean', (cb) => {
    rimraf('./build', cb);
});

gulp.task('build', ['copy-manifest', 'copy-image48', 'copy-image128', 'copy-image16', 'copy-css', 'popup-js', 'popup-html', 'event-js', 'content-js']);

gulp.task('watch', ['default'], () => {
    gulp.watch('popup/**/*', ['build']);
    gulp.watch('content/**/*', ['build']);
    gulp.watch('event/**/*', ['build']);
    gulp.watch('img/*', ['build']);
});

gulp.task('default', ['build']);
