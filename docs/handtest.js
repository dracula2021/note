function carry(fn,arr = []){
  let len = fn.length;
  return function(args){
    let newArgs = [...arr,...args];
    if(newArgs.length === len){
      return fn(...newArgs);
    }else{
      return carry(fn,newArgs)
    }
  }
}
// 求两点的和的下标
function twoSum(nums,terget){
  for(var i = 0; i < nums.lenth; i++){
    for(var j = i+1; j < nums.length; j++){
      if(nums[i] + nums[j] === target){
        return [i,j]
      }
    }
  }
}
// 查找
const singleNumber = (nums) => {
  const numsGroup = nums.map(num => nums.filter(v => v === num));
  return numsGroup.find(num => num.length === 1)[0];
}
// 修改嵌套层级很深对象的key
JSON.parse(JSON.stringify(obj).replace(/_/g,''));
const recusion = (obj) => {
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    const newKey = key.replace(/_/g,'');
    obj[newKey] = recusion(obj[key]);
    delete obj[key];
  })
  return obj;
}
// 旋转数组，给定一个数组，将数组中的元素向右移动k个位置，k是非负数
const rotate = function(nums,k){
  const l = nums.length;
  k = k % l;
  for(let i = 0; i < k;i++){
    nums.unshift(nums.pop());
  }
}
const rotate = function(nums,k){
  const l = nums.length;
  k = k%l;
  nums.unshift(...nums.splice(l-k,k));
}
// 判断是否是3的幂
const isPowerThree = function(n){
  if(n<1){
    return false;
  }
  while(n > 1){
    if(n % 3 !== 0){
      return false
    }else{
      n = n/3
    }
  }
}
// 判断是否是回文函数
const isPalindrome = s => {
  const arr = s.toLowerCase().replace(/[^A-Za-z0-9]/g,'');
  const newArr = arr.split('').join('');
  return newArr === arr 
}
