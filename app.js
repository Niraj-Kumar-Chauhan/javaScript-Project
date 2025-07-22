let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let scoreSeq = [];

let btns = ["yellow", "red", "green", "purple"];
let h2 = document.querySelector("h2");
document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game started");
        started = true;
        levelUp();
    }
});

let score = document.createElement("h3");
h2 = document.querySelector("h2");
h2.parentNode.insertBefore(score, h2.nextSibling);
score.classList.add("score");

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;
    console.log("level = ", level);
    let randIndx = Math.floor(Math.random()*4);
    let ranColor = btns[randIndx];
    let randBtn = document.querySelector(`.${ranColor}`);
    gameFlash(randBtn);
    gameSeq.push(ranColor);
    console.log("gameSeq = ", gameSeq);
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 200);
}

function UserFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 200);
}

function checkAns(idx){
    if(gameSeq[idx] === userSeq[idx]){
        if(gameSeq.length == userSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `game over! <b> your score was : ${level} </b> <br> press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "black";
        }, 150)
        if(scoreSeq[scoreSeq.length-1] >= level){
            score.innerText = `Your Heighest Score Was ${scoreSeq[scoreSeq.length-1]}`
        }else{
            score.innerText = `Your Heighest Score Was ${level}`
        }
        reset()
    }
}

function btnPress(){
    let btn = this;
    UserFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    //console.log("userSeq = ", userSeq);
    checkAns(userSeq.length-1);
}

let allBtn = document.querySelectorAll(".btn");
for(btn of allBtn){
    btn.addEventListener("click", btnPress);
}

function reset(){
    scoreSeq.push(level);
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}