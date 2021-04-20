###### 执行上下文栈
1. 可执行代码
   + 就三种：全局代码，函数代码。eval代码
2. 执行上下文
   + js引擎创建了执行上下文栈来管理执行上下文。
   + 当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。
3. 对于每个执行上下文，都有三个重要属性
   + 变量对象
   + 作用域链
   + this
###### 变量对象
+ 变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。
+ 全局执行上下文
   + 全局对象，全局对象是预定义的对象，作为js的全局函数和全局属性的占位符。通过使用全局对象，可以访问所有其他预定义的对象函数和属性。
   + 可以用this引用全局对象。
   1. 可以使用this引用
   2. 全局对象是由Object构造函数实例化的一个对象
   3. 预定义了一堆的函数和属性
   4. 作为全局变量的宿主
+ 函数上下文
   + 在函数中，我们用活动对象来表示变量对象
   + 变量对象不可在js环境中访问，只有当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫activation object，只有被激活的对象，上面的属性才能被访问。
+ 执行过程
   1. 进入执行上下文
      + 变量对象包括
         1. 函数的所有形参
            + 由名称和对应值组成的一个变量对象的属性被创建
            + 没有实参时，属性值为undefined
         2. 函数声明
            + 由名称和对应值组成一个变量对象的属性被创建
            + 如果变量对象已经存在相同名称的属性，则完全替换这个属性
         3. 变量声明
            + 由名称和对应值（undefined)组成一个变量对象的属性被创建
            + 如果变量名称跟已经声明的形式参数或者函数相同，则变量声明不会干扰已经存在的这些属性
   2. 代码执行
###### 作用域链
+ 当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级执行上下文的变量对象中查找，一直找到全局下下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。
+ 函数创建
   + 函数的作用域，在函数定义的时候就决定了
      + 函数有一个内部属性[[scope]]，当函数创建的时候，就会保存所有父级变量对象到其中，但是[[scope]]并不代表完整的作用域链
      + 函数激活，当函数激活时，进入函数上下文，就会将活动对象添加到作用域链的前端。
+ 捋一捋
   1. checkscope函数被创建，保存作用域链到内部属性[[scope]]
   2. 执行checkscope函数，创建checkscope函数执行上下文，checkscope函数执行上下文被压入执行上下文栈
   3. checkscope函数不会立即执行，先复制函数[[scope]]属性创建作用域链
   4. 第二步，用arguments创建活动对象，随后初始化活动对象，加入形参，函数声明，变量声明
   5. 第三步，将活动对象压入checkscope作用域链顶端
   6. 准备工作做完了，开始执行函数，随着函数的执行，修改AO的属性值
###### this
   + Reference
      + reference是一个specification type也就是“只存在于规范里的抽象类型”。他们是为了更好地描述语言的底层行为逻辑才存在的，但并不存在于实际的js代码中
      + reference有三个组成部分
         1. base value
            + base value就是属性所在的对象或者environmentRecord
            + getBase返回reference的base value
            + isPropertyReference 如果base value是一个对象，就返回true
         2. referenced name
         3. strict reference
      + Getvalue 返回的将是具体的值，而不是一个reference
      + 如何确定this的值
         1. 计算memberExperssion的结果赋值给ref
            + 简单的理解MemberExpression其实就是()左边的部分
         2. 判断ref是不是一个reference类型
            + 如果ref是reference,并且isPropertyReference(ref)是true，那么this的值就是getBase(ref)；
            + 如果ref是reference，并且base value值是environment record，那么this的值为implicitthisValue(ref);
            + 如果ref不是reference,那么this的值为undefined
###### 闭包
   1. MDN对闭包的定义：闭包是指那些能够访问自由变量的函数
      + 自由变量：自由变量是指在函数中使用的，但是既不是函数的参数也不是函数的局部变量的变量。
   2. 实践角度：
      + 即使创建它的上下文已经销毁，它任然存在
      + 在代码中引用了自由变量
###### 参数按值传递
+ 所有函数的参数都是按值传递的，按值传递，是指把函数外部的值赋值给函数内部的参数，就是把值从一个变量复制到另外一个变量一样
+ 按引用传递：当值是一个复杂的数据结构的时候，拷贝就会产生性能上的问题，所以另外一种传递方式叫做按引用传递。传递对象的引用。
+ 按共享传递： 在传递对象的时候，传递的对象的引用副本。拷贝副本也是一种值得拷贝，所以高程中也直接认为是按值传递。
###### call apply的模拟实现
+ call()方法在使用一个指定的this值和若干指定的参数值的前提下调用某个函数或方法
+ 有以下几个注意点：
   1. 可以传递参数，参数是不定长的
   2. this可以是null,null的时候指向window
   3. 函数是可以有返回值的
   ```
      Function.prototype.call = function(context){
         var context = context || window;
         context.fn = this;
         var args = [];
         for(var i = 1; i < argumrnts.length; i++){
            args.push('arguments['+i+']');
         };
         var result = eval('context.fn('+args+')');
         delete context.fn
      }
   ```
   apply的实现
   ```
     Function.prototype.apply = function(context,arr){
        context = context || window;
        var result;
        if(arr){
           var args = [];
           for(var i = 0; i< arr.length;i++){
              args.push('arguments['+ i + ']');
              result = eval('context.fn('+ args +')')
           }
        }else{
           result = cpnttext.fn();
        }
        delete context.fn;
        return result;
     }
   ```
