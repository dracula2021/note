### vue相关的面试题
#### 1.vuex
    1. vueX的运行机制：vuex的state作为一个仓库，提供数据驱动vue component渲染，视图通过dispatch派发actions，acions中可以进行一些异步操作，actions或者视图通过commit提交给mutation，mutation去改变state.
    2.源码分析： vuex其实是vue.js的一个插件，插件需要提供一个install方法，install方法调用会将vue作为参数传入。会在全局混入一个beforeCreate钩子函数，把实例化的store保存到所有组建的this.$store中。  
#### 2.vue响应式原理<br>
   vue2.0响应式实现的核心就是es5的object.defineProperty劫持data props各个属性的getter,getter做依赖收集，setter派发更新。整体就是一个数据劫持+发布订阅者的模式。
   1. vue初始化阶段，遍历data,props，调用object.defineproperty给每个属性加上getter,setter
   2. 每个组件，每个computed都会实例化一个watcher.订阅渲染，计算使用到的所有的data/props/computed,一旦数据发生变化，setter被调用，会通知渲染watcher重新计算，更新组件。
#### 3.vue性能提升的九个技巧
   1. 函数式组件：函数式组件和普通对象类型的组件不同，他不会被看做成一个真正的组件。我们知道在patch的过程中，如果遇到一个组件式是vnode，会递归执行子组件初始化过程；而函数式组件的render生成普通的vnode，不会有递归子组件的过程，因此渲染开销会低很多。
   2. component spliting 由于vue的更新是组件粒度的，虽然每一帧都通过数据修改导致了父组件的重新渲染，但是子组件却不会重新渲染，因为他的内部没有任何的响应式数据的变化。但是如果只是子组件执行一个方法，我建议使用计算属性，计算属性自身缓存特性，耗时的逻辑也只会在第一次渲染的时候执行，而且使用计算属性也没有额外的渲染子组件的开销。
   3. local variables 优化前的组件多次在计算过程中访问this.base,而优化后采用局部变量base缓存this.base。你每次访问this.base的时候，由于this.base式一个响应式对象，所有会触发他的getter,进而会执行依赖收集等相关的操作。
   4. reuse Dom with v-show 对于v-if渲染的节点，由于新旧节点vnode不一致，在核心diff算法比对过程中，会移除旧的vnode节点，创建新的vnode节点。每次更新组件都会创建新的子组件。自然就会在成性能压力。而v-show只会对现有dom节点style.display的值控制显示隐藏。
   5. keep-alive 非优化的情景下，我们每次点击按钮切换路由视图，都会重新渲染一次组件。渲染组件会经过初始化，render,patch等过程。而使用keep-alive包裹的组件，下一次渲染组件的时候，直接在缓存中拿到对应的vnode，然后渲染，不需要再走一次render和patch流程。但是他消耗的内存很大。
   6. deffered features 使用deferred组件延时分批渲染组件。当我们从simple page切换到heavy page的时候，在一次render接近结尾的时候，页面渲染任然是simple page给人一种页面卡顿的感觉。优化之后，在一次render靠前的位置页面就已经渲染了，并且heavy page是渐进式渲染出来的。Defer的主要思想是把一个组件的一次渲染拆分成多次。
   7. time slicing时间片切割技术。
   8. non-reactive data 方法有很多
      + configurable的属性改成false,
      + 数据不一定要在data中，有些数据我们并不是用在模板中，也不需要监听他的变化，只是想在组建的上下文共享这个数据，这时我们可以仅仅把这个数据挂载到组件实例的this上。
   9. 
#### 4. 组件间通信
   + 父传子
      + props向子组件传值
      + refs获取到子组件
   + 子传父
      + $emit调用父组件的方法
   + 兄弟组件
      + $parent 或者 $root
   + 祖先和后代支架
      + provide inject
      + dispatch，递归向父组件传递事件
   + 任意两个组件之间：时间总线或vuex

#### 4. vue的作用域样式scoped css和深度作用的选择器
   + scoped css的原理：
      1. 为每个组件实例生成一个能唯一标识组件实例的标识符。
      2. 给组件模板中每一个标签对应的dom元素提价一个标签属性
      3. 给组建的作用域样式的每个选择器的最后一个选择器单元增加一个属性选择器。
   + 深度作用选择器 >>> /deep/的原理
      1. 原理和前面的一样，只是vue不会为深度作用的选择器后面的选择器单元增加属性选择器，所以后面的选择器单元能够选择到子组件及后代子组件。
#### 5. vue-router的原理
   + 单页面：第一次进入页面的时候会请求一个html文件,切换到其他组件，路径发生变化，但是并没有新的html文件请求，页面内容也变化了。前端判断到底显示哪个组件，清除不需要的，显示需要的组件。
   + 多页面：每一次页面跳转的时候，后台服务器会返回一个新的html文档
   + 路由模式
      1. hash: 使用url hash值作路由。默认模式
         + 单单改变#后面的部分，浏览器只会加载相应位置的内容，不会重新加载页面
         + 每次hash改变，都会在浏览器的访问历史中增加一个记录，根据不同的值，渲染指定Dom位置的不同数据。
      2. history,依赖html5 historyapi和服务器配置，查看html5 history
      3. abstract 支持所有的js运行环境，如node.js服务器端
   + 源码阅读
      1. 首先做为一个插件，要有install方法，通过给vue.protoType定义$router,$route
      2. 实例化vueRouter,创建match匹配函数：根据传入的routes配置生成对应的路由map,然后直接返回match匹配的函数。
      2. 实例化History，这里会对hashHistory做特殊的处理，为什么不在初始化history的时候监听hashChange事件呢，因为初始话的时候，hash 不是以/开头的话就会不上#/这个过程会触发hashchange,会再走一次生命周期钩子
      3. router-link 组件就是在其点击的时候根据设置的 to 的值去调用 router 的 push 或者 replace 来更新路由的，同时呢，会检查自身是否和当前路由匹配（严格匹配和包含匹配）来决定自身的 activeClass 是否添加。
      4. init里面监听history的变化
#### Vue的工作机制
   1. 初始化
      + 在new Vue时会调用init进行初始化，会初始化各种实例方法，全局方法，执行一些生命周期，初始化props,data等状态。其中最重要的是data的响应化处理
      + 初始化之后就是$mount挂在组件，主要执行编译和首次更新。
   2. 编译
     编译分为三个阶段
      1. parse 使用正则解析template中的指令等，形成抽象语法树
      2. optimize 标记一些静态节点，做性能优化
      3. generate 把第一部分生产的AST转化为渲染函数
   3. 更新，数据修改触发setter，然后监听器会通知进行修改，通过对比新旧vdom，得到最小修改，然后只需要修改这些差异就行。
      

    