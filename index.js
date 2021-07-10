import { observer } from "./js/Observer.js";
// import Watcher from "./Watcher.js"
import Compiler from "./js/Compiler.js"
import Watcher from "./js/Watcher.js";
import {printObj} from "./js/util.js"

const log= console.log;
// 将console.log 输出到页面中
console.log =function(){
    document.getElementById("console").innerText+=`\n${Array.from(arguments).map(item=>item.toString())}`
    log.call(window,...arguments)
}
// 是否深度监听
var deep = true;
var watcher;
var data = {
    state: {
        name: "zhangsan",
        age: 18,
        sisters: ['one', 'two'],
        attributes: {
            work: "coder"
        }
    }
}
// 观察data
const observerData = observer(data)
// 创建state属性监听
watcher = createWatcher(deep)

// 更新data在页面的显示
updateData()

// 编译模板语法，监听双大括号的属性值
const compiler = new Compiler(document, data);

function createWatcher(deep) {
    return new Watcher(data, "state", { deep: deep }, (oldValue, newValue) => {
        console.log("state change", oldValue);
    })
}
// 设置age
function changeAge(e) {
    const value = e.target.value;
    data.state.age = value;
    updateData()
}
// 是否深度监听
function changeDeep(e) {
    deep = e.target.checked;
    if (watcher) {
        watcher.destory();
    }
    watcher = createWatcher(deep)
}
// 修改attributes的work
function changeWork(e) {
    data.state.attributes.work = e.target.value
    updateData()
}
// 更新data在页面的输出
function updateData(){
    document.getElementById('data').innerText =printObj(data);
}
// 数组添加一项
function addSister(){
    data.state.sisters.push(Math.random()*100)
    updateData()
}

// script type=module ，默认为局部作用域
window.changeAge = changeAge;
window.data = data;
window.changeWork = changeWork;
window.changeDeep = changeDeep;
window.addSister = addSister;
