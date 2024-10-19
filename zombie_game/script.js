const gameState = {
    score: 100,
    hearts: 3,
    timer:null,
    // currZombieID: 0
};

function generateZombies(observer,id){
    let parameter=Math.random()*0.7+0.5
    let speed=(parameter*3.5+1.5)+"s"
    let speedSprite=parameter*0.6+0.2+"s"
    let position=(Math.random()*20)+'%'
    let newZombie=document.createElement('div')
    newZombie.classList.add("zombie")
    newZombie.style.bottom=position
    newZombie.style.setProperty('--size',parameter)
    newZombie.style.setProperty('--speed',speed)
    newZombie.style.setProperty('--speedSprite',speedSprite)
    document.body.appendChild(newZombie)
    observer.observe(newZombie)
    return newZombie
}

function stringScore(score){

    let len=score.toString().length
    let zero=6-len
    return "0".repeat(zero) + score
}



function zombieShot(newZombie,score,observer){
    newZombie.addEventListener("click",()=>{
        gameState.score+=20
        score.textContent=stringScore(gameState.score)
        console.log("trafione")
        observer.unobserve(newZombie)
        newZombie.remove()
    })
}

function manageHearts(hearts){
    switch (hearts){
        case 3:
            heart3=document.querySelector("#heart3")
            heart2=document.querySelector("#heart2")
            heart1=document.querySelector("#heart1")
            heart3.src="img/full_heart.png"
            heart2.src="img/full_heart.png"
            heart1.src="img/full_heart.png"
            break
        case 2:
            heart=document.querySelector("#heart3")
            heart.src="img/empty_heart.png"
            break
        case 1:
            heart=document.querySelector("#heart2")
            heart.src="img/empty_heart.png"
            break
        case 0:
            heart=document.querySelector("#heart1")
            heart.src="img/empty_heart.png"
            break
    }
}

function endGameScreen(){
    const container=document.createElement('div')
    container.id="endGameContainer"
    const youLost=document.createElement('div')
    youLost.id="youLost"
    youLost.textContent="YOU LOST"
    const restartButton=document.createElement('button')
    restartButton.id="restartButton"
    restartButton.textContent="RESTART GAME"
    restartButton.addEventListener("click",()=>{
        restartGame(endGameScreenTab)
    })
    let audio = document.createElement('audio')
    audio.src="img/sad-music.mp3"
    document.body.appendChild(audio)
    audio.autoplay=true
    let endGameScreenTab=[container,youLost,restartButton,audio]
    document.body.appendChild(container)
    container.appendChild(youLost)
    container.appendChild(restartButton)

}

function endGame(){
    const zombies=document.getElementsByClassName("zombie")
    Array.from(zombies).forEach(zombie => {
        zombie.remove();
    });
    endGameScreen()
}

function restartGame(elems){
    for(let i in elems){
        elems[i].remove()
    }
    game()

}

function game(){
    const score=document.getElementById("score")
    gameState.score=100
    gameState.hearts=3
    manageHearts(3)
    score.textContent=stringScore(gameState.score)  

    gameState.timer = setInterval(() => {
        let newZombie=generateZombies(observer,score);
        zombieShot(newZombie,score,observer)

    }, 1000);
    const observer= new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    gameState.hearts -= 1;
                    gameState.score-=5;
                    score.textContent=stringScore(gameState.score)
                    console.log(gameState.hearts);
                    manageHearts(gameState.hearts)
                    if (gameState.hearts === 0) {
                        clearInterval(gameState.timer)
                        endGame()
                    }
                    observer.unobserve(entry.target);
                    entry.target.remove();
                }
            });
        }, {
            root: null,
            threshold: 0.0001,
        })

}

function main(){
    let startingButton=document.getElementById("start")
    let startContainer=document.getElementById("startContainer")
    let zombieSet = new Set();
    // let timer={time:null}
    // let newZombie
    startingButton.addEventListener('click',()=>{
        startingButton.remove()
        startContainer.remove()
        game()
    })

}
window.onload=main()