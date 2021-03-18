#### 1.== 比较的规则
   1. number string boolean undefined这几种基本类型混合比较时，会将其转换成数字再进行比较。
   2. 基本类型和引用类型进行比较时，会先将引用类型转换成基本类型（依次调用valueof和tostring方法）再进行比较。undefined转换为数字时NaN；
   3. null 由于没有valueof与tostring方法，因此和除了undefined之外的其他任何类型值进行比较时始终返回false.
+ 数据类型检测
   1. typeof 
      + 除了null之外的基本类型都能正确的进行判断
      + 除了function之外其他的引用类型返回的都是object
<br/><br/>

#### 2.instanceof的实现： 原型链的向上查找
   ```
      function myInstance(left,right){
          if(typeof left !== 'object' || left === null) return false;
          let proto = Object.getProtoType(left);
          while(true){
              if(proto === null) return false;
              if(proto == right.proto) return true;
              proto = object.getPrototypeof(proto)
          }
      }
   ```
<br><br>

#### 3.数据类型转换的图
   1. Number()方法的强制转换规则
      + 如果是布尔值，true和false分别转换为1和0
      + 如果是数字，返回自身
      + 如果是null 返回0
      + 如果是undefined 返回NaN
      + 如果是字符串，遵循以下规则，只包含数字，则将其转换为十进制，如果包含有效的浮点数格式，将其转换为浮点数值，如果是空字符串，将其转换为0，如果不是以上格式的字符串，返回NaN
      + 如果是symbol， 抛出错误
      + 如果是对象，并且部署了[symbol.toPrimitive]，那么调用此方法，都则调用对象的valueOf方法，如果转换的结果是NaN，则调用对象的toString方法，再次依照前面的顺序转换返回对应的值。
   2. boolean方法的强制类型转换规则
      + 这个方法的规则是：除了undefined,null,false,'',0,NaN转换为false其他的都是true
   + 隐式类型转换
      + 凡是通过逻辑运算，位运算，关系运算，相等运算或者条件的操作，都会出现隐式类型转换。
      + '=='的隐式类型转换规则
         1. 如果类型相同，无需进行类型转换
         2. 如果其中一个操作值是null或者undefined,那么另外一个操作符必须是null或者undefined才会返回true，否则返回false
         3. 如果其中一个是Symbol类型，那么返回false
         4. 两个操作值为string或number类型，会转换为number
         5. 如果其中一个操作值是boolean，那么转换成number
         6. 如果一个是object，且两外一方式string,number,symbol。就会把object转换为基础类型再进行判断
      + '+'的隐式类型转换
         1. 当'+'号两边都是数字时，进行加法运算，如果两边都是字符串，则直接拼接。
         2. 如果其中一个是字符串，另一个是undefined,null,或者boolean则调用toString方法进行字符串的拼接。
         3. 如果其中一个是数字，另外一个是undefined,null,boolean则转换为数字在进行加法
         4. 如果一个是字符串，一个是数字，则按照字符串拼接
      + object的转换规则
         1. 如果有toprimitive方法，优先调用再返回
         2. 调用valueOf，如果转换为基本类型则返回
         3. 调用toString,如果转换为基本类型则返回
         4. 如果都没有返回基本类型，会报错。
![](media/data.png);
<br/>

#### 4.原型对象和构造函数
   1. 每当定义一个函数数据类型时，都会天生自带一个prototype属性，这个属性指向函数的原型对象。
   2. 当使用new调用函数，这个函数就成了构造函数，返回一个全新的实例对象，这个实例对象有一个__proto__属性，指向构造函数的原型对象。
<br/>

#### 5.js中实现继承
   1. 借助call<br/>
   缺点是当父类原型对象上有方法时那么子类无法继承。
   2. 原型链继承，但是这样和父类使用了同一个原型对象。
   3. 组合继承
   但是这个存在的问题是父类的构造函数执行了两次。
   优化：
   ```
     child.prototype = object.create(parent.prototype);
     child.prototype.constructor = child;
   ```
