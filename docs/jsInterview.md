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
![](../media/data.png);
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
#### 6.proxy和reflect
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
#### 7.有关遍历的方法：
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
#### cjs amd umd esm的区别
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

