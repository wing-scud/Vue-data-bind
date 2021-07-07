import Observer from "./observer.js";
import Watcher from "./watcher.js"
import Compiler from "./compiler.js"
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
}
const observerStateDeep = new Observer(state, {
    deep: true
})
const compiler = new Compiler(document, state);


