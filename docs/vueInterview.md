### vue相关的面试题
+ vuex
    1. vueX的运行机制：vuex的state作为一个仓库，提供数据驱动vue component渲染，视图通过dispatch派发actions，acions中可以进行一些异步操作，actions或者视图通过commit提交给mutation，mutation去改变state.
    2.源码分析： vuex其实是vue.js的一个插件，插件需要提供一个install方法，install方法调用会将vue作为参数传入。会在全局混入一个beforeCreate钩子函数，把实例化的store保存到所有组建的this.$store中。  
+ vue响应式原理<br>
   vue2.0响应式实现的核心就是es5的object.defineProperty劫持data props各个属性的getter,getter做依赖收集，setter派发更新。整体就是一个数据劫持+发布订阅者的模式。
   1. vue初始化阶段，遍历data,props，调用object.defineproperty给每个属性加上getter,setter
   2. 每个组件，每个computed都会实例化一个watcher.订阅渲染，计算使用到的所有的data/props/computed,一旦数据发生变化，setter被调用，会通知渲染watcher重新计算，更新组件。
+ vue性能提升的九个技巧
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
   9
    