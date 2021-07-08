import { observer } from "./js/Observer.js";
// import Watcher from "./Watcher.js"
import Compiler from "./js/Compiler.js"
import Watcher from "./js/Watcher.js";

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
function changeValue(e) {
    const value = e.target.value;
    data.state.age = value;
}
const observerData = observer(data)
new Watcher(data, "state", { deep: true }, (oldValue,newValue) => {
    console.log("state change", oldValue)
})

// 初始话input
document.getElementById('age').value = data.state.age;
// new Watcher(data.state, "sisters", () => {
//     console.log('update array')
// })
// data.state.sisters.push('three')
const compiler = new Compiler(document, data);
window.changeValue = changeValue;
window.data = data;

