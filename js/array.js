const  arrayProto =Object.create(Array.prototype);
const ways= ['push','pop','shift','unshift','slice','sort','reverse'];
ways.forEach((way)=>{
    arrayProto[way] = function(){
        const ob =this._ob_;
        Array.prototype[way].call(this,...arguments)
        ob.dep.notify();
    }
})
export default arrayProto;
