import Watcher from "./watcher.js"

class Compiler {
    constructor(document, data) {
        this.data = data;
        this.domUpdateWatchers = []
        const frame = document.createDocumentFragment();
        const body = document.body;
        this.compileElement(body)
    }
    compileText(node, key) {
        this.updateDomText(node, this.data[key])
        const watch = new Watcher(this.data[key], (value, oldValue) => {
            console.log("dom update node-new-old", node, value, oldValue)
            this.updateDomText(node, value)
        })
        this.domUpdateWatchers.push(watch)
    }
    compileElement(element) {
        const childNodes = element.childNodes;
        const reg = /\{\{(.*)\}\}/;
        childNodes.forEach((node) => {
            const text = node.textContent;
            if (this.isTextNode(node) && reg.test(text)) {
                this.compileText(node, reg.exec(text)[1])
            }
            if (node.childNodes && node.childNodes.length) {
                this.compileElement(node);  // 继续递归遍历子节点
            }
        })

    }
    updateDomText(node, value) {
        node.textContent = value;
    }
    isTextNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            return true;
        } else {
            return false
        }
    }


}
export default Compiler