###### bind;
   + bind()方法会创建一个新函数。当这个新函数被调用时，bind()的第一个参数将作为它运行时的this,
   + 之后的一系列参数将会在传递的实参前传入作为他的参数。
   ```
     Function.prototype.bind = function(context){
        var self = this;
        var args = Array.prototype.slice.call(arguments,1);
        return function(){
           var bindArgs = Array.prototype.slice.call(arguments)
           return self.apply(context,args.concat(bindArgs))
        }
     }
   ```
   + 一个绑定函数也可以使用new操作符创建对象，提供的this值被忽略，同时调用时的参数被提供给模拟函数。
   + 会直接修改绑定函数的prototype
   ```
     Function.prototype.bind = function(context){
        var self = this;
        var args = Array.prototype.slice.call(arguments,1);
        var fNop = function(){};
        var fBound = function(){
           var bindArgs = Array.prototype.slica.call(argumrnt);
           return self.aplly(this instanceof fBound ? this : context,args.concat(bindArgs))
        }
        fNop.prototype = this.protoType;
        fBound.prototype = new fNop()
        return fBound;
     }
   ```
###### new 的实现
+ new运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一
```
  function objectFactory(){
    var obj = new Object();
    var Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var res = Construtor.apply(obj,arguments);
    return typeof res === 'object'? res : obj;
  }
``` 
###### 类数组对象
+ 类数组：拥有一个length属性和若干索引属性的对象
+ 类数组转数组的方法：
   1. slice.call
   2. splice.call
   3. Array.from
   4. ...
+ Arguments对象
   + 除了类数组的索引属性和length属性外，还有一个callee属性。
   + length属性表示实参的长度
   + callee 通过它可以调用函数自身
   + 注意事项：
      1. 传入参数时，实参和arguments的值会共享，没有传入时，实参和arguments值不会共享，
      2. 在严格模式下，实参和arguments的值不会共享
###### 创建对象的方式
1. 工厂模式
   + 对象无法识别，因为所有的实例都指向一个原型
2. 构造函数模式
3. 原型模式
   + 优点：方法不会被重新创建
   + 缺点：所有的属性和方法都共享，不能初始化参数
4. 组合模式
   + 有点，该共享的共享，该私有的私有，使用最广泛的方式
   + 缺点：封装性不好
   + 动态原型模式：不能用对象字面量重写原型
5. 寄生构造函数： 寄生在构造函数中的一种方法，
###### 继承的多种方式和优缺点
1. 原型链继承
```
  Child.prototype = new Parent()
```
+ 问题：
   1. 引用类型的属性被所有实例共享
   2. 在创建child的时候，不能向parent传参
2. 借用构造函数
```
  function Child(){
     Parent.call(this)
  }
```
   + 优点：
      1. 避免了引用类型的属性被所有实例共享
      2. 可以在Child中向Parent传参
   + 缺点
      + 方法都在构造函数中定义，每次创建实例都会创建一遍方法
3. 组合继承
   + 原型链继承和经典继承双剑合璧
   ```
     function Child(name,age){
        Parent.call(this,name);
        this.age = age
     }
     Child.prototype = new Parent()
   ```
   + 优点：融合原型链继承和构造函数继承的优点
4. 原型式继承
   + 就是使用ES5 Object.create的模拟实现，将传入的对象作为创建的对象的原型
   ```
     function creatObj(o){
        functionF(){};
        F.prototype = o;
        return new F()
     }
   ```
   + 缺点：
      + 包含引用类型的属性值始终都会共享相应的值
5. 寄生式继承
6. 寄生组合式继承
   + 组合继承的最大的缺点是会调用两次父构造函数
   ```
     function prototype(Child,Parent){
        var prototype = object(Parent.prototype);
        prototype.Constructor = Child;
        Child.prototype = prototype;
     }
   ```
