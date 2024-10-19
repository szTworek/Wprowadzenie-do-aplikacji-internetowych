// let zegar=document.getElementById("stoper")
let timer
let currentSec=0
let currentMin=0
const minutes=document.getElementById("minutes")
const seconds=document.getElementById("seconds")
function zegar(){

    currentSec+=1
    if (currentSec===60){
        currentSec=0
        currentMin+=1
    }
    if (currentMin===60){
        currentMin=0
    }
    if (currentMin!==0) {
        minutes.textContent = currentMin+"min"
    }
    seconds.textContent=currentSec.toString()+"s"

}

document.getElementById("start").addEventListener('click',()=>{
    if (!timer){
        timer=setInterval(zegar,100)
    }
})
document.getElementById("stop").addEventListener('click',()=>{
    clearInterval(timer);
    timer = null;
})
document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    currentSec = 0;
    minutes.textContent = null
    seconds.textContent=currentSec.toString()+"s"
});