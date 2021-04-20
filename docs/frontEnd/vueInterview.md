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
#### Vue的源码解读
   1. 我们先来看core/instance/index.js
      + 定义了五个方法
         1. initMixIn 在vue的原型上添加了_init方法，当new Vue的时候这个方法会被执行
         2. stateMixin 在这个方法上定义了$data,$props属性，定义了$set,$delete,$watch三个方法。
         3. eventMixin 在vue的原型上添加了四个方法$on,$once,$off,$emit
         4. lifeCycleMixin 添加了_update,$forceUpdate,$destory
         5. renderMixin 添加了_render,$nextTick
   2. core/index.js文件
      1. initGlobalApi添加了静态属性和方法，set delete nextTick
   3. web/runtime/index.js
      1. 实现了$mount，返回了一个mountComponent方法
      2. 在vue option混入了两个指令 show model 两个组件transition transition-group
   4. suntime-with-compiler.js
      + 重写了$mount
   5. _init方法里面做了什么
      + mergeOptions合并两个对象为一个新的对象。
      + 规范化组件名称，props，inject,指令，生命周期钩子函数可以写成数组形式，钩子函数将会依次调用。
   + vue的响应式原理
      1. data的判断，要看data中的key是否会和props或者methods中的key重复，是否是保留字，isReserved是判断是否是以$或者_开头。
      2. proxy在vm上定义与data数据字段同名的访问器属性，并将这些属性值代理到vm_.data
      3. observe函数：返回一个Observer实例。
      4. Observer对象根据数据类型执行相应的响应化操作。对于对象的话，调用defineReactive，对于数组类型的值，继续调用observe处理每一项。
      5. defineReactive里面定义对象属性的getter/setter getter负责添加依赖，setter负责通知更新。  
   + $set的实现
      1. 先判断是否是未定义或者是primitive
      2. 判断target是否是数组，如果是数组，直接调用splice
      3. 如果是对象
         + 如果已经有值，直接修改
         + 如果target不是响应式的，直接赋值
         + 否则就把value当作响应式修改
      ```
        function set (target: Array<any> | Object, key: any, val: any): any {
            if (process.env.NODE_ENV !== 'production' &&
            (isUndef(target) || isPrimitive(target))
            ) {
            warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
            }
            if (Array.isArray(target) && isValidArrayIndex(key)) {
            target.length = Math.max(target.length, key)
            target.splice(key, 1, val)
            return val
            }
            if (key in target && !(key in Object.prototype)) {
            target[key] = val
            return val
            }
            const ob = (target: any).__ob__
            if (target._isVue || (ob && ob.vmCount)) {
            process.env.NODE_ENV !== 'production' && warn(
               'Avoid adding reactive properties to a Vue instance or its root $data ' +
               'at runtime - declare it upfront in the data option.'
            )
            return val
            }
            if (!ob) {
            target[key] = val
            return val
            }
            defineReactive(ob.value, key, val)
            ob.dep.notify()
            return val
            }
      ```
   + $delete也是类似的
      1. 如果是undefined或者primitive直接警告
      2. 如果是数组，调用splice删除
      3. 删除对象属性
      4. 如果是响应式的，会通过dep发送通知。
   + Dep: 负责一组watcher,包括watcherhi里的增删及通知更新。
   + Watcher: 通过对被观测目标的求值，触发数据属性的get拦截器从而收集依赖
   + 每个组件都会有对应的watcher,数值变化会触发其update函数导致重新渲染
   + 数组的响应式：
      + 数组数据辩护采取的策略是拦截push poop splice等方法执行dep通知
      + 为数组原型的7个可以改变内容的方法定义拦截器
      + 如果是push后者unshift增加了数组的内容，会调用observeArray把新增的值变成响应式的。
      + getter的时候，如果value是数组，会调用dependArray方法，把数组中的所有项添加依赖，将来数组里面的值就可以通过_ob__.dep发送通知。
   + Vue异步更新队列
      + vue在更新Dom时是异步执行的。只要侦听到数据变化，vue将开启一个队列，并缓存在一个事件循环中发生的所有数据变更。如果同一个watcher被多次出发，只会被推入到队列中一次。这样避免不必要的计算和dom操作。并在下一次事件循环中，刷新队列并执行实际的工作。
   + nextTick的实现
      + 同一次事件循环内会将microTask队列中的所有任务全部执行完毕，且要先于macroTask，另外macroTask中两个不同的任务之间可能穿插着UI的重新渲染，nextTick的一部行为利用微任务队列，promise或者mutationObserver交互，实在不支持，再使用setImmmediate或者是setTimeout
   + 虚拟Dom
      + 虚拟Dom是对Dom的js抽象标识，他们是js对象，能够描述Dom结构和关系。
      + js操作Dom的代价：用我们传统的开发模式，原生js或者jq操作Dom时，浏览器会从构建Dom树开始从头到尾执行一遍流程。如果我们一次操作中，需要更新10个Dom节点，浏览器会执行10遍，计算dom节点的坐标值等都是白白的性能浪费。频繁操作会出现页面卡顿，影响用户体验。
      + 虚拟dom不会立即操作dom,而是将这10次更新的diff内容保存到本地一个js对象中，最终将这个js对象一次性attach到Dom树上，避免大量无所谓的计算量。
      + 接上源码，_render里面调用render函数，创建了vnode，vnode映射到真实Dom需要经历创建diff patch等过程。vnode是通过vm.createElement函数创建的。
      + _update负责更新Dom核心就是调用__patch__

      + 我们来详细讲解一下patch算法
         + patch将新老vnode节点进行比对（diff算法）,然后根据比较结果进行最小量dom操作，而不是将整个视图根据新的vnode重绘。
         + diff算法
            1. 通过同层的树节点进行比较而非对树进行逐层搜索遍历的方式，同层级只做三件事：增删改。new Vnode不存在就删，old vnode不存在就增，都存在就比较类型，类型不同直接替换，类型相同执行更新。
            2. patchVnode: 两个vnode相同执行更新操作，包括：属性更新，文本跟新，子节点更新。
               + 如果新旧vnode都是静态的，同时他们的key相同，并且新的vnode是clone或者是标记了v-once,那么只需要替换elm以及componentInstance即可
               + 新老节点都有children子节点，则对子节点进行diff操作，调用updateChildren，这个updateChildren也是diff的核心
               + 如果老节点没有子节点而新节点存在子节点，先清空老节点Dom的文本内容，然后为当前Dom节点加入子节点
               + 如果老节点没有子节点而新节点存在子节点，先清空老节点DOM的文本内容，然后为当前DOM节点加入子节点。
               + 当新节点没有子节点而老节点有子节点的时候，则移除该DOM节点的所有子节点。
               + 当新老节点都无子节点的时候，只是文本的替换。
            3. updateChildren vue对updateChildren做了一个特别的优化 在新老两组vnode节点的左右头尾两侧都有一个变量标记，在遍历过程中这几个遍历会向中间靠拢。当newStartIdx > newEndIdx 或者 oldStartIdx > newEndIDx时候结束循环
               1. 当 oldStartVnode和newStartVnode 或者 oldEndVnode和newEndVnode 满足sameVnode，直接将该VNode节点进行patchVnode即可，不需再遍历就完成了一次循环
               2. 如果oldStartVnode与newEndVnode满足sameVnode。说明oldStartVnode已经跑到了oldEndVnode后面去了，进行patchVnode的同时还需要将真实DOM节点移动到oldEndVnode的后面。
               3. 如果oldEndVnode与newStartVnode满足sameVnode，说明oldEndVnode跑到了oldStartVnode的前面，进行patchVnode的同时要将oldEndVnode对应DOM移动到oldStartVnode对应DOM的前面。
               4. 如果以上情况均不符合，则在old VNode中找与newStartVnode满足sameVnode的vnodeToMove，若存在执行patchVnode，同时将vnodeToMove对应DOM移动到oldStartVnode对应的DOM的前面。
               5. 当然也有可能newStartVnode在old VNode节点中找不到一致的key，或者是即便key相同却不是sameVnode，这个时候会调用createElm创建一个新的DOM节点。
               6. 当结束时oldStartIdx > oldEndIdx，这个时候旧的VNode节点已经遍历完了，但是新的节点还没有。说明了新的VNode节点实际上比老的VNode节点多，需要将剩下的VNode对应的DOM插入到真实DOM中，此时调用addVnodes。
               7. 但是，当结束时newStartIdx > newEndIdx时，说明新的VNode节点已经遍历完了，但是老的节点还有剩余，需要从文档中删 的节点删除
         + 标记静态子树的好处：
            1. 每次重新渲染，不需要为静态子树创建新节点
            2. 虚拟DOM中patch时，可以跳过静态子树

