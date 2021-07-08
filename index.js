import { observer } from "./js/Observer.js";
// import Watcher from "./Watcher.js"
import Compiler from "./js/Compiler.js"

var state = {
    name: "zhangsan",
    age: 18,
    attributes: {
        work: "coder"
    }
}
function changeValue(e) {
    const value = e.target.value;
    state.age = value;
    console.log(state.age)
}
const observerDeep = observer(state, {
    deep: true
})
// 初始话input
document.getElementById('age').value= state.age

const compiler = new Compiler(document, state);
window.changeValue=changeValue;
window.state=state;

