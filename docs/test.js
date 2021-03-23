async function f1(){
  await new Promise((resolve,reject) => {
    setTimeout(()=>{
      console.log(222);
      reject()
    },2000)
  })
}
async function f2(){
  await new Promise((resolve,reject) => {
    setTimeout(()=>{
      console.log(1111);
      reject()
    },1000)
  })
}
async function f3(){
  await new Promise((resolve,reject) => {
    setTimeout(()=>{
      console.log(333);
      reject()
    },3000)
  })
}

Promise.all([f1(),f2(),f3()]).then(result => {
  console.log(result);
}).catch(err=>{
  console.log('err'+ err);
})