//Question 1: l'ordre d'apparition des messages est A B C D E F G
//Question 2: version avec les promisses de ce code
 
function call1(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('B');
            },2000);
            });
    }
function call2(){
        return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('C');
            },4000);
        });
    }
function call3(){
        return new Promise((resolve, reject)=>{
             setTimeout(()=>{
                resolve('D');
                },6000);
                });
        }
    
    
     
console.log("A");
call1().then((res)=>console.log(res))
       .then(()=>call2())
       .then((res)=>console.log(res))
       .then(()=>call3())
       .then((res)=>console.log(res))
       .then(()=>{
         console.log('E');
         console.log('F');
         console.log("G")
            })
        .catch((err)=>console.log(err))
     
//Question3:version avec "async await" de ce code
     
    async function fonctionAsync(){
        try {
            console.log("A");
        let res1= await call1();
            console.log(res1);
            let res2=await call2();
            console.log(res2);
            let res3=await call3()
            console.log(res3);
            console.log('E');
            console.log('F');
            console.log("G");
       }catch (err){
            console.log(err);
        }
    }
     
fonctionAsync();
    