#### 6.防抖和节流
   浏览器的resize,scroll,keypress,mousemove等事件在触发时，会不断地调用绑定在事件上的回调函数，极大地浪费资源，降低前端性能。
   + 防抖：在短时间内多次触发同一个函数，只执行最后一次，或者只在开始时执行。
   ```
     function debounce(fn,delay){
        var timer = null;
        return function(){
           var context = this;
           var args = arguments;
           if(timer) clearTimeout*timer;
           if(immediate){
              var donow = !timer;
              timer = setTimeout(function(){
                 timer = null;
              },delay);
              if(doNow){
                 fn.call(context,args)
              }
           }else{
              timer = setTimeout(function(){
                 fn.apply(context,args);
              })
           }
        }
     }
   ```
   + 节流：类似于防抖，在一段时间内只允许函数执行一次。时间戳，相差事件在这个范围内的就不触发事件。
#### 7.图片懒加载
   + 图片懒加载在一些图片密集的网站运用较多，通过图片懒加载可以让一些不可视的图片不去加载，避免一次性加载过多的图片导致请求阻塞。
   + 传统的做法：
      1. 我们通过获取元素的getBoundingClientReact属性的值和页面的clientHeight进行对比，如果top值小于clientHeight则说明元素出现在可视区域了。
      2. 利用Intersection Obsserver来判断元素是否可见。上面的一种方法的一个缺点是我们还需要绑定scroll事件，伴随着大量的计算，会造成资源浪费。
#### 8.深拷贝和浅拷贝
   1. 数组的浅拷贝方法：
      + 数组的slice方法 arr.slice(0)
      + 数组的concat方法 arr.concat()
      + es6的扩展运算符
   2. 对象的浅拷贝方法：
      + for...in只复制一层
      + object.assign
      + ea6的对象扩展的方法
   3. 深拷贝
      + JSON.parse(JSON.stringfy());
      缺点：
         1. 会忽略undefined,会忽略symbol
         2. 不能序列化函数，不能拷贝函数。
         3. 不能解决循环引用的问题
         4. 不能处理正则 date set map等
         5. 会抛弃对象的constructor也就是深拷贝之后，不管这个对象原来的构造函数是什么，在深拷贝之后都会变成Object.
      ```
        function clone(target,map = new Weekmap()){
           if(typeof target === 'object){
              let cloneTarget = Array.isArray(target) ? [] : {};
              if(map.get(target)){
                 return map.get(target);
              }
              map.set(target,cloneTarget)
              for(const key in target){
                 cloneTarget[key] = clone(target[key]);
              }
              return clonetarget;
           }
           return target;
        }
      ``` 
      + 优化方案
         1. 我们可以使用while循环来代替for...in，效率比对 while>for>for...in;

#### 9. xss和csrf
   1. xss (cross site script),是指攻击者在网站上注入恶意的客户端代码，通过恶意的脚本对客户端网站进行篡改，从而在用户浏览网页时，对客户浏览器进行控制或者获取用户信息。
      + xss攻击可以分为3类：反射型，存储型，基于dom；
      1. 反射型：当用户点击恶意连接时，页面跳转到攻击者预先准备好的页面，攻击者可以注入任意的恶意脚本进行攻击，可以注入恶作剧脚本，或者注入能获取用户隐私数据的脚本。
      2. 存储型，把用户输入的数据存储在服务器端，当浏览器请求数据时，脚本从服务器上传回并执行。
      3. 基于dom 通过恶意的脚本修改页面的Dom结构
      + xss攻击的防范： 
         1. httponly 禁止页面的javascript访问带有httponly属性的cookie
         2. 检查输入，一般是检查用户输入的数据是否包含<,>等特殊的符号
         3. 输出检查，服务端的输出可以采用编码或者转义的方式
   2. csrf (cross site request forgery) 跨站请求伪造，是指攻击者借助受害者的cookie片区服务器的信任，可以在受害者毫不知情的情况下以受害者的名义伪造请求发送给受攻击服务器。
      + 防御措施
         1. 验证码：验证码被认为是对抗csrf攻击最简洁而有效的防御方法。
         2. refer 验证
         3. token验证
#### 10.symbol的特性
   1. symbol不能转化为字符串
   2. symbol.for(key) 全局的symbol，有则读取，没有就设置。symbol.keyfor在全局的symbol注册表中查找symbol的键，所以不适用于全局的symbol.
   3. 使用new运算符会报错。
   4. symbols在for...in迭代中不可枚举，Object.ksys也不能包含，Object.getOwnPropertyNames()不返回symbol 

   