+ watch和computed，methods的区别
   + watch
      1. 不支持缓存
      2. 支持异步
      3. 当属性变化，需要执行对应的操作，一对多。
   + computed
      1. 支持缓存，默认缓存，计算属性是基于他们的响应式进行缓存的。
      2. 不支持异步
      3. 多对一的操作
   + methods
      1. methods是非响应式的。
      2. methods里面的函数每次调用时都要执行
+ 双向数据绑定的原理
   1. observer对数据对象进行遍历，使用object.definedProperty方法来劫持各个属性的setter,getter在数据变动的时候发布消息给订阅者，触发相应的监听回调。
   2. compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，将指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变化，收到通知，更新视图。
   3. watcher订阅者是Observer和compile之间的桥梁
      + 在自身实力化时往属性订阅器里面添加自己
      + 自身必须有一个update方法
      + 待属性变动的时候，调用自身的update方法，并触发compile中绑定的会带哦
   4. mvvm作为数据绑定的入口，整合observer,compile和watcher三者，通过observer来监听自己的model数据变化，通过compile来编辑模板指令，最终利用watcher大气observer和compile之间的桥梁。 

+ Object.defineProperty的缺点
   1. 不能监听数组，因为数组没有getter setter
   2. 因为数组长度不确定，如果太长性能负担太大只能监听属性，而不是整个对象。
