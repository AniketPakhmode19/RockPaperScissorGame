const score=JSON.parse(localStorage.getItem('score'))||{
    wins:0,
    loses:0,
    ties:0,
}

function updateScore(){
    document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties};`
}
updateScore();

function pickComputerMove(){
    const randomMove=Math.random();
    let computerMove='';
    if(randomMove>=0 && randomMove<=1/3){
        computerMove='rock';
    }
    else if(randomMove>=1/3 && randomMove<=2/3){
        computerMove='paper';
    }
    else if(randomMove>=2/3 && randomMove<=1){
        computerMove='scissor';
    }
    console.log(computerMove);
    return computerMove;
}

let isAutoPlaying=false;
let intervalID;

//  const autoplay=()=>{}... can be use below but due to hoisting issue we us the simple function instead, and is easy to read.

function autoplay(){
    if(!isAutoPlaying){
      intervalID= setInterval(()=>{
        const playerMove=pickComputerMove();
        playGame(playerMove);
        },1000);
        isAutoPlaying=true;
    }
    else{
        clearInterval(intervalID);
        isAutoPlaying=false;
    }
  
}

document.querySelector('.js-rock').addEventListener('click',()=>{
    playGame('rock');
});
document.querySelector('.js-paper').addEventListener('click',()=>{
    playGame('paper');
});
document.querySelector('.js-scissor').addEventListener('click',()=>{
    playGame('scissor');
});
document.querySelector('.js-auto').addEventListener('click',()=>{
    autoplay('isAutoPlaying');
});
document.querySelector('.js-reset').addEventListener('click',()=>{
    score.wins=0,score.loses=0,score.ties=0;
    localStorage.removeItem('score');
    updateScore();
});

document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
        playGame('rock');
    }
    else if(event.key==='p'){
        playGame('paper');
    }
    else if(event.key==='s'){
        playGame('scissor');
    }
});

function playGame(playerMove){
    const computerMove=pickComputerMove();
    let result='';
    if(playerMove==='rock'){
        if(computerMove==='rock'){
            result='Tie';
        }
        else if(computerMove==='paper'){
            result='You Lose';
        }
        else if(computerMove==='scissor'){
            result='You Win';
        }
    }
    else if(playerMove==='paper'){
        if(computerMove==='rock'){
            result='You Win';
        }
        else if(computerMove==='paper'){
            result='Tie';
        }
        else if(computerMove==='scissor'){
            result='You Lose';
        }
    }
    else if(playerMove==='scissor'){
        if(computerMove==='rock'){
            result='You Lose';
        }
        else if(computerMove==='paper'){
            result='You Win';
        }
        else if(computerMove==='scissor'){
            result='Tie'
        }
    }
    if(result==='You Win'){
        score.wins+=1;
    }
    else if(result==='You Lose'){
        score.loses+=1;
    }
    else if(result==='Tie'){
        score.ties+=1;
    }

    localStorage.setItem('score',JSON.stringify(score));

    updateScore();

    document.querySelector('.js-result').innerHTML=`Result : ${result}`;

    document.querySelector('.js-move').innerHTML=`You Select: ${playerMove} & Computer Select: ${computerMove}`
}