#### 11.proxy和reflect
   + proxy：一个proxy对象包装另外一个对象并拦截诸如读取，写入属性和其他操作。
      + proxy是一种特殊的“奇异对象”,他没有自己的属性，如果handler为空，则透明地将操作转发给target.
      + 对于大多数操作，js规范中都有一个所谓的内部方法，proxy会拦截这些方法的调用。
      + set 对于array的内建方法依然有效，值通过push等方法添加元素的数组方法，就可以在其中添加 检查，因为在内部他们使用代理所拦截的[[set]]操作。对于写入操作，必须在成功时返回true;
      + for...in循环遍历所有带有enumerable标记的非symbol键，以计原型对象上的键。
   + Reflect
      + reflect 是一个内置对象，可简化proxy;以前的内置方法，不能直接调用，reflect对象使调用这些内部方法变成可能。
      + 对于每个可被proxy捕获的内部方法，reflect都有一个对应的方法reflect,其名称和参数和proxy钩子相同，因此我们可以很好的使用relect来将操作转发到原始对象。
   + proxy的局限性，对于map set date promise等使用了所谓的内部插槽，不通过[get][set]，所以proxy不能拦截。
   + 可取消的proxy 调用revoke会从代理中删除对目标对象的所有内部引用，因此不再连接他们，之后可以对目标对象进行垃圾回收。
#### 12.有关遍历的方法：
   1. for循环： 一般是用来遍历数组。
   2. for...in 可以用来遍历数组，对象属性，也能遍历原型链上的属性（最后遍历），可枚举的属性
   3. for..of 一般和for...in形成鲜明的对比，功能也和for...in类似，但是不能用来遍历对象，需要实现了iterator接口的对象才行。
   3. forEach 没有返回值，回调函数不能有break continue 遍历过程不一定会改变原数组的值。
   4. map 按照原始数组顺序一次处理元素，返回一个新数组。
      + map不会对空数组进行检测。
      + map不会改变原始数组
      + 每个元素都会执行相应的回调函数，必须要有返回值，否则结果为undefined
   5. filter 返回符合条件的元素组成的新数组
      + 不会对空数组进行检测
   6. find 返回满足条件的指定数组的第一个元素的值
      + 没有返回undefined
      + 不会对空数组进行处理
   7. findIndex
   8. some every
#### 13.cjs amd umd esm的区别
   + 最初，js没有导入导出模块的方法。他们都是试图给js添加模块的方法。
   1. cjs 是commonJs的缩写
      + cjs是同步导入的，它会给你一个导入对象的副本
      + cjs不能再浏览器工作，他必须经过转换和打包
      + 可以从node_modules中引入一个库或者从本地目录引入一个文件
   2. amd 代表异步模块定义，
      + amd没有cjs那么直观
   3. umd 通用模板定义（universal module definition）
   4. esm es模块
      + 很多现代浏览器可以使用
      + 具有cjs的简介语法，同时有amd的异步
      + 得益于es6的静态模块结构，可以进行tree-shaking
