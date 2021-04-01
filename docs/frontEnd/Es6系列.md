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
