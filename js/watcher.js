class Watcher {
    constructor(observer, callback) {
        this.observer = observer;
        this.callback =callback;
        this.observer.addWatcher(this)
    }
    update() {
        this.run()
    }
    run() {
        this.callback()
    }

}
export default Watcher