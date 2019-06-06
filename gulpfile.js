//引入gulp工具
const gulp = require('gulp')
      htmlmin = require('gulp-htmlmin'),
      sass = require('gulp-sass'),
      connect = require('gulp-connect'),
      babel = require('gulp-babel'),
      uglify = require('gulp-uglify'),
      cleanCss = require('gulp-clean-css')

//指定任务 第一个参数是任务名称 第二个参数就是这个任务要执行的代码
// gulp.task('a', ()=>{
//     console.log(123);
// })

//压缩html的任务
gulp.task('html', ()=>{
    gulp.src('src/**/*.html')// 读取文件 读取方式是文件流
        .pipe(htmlmin({
            removeComments: true,// 清除HTML注释
            collapseWhitespace: true,// 压缩HTML
            collapseBooleanAttributes: true,// 省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,// 删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,// 删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,// 删除<style>和<link>的type="text/css"
            minifyJS: true,// 压缩页面JS
            minifyCSS: true// 压缩页面CSS 
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
})
//编译scss
gulp.task('css', ()=>{
    gulp.src('src/css/**/*.scss')
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})
//开启服务器任务
gulp.task('server', ()=>{
    connect.server({
        root: 'dist',// 服务器的根路径
        livereload: true,// 自动刷新
        port: 2345
    })
})

// 只需要单纯移动的资源
gulp.task('move', ()=>{
    gulp.src('src/libs/**/*')
        .pipe(gulp.dest('dist/libs'))

    gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'))
  
})

// js任务 先es6转成es5 再压缩js
gulp.task('js', ()=>{
    gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))// 转es5
        .pipe(uglify())// 压缩
        .pipe(gulp.dest('dist/js'))// 移动
        .pipe(connect.reload())// 刷新
})
//监听文件的修改 自动执行对应的修改任务
gulp.task('watch', ()=>{
    // 第一个参数是监听改变的文件
    // 第二个是文件改变后要执行的任务
    gulp.watch('src/**/*.html', ['html'])
    gulp.watch('src/css/**/*.scss', ['css'])
    gulp.watch('src/js/**/*.js', ['js'])
})
// 默认执行任务
// 把需要执行的任务列表放进来 只需要输入gulp 所有任务就自动执行
gulp.task('default', ['html', 'css', 'js', 'server', 'move', 'watch'])