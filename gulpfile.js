/**
npm install -g gulp gulp-live-server 
npm link gulp gulp-live-server 
**/
var gulp = require('gulp');
var gls = require('gulp-live-server');
var minimist = require("minimist");
var replace = require("gulp-replace");

var options = minimist(process.argv.slice(2), { boolean: "prod" });
var config = {
	buildPaths : [
		'index.html',
		'app/**'
	],
	replacement : {
		jsServerDomain : {
			path : "app/app.module.js",
			dest : "build/app/",
			origin : "${GULP_SERVER_DOMAIN}",
			replace : options.prod ? "http://beta.fruitpay.com.tw/fruitpay/" : "http://localhost:8081/fruitpay/"
		}
	}
};

gulp.task('build', function() {
	return gulp.src(config.buildPaths, {base: '.'})
		.pipe(replace(config.replacement.jsServerDomain.origin, config.replacement.jsServerDomain.replace))
		.pipe(gulp.dest('build/'));
});

gulp.task('server', ['build'], function(){
	var server = gls.static('build/',8888);	//他會自己去找到對應的webapp底下的index.html
	server.start();
	//頁面綁上<script src="//localhost:35729/livereload.js"></script>
	//當檔案變更時可以觸發browser reload
	gulp.watch('build/**/*.*', ['build'], function (file) {
		server.notify.apply(server, [file]);
	});
});

gulp.task('default', ['build', 'server']);