-------
#### 14.前端基础进阶学习笔记
   1. 内存空间详细图解
      + 在学习内存空间之前，我们需要对三种数据结构有一个直观的认知。他们分别是堆(heap)，栈(stack)与队列(queue)
         1. JavaScript的执行上下文的执行顺序借用了栈数据结构的存取方式
         2. 堆数据结构是一种树状结构。它的存取数据的方式，则与书架与书非常相似。
         3. 队列是一种先进先出（FIFO）的数据结构。正如排队过安检一样
      + 变量对象和基础数据类型
         + javascript的执行上下文生成之后，会创建一个叫做变量对象的特殊对象，javascript的基础数据类型往往都会保存在变量对象中。
         + 严格意义上来说，变量对象也是存放在你堆内存中。
      + js的引用类型数据的值是保存在堆内存中的对象。在操作对象时，实际上操作的是对应的引用而不是实际的对象。
      + javascript的内存生命周期
         1. 分配你需要的内存
         2. 使用分配到的内存
         3. 不需要时将其释放，归还
      + 在JavaScript中，最常用的是通过标记清除的算法来找到哪些对象是不再继续使用的
   2. 执行上下文
      + 每次当控制其转到可执行代码的时候，就会进入一个执行上下文。执行上下文可以理解为当前代码的执行环境，他会形成一个作用域。
      + javascript的运行环境大概包括三种情况：
         1. 全局环境
         2. 函数环境
         3. eval
      + 执行上下文可以理解为函数执行的环境，每一个函数执行时，都会给对应的函数创造这样一个执行环境。
      + 我们要对执行上下午文总结一些结论：
         1. 单线程
         2. 同步执行
         3. 全局上下文只有一个
         4. 函数执行上下文的个数没有限制
         5. 每次某个函数的调用，都会有新的执行上下文创建，即使是调用自身函数，也是如此。
      + 当前执行上下文包含：变量对象，作用域链，this
      
   3. 变量对象
      + 一个新的执行上下文的生命周期分为两个阶段：
         1. 创建阶段： 执行上下文会分别创建变量对象，建立作用域链，以及确定this指向。
         2. 代码执行阶段:完成变量赋值，函数引用，以及执行其他代码
      + 变量对象的创建，依次经历了以下几个过程
         1. 建立arguments对象：检查当前上下文中的参数，建立该对象下的属性与 属性值。
         2. 检查当前上下文的函数声明，也就是使用function关键字声明的函数
         3. 检查当前上下文中的变量声明，每找到一个变量声明，就在变量对象中以变量名建立一个属性，属性值为undefined
         + 在面试中用变量对象的创建过程跟面试官解释变量提升，简直逼格满满。
      + 未进入执行阶段之前，变量对象中的属性都不能访问！但是进入执行阶段之后，变量对象转变为了活动对象，里面的属性都能被访问了，然后开始进行执行阶段的操作。
      + 全局上下文的变量对象
         + 以浏览器中为例，全局对象为window。全局上下文有一个特殊的地方，它的变量对象，就是window对象。而这个特殊，在this指向上也同样适用，this也是指向window。
         + let const 因为完全没有赋值，即使变量提升了，我们也不能在赋值之前调用他。这就是我们常说的暂时性死区。
   4. 作用域和作用域链
      + 词法环境就是一套约定好的规则。我们写代码，应该按照这个规则来。因此，词法环境，在我们写代码的时候就已经确定了
      + 词法环境，其实就是作用域，有的人叫词法作用域等等
         + 在JavaScript中，我们可以将作用域定义为一套规则，这套规则用来管理JS引擎如何在当前作用域以及嵌套的子作用域中根据标识符名称进行变量查找。
      + 一个词法环境，由环境记录(Environment Records)与一个外部指向outer组成。
      + 作用域链，是由当前环境与上层环境的一系列变量对象组成，它保证了当前执行环境对符合访问权限的变量和函数的有序访问。
      + 很多人会误解为当前作用域与上层作用域为包含关系，但其实并不是。以最前端为起点，最末端为终点的单方向通道我认为是更加贴切的形容。
   5. 闭包
      + 闭包是一种特殊的对象。它由两部分组成。执行上下文(代号A)，以及在该执行上下文中创建的函数（代号B）。当B执行时，如果访问了A中变量对象中的值，那么闭包就会产生。
      + 
#### try...catch
   1. try...catch同步工作，如果在计划的代码发生异常，try...catch不会捕获到异常。为了捕获到计划的（scheduled）函数中的异常，那么 try..catch 必须在这个函数内
   ```
      setTimeout(function() {
         try {
            noSuchVariable; // try..catch 处理 error 了！
         } catch {
            alert( "error is caught here!" );
         }
         }, 1000);
   ```
#### 属相标识和属性描述符
   1. writable 
      + 如果为true 则值可以被修改，否则他只是可读的
      + 如果为false,只读，除非他们应用自己的defineProperty来覆盖我们的属性描述
   2. enumerable 
      + false 不会出现在for...in 循环中，也会被Object.keys排除
   3. configurable
      + 不可配置的属性不能被删除
      + 属性不可配置是一条单行道，我们无法使用defineProperty把它改回去
         1. 不能修改configurable标志
         2. 不能修改enumerable标志
         3. 不能将writable:false修改为true
         4. 不能修改访问者属性的set.get
         + false的作用是防止更改和删除属性标志，但是允许我们修改值
         + Object.preventExtensions(obj)
         禁止向对象添加新属性。
         + Object.seal(obj)
         禁止添加/删除属性。为所有现有的属性设置 configurable: false。
         + Object.freeze(obj)
         禁止添加/删除/更改属性。为所有现有的属性设置 configurable: false, writable: false。



