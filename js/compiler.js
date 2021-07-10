import Watcher from "./Watcher.js"

/**
 * 检测双大括号语法，监听该属性
 */
class Compiler {
    constructor(document, data) {
        this.data = data;
        this.domUpdateWatchers = []
        const body = document.body;
        const frame = this.compileElement(body);
        body.appendChild(frame)
    }
    compileText(node, regResults) {
        const matchString = regResults[0]; // {{age}}
        const matchKey = regResults[1] // age
        const text = node.textContent;
        const otherStringArray = text.split(matchString);
        // 针对state.name 深度获取属性,进行处理,得到属性值
        const {deepObj,deepKey} = getDeepObj(this.data, matchKey)
        this.updateDomText(node, deepObj[deepKey], otherStringArray.slice())
        /**
         * 添加视图更新的订阅者
         */
        const watch = new Watcher(deepObj, deepKey, {deep:false},(oldValue, value) => {
            console.log("dom update key-new-old", deepKey, oldValue, value)
            this.updateDomText(node, value, otherStringArray.slice())
        })
        this.domUpdateWatchers.push(watch)
    }
    compileElement(element) {
        const frame = document.createDocumentFragment();
        const childNodes = element.childNodes;
        const reg = /\{\{(.*)\}\}/;
        Array.from(childNodes).forEach((node) => {
            const text = node.textContent;
            if (this.isTextNode(node) && reg.test(text)) {
                this.compileText(node, reg.exec(text))
            }
            if (node.childNodes && node.childNodes.length) {
                node.appendChild(this.compileElement(node));  // 继续递归遍历子节点
            }
            frame.appendChild(node)
        })
        return frame;
    }
    updateDomText(node, value, otherStringArray) {
        otherStringArray.splice(1, 0, value)
        node.textContent = otherStringArray.join(" ");
    }
    isTextNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            return true;
        } else {
            return false
        }
    }


}
function getDeepObj(obj, matchKey) {
    const keys = matchKey.split(".");
    const deepKeys = keys.slice(0, keys.length - 1)
    let deepObj = obj;
    const deepKey= keys[keys.length-1]
    deepKeys.forEach((key) => {
        deepObj = deepObj[key];
    })
    return {deepObj,deepKey};
}
export default Compiler