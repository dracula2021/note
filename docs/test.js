let arr = [1,2,3];
let proxy = new Proxy(arr,{
    get(target,prop){
        if(prop in target){
            return target[prop]
        }else{
            return 0
        }
    },
    set(target,prop,value){
        target[prop] = value;
    }
})

console.log(proxy[1]);
console.log(proxy[123]);
proxy[2] = 10;
console.log(proxy);
console.log(arr);