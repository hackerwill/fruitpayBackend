/**
npm install -g gulp gulp-live-server 
npm link gulp gulp-live-server 
**/
var gulp = require('gulp');
var gls = require('gulp-live-server');


gulp.task('server', function(){
	var server = gls.static('src/main/webapp',8888);	//他會自己去找到對應的webapp底下的index.html
	server.start();
	//頁面綁上<script src="//localhost:35729/livereload.js"></script>
	//當檔案變更時可以觸發browser reload
	gulp.watch('src/main/webapp/**/*.*', function (file) {
		server.notify.apply(server, [file]);
	});
});



