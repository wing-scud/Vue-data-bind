import Dep from "./Dep.js";
import {isObject} from "./Observer.js"
import {createId }from "./util.js"
class Watcher {
    /**
     * 1. 将该自身添加到消息订阅器中
     *     通过下面储存value时，需要调用监听的对象的key的的get函数，
     *     利用Dep.target。临时储存该订阅者，运行监听的对象get函数时，取出Dep.target
     *  2. 构造时，初始化，储存value,作为oldValue
     *     发生更新时，运行run(),拿到新值，做处理
     */
    constructor(data, key,options, callback) {
        this.data = data;
        this.key = key;
        this.id=createId();
        this.deps=[]
        this.options =options || {};
        this.value = this.init();
        this.callback = callback;
    }
    /**
     * 什么时候增加消息调度中心
     * @param {*} dep 
     */
    addDep(dep) {
        this.deps.push(dep);
        dep.addWatcher(this)
    }
    update() {
        this.run()
    }
    run() {
        const newValue = this.data[this.key];
        const oldValue = this.value;
        if (newValue !== oldValue) {
            this.value = newValue;
        }
        this.callback(oldValue, newValue)
    }
    /**
     * 初始化，将自身绑定的观察者内
     */
    init() {
        Dep.target = this;
        const value = this.data[this.key];
        if(this.options.deep){
            // 递归 value 给每个属性添加watcher
            deepObj(value)
        }
        Dep.target = undefined;
        return value;
    }
    destory(){
        this.deps.forEach((dep)=>dep.removeWatcher(this))
    }
}
function deepObj(obj){
    for(let key in obj){
        if(isObject(obj[key])){
            deepObj(obj[key])
        }
    }
}
export default Watcher