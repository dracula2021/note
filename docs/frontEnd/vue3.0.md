#### 为什么要升级vue3
   + vue2.x中当我们要实现某个需求的时候，就要在data,methods,computed以及mounted中反复跳转。不够清晰，代码的可读性和可维护性都不高。
   + vue3.x就推出了component Api,将零散分布的逻辑组合在一起来维护，并且还可以将单独的功能逻辑分成单独的文件。
###### setup的时机
   + setUp的时机是早于beforeCreate
   + setUP的参数 props context
       + props
          1. 由于props是响应式的，会及时本更新，所以不可以使用解构，解构会消除他的响应式。
       + context
          + context中提供了三个属性 attrs slot emit这三个属性都是自动同步最新的值。
###### reactive ref  toRefs
   + ref既可以处理对象类型也可以处理基础类型
   + reactive不能代理基本类型
   + toRefs用于将一个reactive对象转化为属性全部为ref对象的普通对象
![生命周期](../media/life.png)
