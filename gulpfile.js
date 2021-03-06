/**
npm install -g gulp gulp-live-server minimist gulp-replace
npm link gulp gulp-live-server minimist gulp-replace
**/
var gulp = require('gulp');
var connect = require('gulp-connect');
var historyApiFallback = require('connect-history-api-fallback');
var minimist = require("minimist");
var replace = require("gulp-replace");

var options = minimist(process.argv.slice(2), { boolean: "prod", boolean: "test" });
var config = {
	buildPaths : [
		'index.html', 
		'app/**',
		'custom_components/**'
	],
	replacement : {
		jsServerDomain : {
			origin : "${GULP_SERVER_DOMAIN}",
			replace : options.prod ? "http://fruitpay.com.tw/fruitpay/" : options.test ? "http://beta.fruitpay.com.tw/fruitpayTest/" : "http://localhost:8081/fruitpay/"
		},
    jsClientDomain : {
      origin : "${GULP_CLIENT_DOMAIN}",
      replace : options.prod ? "http://fruitpay.com.tw/fruitpay/admin" : options.test ? "http://beta.fruitpay.com.tw/fruitpayTest/admin" : "http://localhost:8888"
    },
	}
};

gulp.task('build', function() {
	return gulp.src(config.buildPaths, {base: '.'})
		.pipe(replace(config.replacement.jsServerDomain.origin, config.replacement.jsServerDomain.replace))
		.pipe(replace(config.replacement.jsClientDomain.origin, config.replacement.jsClientDomain.replace))
    .pipe(gulp.dest('build/'));
});

gulp.task('server', ['build'], function(){
	connect.server({
		root: 'build',
		port: 8888,
		livereload: true,
		middleware: function(connect, opt) {
            return [ historyApiFallback({}) ];
        }
    });
	
	//頁面綁上<script src="//localhost:35729/livereload.js"></script>
	//當檔案變更時可以觸發browser reload
	
	gulp.watch(config.buildPaths, function (file) {
		gulp.src(config.buildPaths, {base: '.'})
			.pipe(replace(config.replacement.jsServerDomain.origin, config.replacement.jsServerDomain.replace))
			.pipe(replace(config.replacement.jsClientDomain.origin, config.replacement.jsClientDomain.replace))
      .pipe(gulp.dest('build/'))
			.pipe(connect.reload());
	});

});

gulp.task('default', ['build', 'server']);




