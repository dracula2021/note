###### 防抖和节流
+ 防抖： 你尽管触发事件，但是我一定在事件触发n秒后才执行，如果你在一个事件触发的n秒内又触发这个事件，那我就以新的事件得时间为准，就是要等你触发事件n秒内不再触发事件，我才执行。
+ 防抖中要注意得几件事情
   + this指向
   + event对象
   + 是否需要立即执行
```
   function debounce(func,wait,immediate){
     var timeout;
     return function(){
        var context = this;
        var args = arguments;
        if(timeout){
          clearTimeout(timeout)
        }
        if(immediate){
          var canNow = !timeout;
          timeout = setTimeout(function(){
            timeout = null;
          },wait);
          if(canNow){
            fnc.apply(context,args);
          }
        }else{
          timeout = setTimeout(function(){
            func.apply(context,args)
          },wait)
        }
     }
   }
```
+ 节流：节流很简单，如果你持续出发事件，每隔一段时间，只执行一次事件
+ 实现的方式
   1. 使用时间戳
   ```
     function throttle(func,wait){
       var context,args;
       var previous = 0;
       return function(){
         var now = new Date();
         context = this;
         args = arguments;
         if(now - previous > wait){
           func.apply(context,args);
           previous = now;
         }
       }
     }
   ```
   2. 使用定时器
   ```
     function throttle(func,wait){
       var timeout;
       var args;
       return function(){
         context = this;
         args = arguments;
         if(!timeout){
           timeout = setTimeout(function(){
             timeout = null;
             func.apply(context,args)
           },wait)
         }
       }
     }
   ```
###### 数组去重
1. 双层循环
   + 外层是要遍历得数组，内层是新的数组
2. indexOf
3. 排序后去重
4. filter (里面使用indexOf或者排序好的)
5. Object键值对，这个我们直接使用键值的话，没有办法区分对象，数组类型，因为键智能是字符串 全部去重
```
  function unique(array){
    var obj = {};
    return array.filter(functioon(item,index,array){
      return obj.hasOwnProperty(typeOf item + JSON.stringfy(item)) ? false : (obj[typeof item + JSON.stringfy(item)] = true)
    })
  }
```
6. ES6 Array.from(new Set(array)) NaN去重
###### 数据类型判断
+ plainObject 
   + plainObject来自于jquery,可以翻译成纯粹的对象，就是通过{}或者new object创建的，该对象含有零个或者多个键值对
   + jquery认为一个没有原词那个的对象也是一个纯粹对象
+ window对象 window对象作为js的全局对象，他有一个window属性指向自身
+ isArrayLike 在jq中 数组和类数组都会返回true
  + 类数组要满足三个条件
     1. 是数组
     2. 长度为0
     3. length属性是大于0的数字类型，并且obj[length-1]必须存在
###### 浅拷贝
+ 数组的浅拷贝
   1. slice
   2. concat
+ 如果数组元素是基本类型，就会拷贝一份，互不影响，而如果是对象或者数组，就会只拷贝对象和数组的引用，这样无论在新旧数组进行修改，两者都会发生变化。我们把这种赋值引用的拷贝称之为浅拷贝。与之对应的是深拷贝，深拷贝就是指完全拷贝一个对象，即使嵌套了对象，两者也相互分离，修改一个对象的属性，也不会影响另外一个
+ 数组的深拷贝
```
 var shadowCopy = function(obj){
   if(typeof obj !== 'object') return;
   var newObj = obj instanceOf Array? [] : {};
   for(var key in obj){
     if(obj.hasOwnProperty(key)){
       newObj[key] = obj[key]
     }
   }
   return newObj;
 }
```
```
 var deepClone = function(obj){
   if(typeof obj !== 'object') return;
   var newObj = obj instanceOf Array? [] : {};
   for(var key in obj){
     if(obj.hasOwnProperty(key)){
       newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]): obj[key]
     }
   }
    retun newObj;
 }
```
+ extend的学习
   + extend用来合并两个或者更多对象内容到第一个对象中
###### 数组中的最大值和最小值
+ Math.max(),返回一组数中的最大值
+ 值得注意的是
   1. 如果有任一参数不能被转换为数值，结果为NaN
   2. 如果没有参数，则结果为-Infinity
+ 实现方法
   1. for循环遍历查找
   2. 排序
   3. reduce
   4. eval
   5. apply
   6. ...
###### 数组扁平化
1. 递归
```
  function flatten(arr){
    var result = [];
    for(var i = 0, len = arr.length; i < len; i++){
      if(Array.isArray(arr[i])){
        result.concat(flatten(arr[i]))
      }else{
        result.push(arr[i])
      }
    }
    return result;
  }
```
2. toString 
3. reduce
4. ...
###### 乱序问题
+ 我们会使用Math.random() - 0.5这样来对数据进行排序
   + 我们发现，元素为5的次数远远低于为1的次数，所以这个方案是有问题的
   + 这个方案的问题是sort排序的时候，当我们项少于10的时候，我们使用的是插入排序，插入排序乱序不彻底
+ 推荐的写法
```
  function shuffle(arr){
    for(let i = arr.length;i;i--){
      let j = Math.floor(Math.random()*i);
      [a[i-1],a[j]] = [a[j],a[i-1]];
    }
    return a;
  }
```
+ 递归条件
   + 构成递归需具备边界条件，当边界条件不满足时，递归前进，当边界条件满足时，递归返回。
   + 不能无限地调用本身，须有个出口，化简为非递归状况处理。

