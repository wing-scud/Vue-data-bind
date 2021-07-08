import Dep from "./Dep.js"
class Observer {
    constructor(obj, options) {
        this.options = options;
        this.obj = obj;
        this.dep = new Dep();
        this._observer(obj)
    }
    _observer(obj) {
        for (let key in obj) {
            this._defineReactive(obj, key, obj[key]);
        }
    }
    _defineReactive(obj, key, value) {
        const observerObj = obj[key];
        this.options.deep && observer(observerObj);
        const instance = this;
        Object.defineProperty(obj, key, {
            get() {
                if(Dep.target){
                    instance.dep.addWatcher(Dep.target)
                }
                return value;
            },
            set(newValue) {
                value = newValue;
                instance.dep.notify()
            }
        })

    }
}
function isObject(obj) {
    if (typeof obj === "object" && obj !== null) {
        return obj;
    } else {
        return false;
    }
}
function observer(obj, options) {
    if (!isObject(obj) || obj instanceof Node) {
        return
    }
    options || (options = {
        deep: false,
    })
    const ob = new Observer(obj, options)
    return ob;
}
export default Observer;
export { observer }