+ proxy的好处：
   1. 可以监听数组
   2. 监听整个对象不是属性
+ keep-alive的原理
   1. 判断组件name，不在include或者在exclude中，直接返回vnode，说明组件不被缓存
   2. 
+ vue和react的区别
   1. react是函数式思想，状态和逻辑通过参数传入，是单向数据流。vue是响应式的，也就是基于数据是可变的，通过对每一个属性建立watcher来监听，当属性变化的时候，响应式的更新对应的虚拟dom
   2. react的思想是all in js 通过js来生成html 所以设计了jsx  vue是把html css js组合到一起，用各自的处理方式，vue有单文件组件，可以把html css js写到一个文件中
   3. react可以通过高阶组件来扩展，而vue需要mixins来扩展
###### vue相关的面试题
1. vue响应式原理
   + 而在Vue这种MVVM框架中，最重要的核心就是实现数据层和视图层的连接，通过数据驱动应用，数据变化，视图更新。Vue中的方案是数据劫持+发布订阅模式。
   + 如果是对象则采用Object.defineProperty()的方式定义数据拦截:
   + 如果是数组，则覆盖数组的7个变更方法实现变更通知:
2. 通过查看源码 我们可以看到v-for的优先级比v-if高
3. vue中的key的作用
   sameVnode里面判断了key 标签名 注释 data是否相等
4. 双向绑定原理
   + vue中的双向绑定是一个指令v-model 默认情况下相当于:value和@input
   + 自定义组件的话要使用它需要在组件内绑定的props value  可以在组件里定义model属性来自定义绑定的属性名和事件名称。
5. nextTick原理
   + vue在更新dom的时候是异步执行的，只要侦听到数据变化，vue将开启一个队列，并缓存在同一事件循环中，
6. 组件间通信
+ props传值 $on $emit
+ ref $parent $children $root
+ event bus
+ $attrs $listeners
   + $attrs包含了父作用域没被props声明绑定的数据
   + $listeners 包含了父作用域v-on监听的时间
+ provide inject
###### 声明周期
1. beforeCreate created
   + beforeCreate是在初始化生命周期 事件 渲染函数之后的生命周期
   + created之前调用了initInjection initsate initProvide这时候初始化了data等，这个时候可以访问data
2. beforeMount mounted
###### keep-alive的原理
+ 先获取到第一个子组件，获取该组件的名称 通过include和exclude属性进行匹配 匹配不成功则不进行任何操作直接返回vnode
+ 匹配到了开始缓存 如果cache中存在 直接使用缓存，更新key的位置。
+ 如果cache中没找到，添加到cache中，并且判断当前缓存的个数是否超过了max指定的个数，如果超过，就要把keyss中的最后一个移除
###### patch算法
+ 首先判断是否有新的vnode 没有的话就销毁就得vnode
+ 然后判断有没有旧的vnode 没有就代表新增
+ 判断是否是组件 如果是组件并且用samevnode判断新旧节点是否是相同的节点 是的话进行patchVnode 新旧节点的diff算法




    