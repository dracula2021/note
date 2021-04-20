###### 块级作用域
+ 块级作用域存在于
   + 函数内部
   + 块中
+ let和const
   + 块级声明用于声明在指定块的作用域之外无法访问的变量
   + let const的特点
      1. 不会被提升
      2. 重复声明报错
      3. 不绑定全局作用域
   + 区别
      + const用于声明变量，其值一旦被设定就不能再被修改，否则会报错
+ 临时死区
   + let和const 再声明之前访问这些变量，会导致报错，只有执行变量声明语句后，变量才会从TDZ中移出
+ 在for循环中的let 相当于在圆括号中建立了一个隐藏的作用域，每次迭代的时候都创建一个新变量，并以之前迭代中同名变量的值将其初始化。
###### 模板字符串
+ 如果你要再字符串中使用反撇号，你可以使用反斜杠转义
+ 在模板字符串中，空格，缩进，换行都会被保留
+ ${} 任意的js表达式都可，大括号中的值不是字符串时，会将其转化为字符串
###### 箭头函数
+ 箭头函数和普通函数
    1. 没有this 需要通过查找作用域链来确定this值，也不能通过call apply bind这些方法改变this指向
    2. 没有arguments 可以通过命名参数或者rest参数的形式访问参数
    3. 不能通过new关键字调用 没有new.target 没有原型 没有super
###### symbol类型
1. symbol值通过symbol函数生成，使用typeof，结果为‘symbol'
2. symbol前面不能加new 否则会报错
3. instanceof的结果会报错
4. symbol可以接受一个字符串作为参数，表示对symbol实例的描述
5. 如果的参数是一个对象，就会调用该对象的toString 方法，将其转化为字符串，然后才生成symbol值
6. symbol函数的参数只是表示当前symbol值的描述，相同参数的symbol函数的返回值是不相等的
7. symbol值不能和其它类型的值进行运算
8. symbol值可以显式得转化为字符串
9. symbol值可以作为标识符，用于对象的属性名，可以保证不会出现相同名的属性
10. symbol值作为属性名，不会穿现在for...in for...of循环中，也不会被Object.keys object.getOwnPropertyNames JSON.stringfy返回。有一个Object.getOwnPropertySymbols方法
11. symbol.for 建立一个全局的symbol
12. symbol.keyfor方法返回一个已登记的symbol类型的key
###### for...of
+ 迭代器
   + 所谓迭代器，就是一个具有next方法的对象，每次调用next都会返回一个结果对象，该结果对象有两个属性，value表示当前值，done表示遍历是否结束
+ es6规定，默认的iterator接口部署在数据结构的symbol.iterator属性，或者说，一个数据结构只要具有symbol.iterator属性，就认为是可遍历的。如果我们使用for...of遍历一个对象，会报错，然而如果我们给该对象添加symbol.iterator属性。
+ 有一些数据结构默认部署了Symbol.iterator属性，所以for...of循环可以使用范围包括
   + 数组  set map  类数组 generator对象 字符串
+ 内建迭代器
   + entries 返回一个遍历器对象
   + keys
   + values
   + 在for...of循环中，如果没有显示指定则使用默认迭代器，数组和set集合的默认迭代器是values map集合的默认迭代器是entries
###### set
+ 类似于数组，但是成员的值都是唯一的，没有重复的值。
+ 属性和方法：
   + add  delete has clear
+ set会对NaN进行特殊的处理，通过value!== value判定这个值是NaN
```
   function Set(data){
      this._values = [];
      this.size = 0;
      forof(data,item => {
         this.add(item)
      })
   }
```
###### Weakmap
1. weakmap只接受对象作为键名
2. weakmap的键名所引用的对象是弱引用，翻译过来就是weakmap保持着对键名所引用对象的弱引用
+ 在计算机中，弱引用与强引用是相对的，是指不能保证其引用的对象不会被垃圾回收器回收的引用。
###### promise
+ 回调地狱的问题
   1. 难以复用 
   2. 堆栈信息被断开（在异步回调函数中，会将回调函数加入任务队列中，代码继续执行，直至主线程完成后，才会从任务队列中选择已经完成的任务，将其加入栈中，此时栈中只有这一个执行上下文，如果回调报错，也无法获取调用该异步操作时的栈中的信息，不容易判定哪里出现了错误）
   3. 借助外层变量 
      + 遍历读取文件时，无法预期完成顺序，必须借助外层作用域的变量，不仅写起来麻烦，而且容易造成错误操作
+ promise的局限性
   1. 错误被吃掉
   + Promise链中的错误很容易被忽略，所以要在promise链的最后添加一个catch函数，因为对于一个没有错误处理函数的promise链，任何错误都会在链中被传播下去。
   2. 单一值
   3. 无法取消
   4. 无法得知pending状态
###### 模块加载系列
+ 模块加载方案
   1. AMD
   2. CMD
   3. CommonJs
   4. ES6模块
+ require.js
   + requirejs为全局添加了define函数，你只要按照这种约定的方式书写这个模块即可。
+ AMD
   + amd实在requirejs在推广过程中对模块定义的规范化产出
+ sea.js
   + module.exports
+ CMD
   + 和amd一样 cmd其实就是seajs在推广过程中对模块定义的规范化输出
+ AMD和CMD的区别
   1. amd推崇依赖前置，cmd推崇依赖接近
   2. 对于依赖的模块 amd是提前执行，cmd是延迟执行
+ CommonJS
   + 和seajs很像
   + amd和cmd都是用于浏览器端的模块规范，而在服务器端比如node，采用的则是commonJs规范
+ commonjs规范加载模块是同步的，加载完成才能进行后面的操作，amd规范则是非同步加载的，允许指定的回调函数。浏览器加载速度较慢，一般采用amd规范，服务端速度较快，可以采用commonjs规范
+ ES6模块
   + 浏览器加载es6模块，也使用script标签，但是要加入type="module"属性
   + es6和commonJs的区别
      1. commonjs模块输出的是一个值的拷贝，es6模块输出的是值得引用
      2. commonjs模块是运行时加载，es6模块时编译时输出接口（ES6模块不是对象，他的对外接口只是一种静态定义，在代码静态解析阶段就会生成）
      3. ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
+ babel
   + babel只是把es6模块语法转换成了commonJs模块语法，然而浏览器是不支持这种模块语法的，所以直接跑在浏览器会报错，


###### class
+ 类的内部所有的方法，都是不可枚举的
+ 类必须使用new调用，否则会报错。


