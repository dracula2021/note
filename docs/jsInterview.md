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
#### symbol的特性
   1. symbol不能转化为字符串
   2. symbol.for(key) 全局的symbol，有则读取，没有就设置。symbol.keyfor在全局的symbol注册表中查找symbol的键，所以不适用于全局的symbol.
   3. 使用new运算符会报错。
   4. symbols在for...in迭代中不可枚举，Object.ksys也不能包含，Object.getOwnPropertyNames()不返回symbol 

   
