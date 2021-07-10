import { observer } from "./js/Observer.js";
// import Watcher from "./Watcher.js"
import Compiler from "./js/Compiler.js"
import Watcher from "./js/Watcher.js";
import {printObj} from "./js/util.js"
var deep = false;
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
const observerData = observer(data)
watcher = createWatcher(deep)


updateData()
const compiler = new Compiler(document, data);

function createWatcher(deep) {
    return new Watcher(data, "state", { deep: deep }, (oldValue, newValue) => {
        console.log("state change", oldValue);
    })
}
function changeAge(e) {
    const value = e.target.value;
    data.state.age = value;
    updateData()
}
function changeDeep(e) {
    deep = e.target.checked;
    if (watcher) {
        watcher.destory();
    }
    watcher = createWatcher(deep)
}
function changeWork(e) {
    data.state.attributes.work = e.target.value
    updateData()
}
function updateData(){
    document.getElementById('data').innerText =printObj(data);
}

window.changeAge = changeAge;
window.data = data;
window.changeWork = changeWork;
window.changeDeep = changeDeep;