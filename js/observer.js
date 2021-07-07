class Observer {
    constructor(obj, options) {
        this.options = options || {};
        this.obj = obj;
        this.watchers = []
        this._vueDirective(obj)
    }
    addWatcher(watch){
        this.watchers.push(watch)
    }
    _vueDirective(obj) {
        for (let key in obj) {
            this._observer(obj, key, obj[key])
        }
    }
    _objectJudge(obj) {
        if (typeof obj === "Object" && obj !== null) {
            return obj;
        } else {
            return false;
        }
    }
    _observer(obj, key, value) {
        const observerObj = obj[key];
        const objectBool = this._objectJudge(observerObj);
        if (objectBool && this.deep) {
            obj[key] = new Observer(observerObj, this.options)
        } else {
            Object.defineProperty(obj, key, {
                get() {
                    return value;
                },
                set(newValue) {
                    value = newValue;
                    this.notify()
                }
            })
        }
    }
    notify() {
        for (let watcher in this.watchers) {
            watcher.update()
        }
    }
}
export default Observer;