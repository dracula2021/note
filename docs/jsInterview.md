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
