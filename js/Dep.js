/**
 * 消息订阅器
 * 收集订阅者，通知所有订阅者更新
 */
class Dep {
    constructor(){
        this.subs=[]
    }
    //  通知所有订阅者
    notify(){
        this.subs.forEach((watcher)=>{
            watcher.update()
        })
    }
    addWatcher(watcher){
        this.subs.push(watcher)
    }
    removeWatcher(watcher){
        const index = this.subs.find((item)=>item.id===watcher.id)
        this.subs.splice(index,1)
    }
}
export default Dep;