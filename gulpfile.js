var fs = require('fs');
var gulp = require('gulp');

fs.readdirSync('./gulp').forEach(function(module){
  require('./gulp/' + module);
});

//GULP -- Command Line Maker
gulp.task('build', ['html:build', 'js:build']);
gulp.task('watch', ['html:watch', 'js:watch']);
gulp.task('default',['server', 'watch'], function(){
  console.log('Gulp Hit');
});
