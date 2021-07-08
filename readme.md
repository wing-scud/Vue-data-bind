## 观察者（Observer）模式

> 观察者模式定义了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知，并自动更新。 他关注行为，即观察和被观察的通讯
> 观察者模式有一个别名叫“发布-订阅模式”，或者说是“订阅-发布模式。

组成
1. 观察者
2. 被观察者 
   
## 发布（Publish）/订阅（Subscribe）模式
其实24种基本的设计模式中并没有发布订阅模式，上面也说了，他只是观察者模式的一个别称。
但是经过时间的沉淀，似乎他已经强大了起来，已经独立于观察者模式，成为另外一种不同的设计模式。

>在现在的发布订阅模式中，称为发布者的消息发送者不会将消息直接发送给订阅者，<strong>这意味着发布者和订阅者不知道彼此的存在</strong>。在发布者和订阅者之间存在第三个组件，称为消息代理或调度中心或中间件，它维持着发布者和订阅者之间的联系，过滤所有发布者传入的消息并相应地分发它们给订阅者。

组成
1. 发布者   
2. 调度中心 dep
3. 订阅者 watcher

dep 与watcher是多对多的关系
   
区别：
发布订阅模式比观察者模式发一个调度中心，通过调度中心去通知订阅者更新

>观察者模式： 观察者（Observer）直接订阅（Subscribe）主题（Subject），而当主题被激活的时候，会触发（Fire Event）观察者里的事件。

>发布订阅模式： 订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Topic），当发布者（Publisher）发布该事件（Publish topic）到调度中心，也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码。

## Object.defineProperty and Proxy

### Object.defineProperty 
> [MDN 该方法参数描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
``` javascript
 Object.defineProperty(obj,key,{
 get(){
   return obj[key]
}
 set(newValue){
   obj[key]=newValue
  }
  })
``` 
缺点：
1. 一次性的调用，深度监听，需要递归，开销大
2. 无法监听到对象属性的添加和删除
3. 无法监听数组的改变
   

### Proxy 



## 数组的监听
> 重写数组的push、pop、splice、shift、unshift、sort、reverse方法，在方法中添加订阅者


### Vue的深度监听
> 深度监听指的是对该监听对象递归，将所有的消息调度中心都添加该订阅者
> 并不是说，不深度监听，就不递归重写对象的属性的get set方法了
> 深度监听指的是将订阅器递归添加到子对象的消息调度中心中
> 
> Vue 源码深度监听通过traverse,先设置Dep.target = watcher, 递归调用对象的属性值,从而触发该属性的消息调度中心的addWatcher