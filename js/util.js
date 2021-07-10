var ids=new Set()
// 创建唯一id
function createId(){
    const id =Math.random()*1000;
    if(ids.has(id)){
        createId()
    }
    return id;
}
/**
 * 打印obj
 * @param {*} obj 
 */
function printObj(obj){  
    var spaceCount = 0
  return deepObjString(obj,spaceCount)
}
function deepObjString(obj,spaceCount){
    var space='\xa0\xa0\xa0\xa0'.repeat(spaceCount)
    let string=""
    for(let key in obj){
        if(key!=="_ob_"&&obj.hasOwnProperty(key)){
            if(typeof obj[key] ==="object"){
                spaceCount++
                string +=`\n ${space}${key}:${deepObjString(obj[key],spaceCount)}`
            }else{
                string +=`\n ${space}${key}:${obj[key]}`;
            }
        }
    }
    return string
}
export {createId,printObj}