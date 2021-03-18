+ webpack文件监听的方式：
   1. 启动webpack时加上--watch
   2. 配置webpack.config.js的时候加上 watch:true
+ 文件监听的原理：
  轮询判断文件的最后修改时间是否发生变化

+ 热更新
   1. webpack-dev-server
   2. wds的优势是不用刷新页面，输出完成之后，文件放到内存中，没有进行磁盘io操作
   3. 热更新相关的几个重要的概念
      + webpack-compiler webpack的编译器，将javascript编译成bundle
      + HMR Server: 将热更新的文件输出给HMR Runtime
      + Bundle Server 提供文件在浏览器的访问，也就是我们平时能够正常通过localhost访问我们本地网站的原因。
      + HMR Runtime 开启热更新的话，在打包阶段会被注入到浏览器中的bundle.js这样bundle.js就可以跟服务器建立连接，通常使用websocket.
      + bundle.js 构建输出的文件。
   4. 热更新的过程：
      + 启动阶段： webpack经过webpack-compiler编译好之后传输给bundle server bundle server可以让浏览器访问到我们打包出来的文件。
      + 文件热更新阶段： 文件经过webpack compiler编译好传输给HMR Server HMR Server 知道哪个资源发生了改变，并通知HMR Runtime有哪些变化，HMR Runtime就会更新我们的代码，这样我们的浏览器就会更新并且不需要刷新。
   5. HMR Server和HMR Runtime通信：我们在创建compiler示例，可以往compiler.hooks.do
   + 原理
    使用到了webpack内置的HotModuleReplacementPlugin插件。

+ 文件指纹
   1. 文件指纹是文件打包后的文件名后缀。
   2. 文件指纹是如何产生的：
      + hash: 和整个项目的构建相关，只要项目文件有修改，整个项目构建的hash值就会更改。
      + chunkhash: 和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值。
      + contenthash: 根据文件内容来定义hash文件内容不变，contenthash不变
   3. js的文件指纹设置 设置oupput的filename
   4. css设置指纹： 设置minicssExtractPlugin的filename
   5. 图片的文件指纹设置： file-loder使用name:[hash:8]
+ 代码压缩：
   1. js文件的压缩：
    + webpack4里面内置了uglifyjs-webpack-plugin这个插件，mode是production的时候，我们默认打包出来的js文件是已经压缩。
   2. css文件的压缩： 使用optimize-css-webpack-plugin
   3. html文件的压缩： html-webpack-plgin这个插件设置一些压缩参数，minify参数。
+ tree shaking（摇树优化）：tree-shaking就是只把用到的方法打入到bundle，没有用到的方法会在uglify阶段被擦除掉。
   + 在webpack2中，你会发现tree shaking不起作用，因为babel会将代码编译成commonjs模块，而tree shaking不支持commonjs，所以需要配置不转义
   ```
      options: { presets: [ [ 'es2015', { modules: false } ] ] }

   ```
   + side effects 是指那些当import的时候会执行一些动作，但不一定会有任何export,比如polyfill
  1. 使用：webpack默认配置。在.babelrc里设置modules:false即可，要求必须是es6的语法，cjs的方法不支持。
  2. 原理
     + ES6模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是tree-shaking的基础
     + 在编译阶段，,tree-shaking知道哪些代码没有用到之后，会将其注释标记，然后再uglify阶段将其删除掉。
+ loader的作用，对模块的源代码进行转换，将不同的语言转化为js，或者将内联图片转换为dataurl。
+ plugin的作用 解决loader无法实现的其他事。
