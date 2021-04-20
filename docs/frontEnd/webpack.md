#### webpack的一些基础知识
   + webpack默认只知道如何处理js和json模块，其他格式的处理，和处理方式需要loader。
   + 常见loader的使用和原理：
      1. file-loader处理静态资源模块，原理是将打包入口中识别出的资源模块，移动到输出目录，并且返回一个地址名称。当我们需要模块，仅仅是从源代码逻到打包目录，就可以使用file-loader来处理。
      2. url-loader内部使用了file-loader，所以可以处理file-loader所有的事情，但是遇到jpg格式的模块，会把图片转换成base64格式字符串，打包到js里。对小体积的图片比较合适，大图片不合适。
      3. css-loader 分析css模块之间的关系，合并成一个css
      4. style-loader 会把css-loader生产的内容，以style挂在到页面的head部分
   + plugins
      + plugin可以在webpack运行到某个阶段的时候，帮你做一些事情，类似于生命周期的概念
      + htmlwebpackPlugin会在打包结束后，生成一个html文件，冰雹打包生成的js模块引入到该html中。
      + clean-webpack-plugin
      + mini-css-extract-plugin
   + sourceMap : 源代码与打包后的代码的映射关系
      1. 默认是开启的，关闭的话，在配置文件中：devtool:none
      2. 推荐配置
         devtool:"cheap-module-eval-source-map",// 开发环境配置
         devtool:"cheap-module-source-map", // 线上⽣生成配置
   + webpackDevServer
      1. devserver把打包后的模块不会放在dist目录下，二十放到内存中，从而提升速度
      2. 
     
+ webpack文件监听的方式：
   1. 启动webpack时加上--watch
   2. 配置webpack.config.js的时候加上 watch:true
+ 文件监听的原理：
  轮询判断文件的最后修改时间是否发生变化
+ webpack设置mode可以自动触发webpack内置的函数，达到优化的效果。
   1. 开发阶段开启会有利于热更新的处理，识别哪个模块变化
   2. 生产阶段的开启会有帮助模块压缩，处理副作用等一些功能。
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
+ splitChunkPlugin： webpack4给我们带来了一些变化，引入了人splitChunkPlugin，并淘汰了之前的commonsChunkPlugin。
   1. 代码分离允许你吧代码拆分到多个文件中，如果使用得当，你的性能会提高很多，因为浏览器能缓存你的代码。
   2. 由于有了splitChunksPlugin，你可以把应用中的特定部分移至不同文件。如果一个模块不止一个chunk中被使用，那么利用代码分离，该模块就可以在他们之间很好的被共享。
   3. splitChunks有一个最小空间30kb的设置，当比这个小的模块被引用的时候，不会北大报道单独的分离文件，在真实环境下，这是一件耗时，因为这样不会带来实质性的性能提升，反而会强制浏览器为分离出的文件再发一次额外的请求。
![webpack面试](https://juejin.cn/post/6943468761575849992)
###### 学习笔记
+ webpack的作用
   1. 模块打包。可以将不同模块的文件打包整合在一起。并且保证他们之间的正确引用
   2. 编译兼容。loader对兼容性做了处理。
   3. 能力扩展。webpack的plugin机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现按需加载，代码压缩等一系列的功能。
+ 模块化打包的原理

###### webpack的搭建（项目实战）
![链接](https://blog.csdn.net/weixin_41900457/article/details/106792154?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-5&spm=1001.2101.3001.4242)
1. npm init
2. 安装 webpack webpack-cli webpack-dev-server
3. 在根目录构建 webpack.config.js 文件用于配置webpack
4. 出现的问题和解决的方法
   1. 重新执行打包，会发现之前的打包文件还存在，这样就会导致我们的dist文件夹会包含很多之前打包的跟当前代码无关的文件，这样其实对我们的项目并不友好
      + clean-webpack-plugin 插件可以帮助我们实现这个需求
   2. jsx es6的语法，在低版本的浏览器不兼容，我们需要配置babbel来实现低版本浏览器的兼容
      + babel-loader  @babel/preset-env @babel/preset-polyfill
      (Babel默认只转换新的JavaScript语法，但是不转换新的API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如Object.assign ）都不会转码。而@babel/preset-polyfill可以转码。) 
   3.  html-webpack-plugin
   4.  less-loader style-loader postcss-loader css-loader autoprefixer
+ 生产环境的配置与开发环境的配置有很多的不同点，所以我们需要分别建对应的配置文件，在根目录下分别创建 webpack.prod.js（生产配置） 与webpack.dev.js（开发配置）
+ 配合webpack的打包可以让我们实现实时更新，实时显示，不需要手动触发npm run dev命令来进行刷新 webpack-dev-server --open --config webpack.dev.js
+ 然后在plugin中添加 new webpack.HotModuleReplacementPlugin()即可解决部分依赖刷新不及时的问题
+ 我们就需要进行代码的压缩混淆，减少代码体积，先对js进行代码压缩，这里我们需要引用插件 terser-webpack-plugin
+ 我们可以观察到之前打包出来的文件其实是没有css文件的，因为webpack把所有的文件都打到一个文件里面了，所以我们没办法看到它，这其实对最后的生成的项目并不友好，所以我们先要在打包中将css抽离出来，这里我们就需要一个新的包 mini-css-extract-plugin
+ webpack-merge