###### 事件队列
+ 单线程意味着js代码在执行的任何时候，都只有一个主线程来处理所有的任务
+ 非阻塞则是当代码需要进行一项异步任务的时候，主线程会挂起这个任务，然后再异步任务返回结果的时候再根据一定规则去执行相应回调
+ js是单线程的，一次只能执行一个方法，于是这些方法被排列再一个单独的地方，这个地方就是执行栈。
+ 当一个脚本第一次执行的时候，js引擎会解析这段代码，并将其中同步的代码执行顺序加入执行栈中，
+ js引擎遇到一个异步事件后并不会一直等待结果，而是会将这个事件挂起，继续执行执行栈中的其他任务，当一个异步事件返回结果后，js会将这个事件加入与当前执行栈不同的另一个队列，我们称之为事件队列。被放入事件队列不会立刻执行其回调，而是等待当前执行栈中的所有任务都执行完毕， 主线程处于闲置状态时，主线程会去查找事件队列是否有任务。如果有，那么主线程会从中取出排在第一位的事件，并把这个事件对应的回调放入执行栈中，然后执行其中的同步代码...，如此反复，这样就形成了一个无限的循环。这就是这个过程被称为“事件循环（Event Loop）”的原因。
+ macro task与micro task
   + 因此他们的执行优先级也有区别。不同的异步任务被分为两类：微任务（micro task）和宏任务（macro task）
   + 宏任务：
      1. setInterval
      2. setTimeout
   + 微任务
      1. new promise
      2. new mutationObserver
   + 当当前执行栈执行完毕时会立刻先处理所有微任务队列中的事件，然后再去宏任务队列中取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行。
+ node环境下的事件队列
   + node中有一套自己的模型
   + node事件循环的顺序
      + 外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->I/O事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)-->轮询阶段...
      + timers：这个阶段执行定时器队列中的回调如setTimeout和setInterval
      + IO 这个阶段执行几乎所有的回调，但是不包括close事件，定时器和setImmediate
      + idle prepare：这个阶段仅在内部使用，可以不必理会
      + poll：等待新的io事件，node在一些特殊情况下会阻塞在这里
      + check: setImmediate的回调在这个阶段执行
      + close callbacks close事件的回调
###### 类型转换
+ 6种值转换成false 其他的都是true
   + NaN +0 -0 "" undefined null
+ toNumber 
   1. undefined NaN
   2. null +0
   3. true 1 false 0
   4. 字符串不是数字，NaN
      + parseInt 直解析整数
      + parseFloat 解析整数和浮点数
      + 他们会跳过任意数量的前导空格，尽可能解析更多数值字符，如果第一个非空字符是非法的数字字面量，将返回NaN
+ 原始值转字符串
   1. nll undefined true false 
   2. Number
+ 对象转布尔
   + 所有的对象都为true
+ 对象转字符串和数字
   + 所有的对象除了null和undefined之外的任何值都具有tostring方法，通常情况下，他和使用string方法返回的结果一直。tostring方法的作用在于返回一个反映这个对象的字符串。
      1. 数组的tostring方法将每个数组元素转换成一个字符串，并在元素之间添加逗号后合并成结果字符串
      2. 函数的tostring方法返回源代码字符串
      3. 日期的toString方法返回一个可读的日期和时间字符串
      4. regExp返回正则表达式直接量的字符串
   + valueOf方法 默认的valueof方法返回这个对象本身
   + 我们总结一下，当我们调用一个ToPremitive方法，将其转化为基本类型，然后再参照“原始值转字符”对应表进行转换
   1. 对象转字符串
      + primValue = ToPrimitive(input,string),返回ToString(primValue);
   2. 对象转数字
      + primValue = ToPrimitive(input,Number),返回ToNumber(primvalue)
+ JSON.stringfy
   + JSON.stringfy()方法可以将一个js值转换为一个JSON字符串，实际上也是调用toString方法，也算是一种类型转换的方法。
      1. 处理基本类型时，与使用toString基本相同，结果都是字符串，除了undefined
      2. 布尔值，数字，字符串的包装对象在序列号的过程中会自动转换成对应的原始值
      3. undefined 任意的函数已经symbol值，在序列化的过程中会忽略(出现在非数组对象属性中)或者被转换成null(出现在数组中时)
      4. 如果一个被序列化的对象拥有toJson方法，那么该方法就会覆盖该对象默认的序列化行为，不是那个对象被序列化，而是调用toJson方法后的返回值被序列化
+ 常见的隐士类型转换
   1. 一元操作符+ 会调用ToNumber处理该值，相当于Number();
   2. 二元操作符
      + 先把对应的值转化为基本类型
      + 如果有一个值时字符串，就返回字符串类型
      + 返回number的
###### cookie相关的补充
  + experies
     + 当expires属性缺损时，表示是会话cookie，当为会话cookie的时候，值保存在内存中，关闭浏览器时失效。
     + max-age 可以为正数 负数 0
        1. 正数持久化在浏览器中
        2. 0代表会删除这个cookie
        3. 负数代表cookie只是一个会话性的cookie
     + 当expires和cookie同时出现时，浏览器会优先采用max-age计算失效期
     + domain 
     + path  domain和path标识共同定义了cookie的作用域
     + secure属性 标记为secure的cookie只应通过被https协议加密过的请求发送给服务器。
     + httponly
     + samesite SameSite 属性可以让 Cookie 在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）。
        1. strict仅允许一方携带cookie url必须完全一致
        2. lax允许部分第三方携带cookie
        3. none无论是否跨站都会发送cookie




   