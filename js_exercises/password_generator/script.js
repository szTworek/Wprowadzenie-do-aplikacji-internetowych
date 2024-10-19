const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const lowercaseAndUppercase = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowercaseWithSymbols = 'abcdefghijklmnopqrstuvwxyz%$@#!&*'
const allCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ%$@#!&*'

function generate() {
    // event.preventDefault();
    let minlen = parseInt(document.getElementById("dlugoscmin").value)
    let maxlen = parseInt(document.getElementById("dlugoscmax").value)
    let capital= document.getElementById("wielkieLitery").checked
    let special=document.getElementById("znakiSpecjalne").checked
    let result
    console.log(minlen,maxlen,capital,special)
    if (maxlen<minlen){
        alert("podaj poprawne długości hasła")
        exit()
    }
    let len=Math.round(Math.random()*(maxlen-minlen))+minlen
    console.log(len)
    let draw = new Uint32Array(len);
    if (capital && special){

        crypto.getRandomValues(draw)
        console.log(draw,Uint32Array,len)
        result=Array.from(draw, num => allCharacters[num % allCharacters.length]).join('');
        alert(result)
    }
    else if(capital){
        crypto.getRandomValues(draw)
        console.log(draw,Uint32Array,len)
        result=Array.from(draw, num => lowercaseAndUppercase[num % lowercaseAndUppercase.length]).join('');
        alert(result)
    }
    else if(special){
        crypto.getRandomValues(draw)
        console.log(draw,Uint32Array,len)
        result=Array.from(draw, num => lowercaseWithSymbols[num % lowercaseWithSymbols.length]).join('');
        alert(result)
    }
    else{
        crypto.getRandomValues(draw)
        console.log(draw,Uint32Array,len)
        result=Array.from(draw, num =>lowercaseLetters[num % lowercaseLetters.length]).join('');
        alert(result)
    }

}

document.getElementById("generuj").addEventListener('click',()=>{
    generate()
})