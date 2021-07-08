import Watcher from "./Watcher.js"

class Compiler {
    constructor(document, data) {
        this.data = data;
        this.domUpdateWatchers = []
        const body = document.body;
        const frame = this.compileElement(body);
        body.appendChild(frame)
    }
    compileText(node, regResults) {
        const matchString=regResults[0]; // {{age}}
        const matchKey=regResults[1] // age
        const text = node.textContent;
        const otherStringArray = text.split(matchString)
        this.updateDomText(node, this.data[matchKey],otherStringArray.slice())
        const watch = new Watcher(this.data, matchKey, (oldValue,value) => {
            console.log("dom update key-new-old", matchKey,oldValue,value)
            this.updateDomText(node, value,otherStringArray.slice())
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
                this.compileText(node,reg.exec(text))
            }
            if (node.childNodes && node.childNodes.length) {
                node.appendChild(this.compileElement(node));  // 继续递归遍历子节点
            }
            frame.appendChild(node)
        })
        return frame;
    }
    updateDomText(node, value,otherStringArray) {
        otherStringArray.splice(1,0,value)
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
export default Compiler