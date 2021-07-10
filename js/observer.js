import Dep from "./Dep.js"
import arrayProto from "./array.js"
class Observer {
    constructor(obj) {
        obj._ob_ = this;
        this.obj = obj;
        // 数组更新靠这个消息订阅中心，
        this.dep = new Dep();
        this.init(obj)
    }
    init(obj) {
        // 判断是数组还是obj
        if(Array.isArray(obj)){
            obj.__proto__ = arrayProto;
            observerArray(obj)
            return 
        }
        for (let key in obj) {
            if(key!=="_ob_"){
                this._defineReactive(obj, key, obj[key]);
            }
       
        }
    }
    _defineReactive(obj, key, value) {
        const observerObj = obj[key];
        const childObserver = observer(observerObj);
        const dep = new Dep()
        Object.defineProperty(obj, key, {
            get() {
                if (Dep.target) {
                    dep.addWatcher(Dep.target);
                    // 如果该属性值为对象，把该属性值上的订阅者添加到他的_ob_中,
                    childObserver && childObserver.dep.addWatcher(Dep.target)
                }
                return value;
            },
            set(newValue) {
                value = newValue;
                // 通知订阅者更新
                dep.notify()
            }
        })
    }
}
function isObject(obj) {
    if (typeof obj === "object" && obj !== null && !(obj.constructor === Observer)) {
        return obj;
    } else {
        return false;
    }
}
function observer(obj) {
    if (!isObject(obj) || obj instanceof Node) {
        return
    }
    const ob = new Observer(obj)
    return ob;
}
function observerArray(array) {
    for (let i = 0, length = array.length; i < length; i++) {
        observer(array[i])
    }
}
export default Observer;
export { observer,isObject }