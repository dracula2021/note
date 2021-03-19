#### css相关的知识
- [css面试相关](https://juejin.cn/post/6876625311988088840)
+ 学习笔记
   1. css盒模型
      + css盒模型分为 content、padding、border、margin四部分，又有两种盒模型，通过 box-sizing 切换
   2. 伪类和伪元素的区别
      + 其中伪类用单冒号表示，当元素处于某种状态时，为该元素添加样式，如 a 标签的 hover；
      + 伪元素用双冒号表示，为了兼容老浏览器，有时候也会用单冒号表示，作用是创建不在文本流中的元素，并为其添加样式，如 ::before，在指定元素前添加元素
   3. BFC
      + BFC的中文名称是块级格式化上下文，具有BFC特性的元素可以看出一个独立的隔离容器，里面的元素不会影响外面的于啊啊怒视。
      + 什么时候需要用到BFC
         1. 父子元素margin重叠问题
         2. 相邻元素垂直外边距折叠问题
         3. 浮动元素造成父元素高度塌陷问题
         4. 浮动元素和不浮动元素界限不清，重叠
      + 触发BFC的方式
         1. 根元素
         2. 浮动元素
         3. 绝对定位的元素(position为absolute或fixed)
         4. display inline-block/table-cell/flex
         5. overflow不为visible的值