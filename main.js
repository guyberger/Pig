
var maxScore = prompt("Enter max score to reach");
maxScore = (maxScore == 0) ? 100 : maxScore;

var tot_scores, scores, currScore, activePlayer, winner = 0;
tot_scores = [0, 0];
init();

document.getElementById("restart").addEventListener('click', function(){
    document.getElementById("restart").style.display = "none";
    document.getElementById("dice").style.display = "inline-block";
    document.getElementById("roll").style.display = "block";
    document.getElementById("hold").style.display = "block";
    init();
})

document.getElementById("hold").addEventListener('click', function(){
    scores[activePlayer-1] += currScore;
    document.getElementById("score-tot-" + activePlayer).innerText = scores[activePlayer-1];
    
    //check for a win
    if(scores[activePlayer-1] >= maxScore){
        document.getElementById("player-" + activePlayer).textContent = "Winner!";
        tot_scores[activePlayer-1] += 1;
        document.getElementById("tot-scores").textContent = tot_scores[0] +":"+ tot_scores[1];
        if(tot_scores[0] == tot_scores[1])
            winner = 0;
        else
            winner = (tot_scores[0] > tot_scores[1]) ? 1 : 2;
        if(winner){
            document.getElementById("crown-img-" + winner).style.display = "inline-block";
            document.getElementById("crown-img-" + (3-winner)).style.display = "none";
        }
        else{
            document.getElementById("crown-img-1").style.display = "none";
            document.getElementById("crown-img-2").style.display = "none";
        }
        endGame();
    }
    else
        nextPlayer();
})

document.getElementById("roll").addEventListener('click', function(){
    var dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice").src = "dice-" + dice + ".png";

    // if dice is 1 => current counter is 0 and the turn moves to the other player.
    if(dice === 1){
        nextPlayer();
    }
    // else add current score to total.
    else{
        currScore += dice;
        document.getElementById("curr-" + activePlayer).innerHTML = currScore;
    }
})

function nextPlayer(){
    document.getElementById("curr-" + activePlayer).innerHTML = '0';
    document.getElementById("game-panel-" + activePlayer).style.boxShadow = "none";
    document.getElementById("game-panel-" + activePlayer).style.zIndex = "0";
    document.getElementById("game-panel-" + activePlayer).style.opacity = "0.4";
    activePlayer = (activePlayer === 1) ? 2 : 1;
    document.getElementById("game-panel-" + activePlayer).style.boxShadow = "0px 0px 10px 0px rgb(255, 226, 173)";
    document.getElementById("game-panel-" + activePlayer).style.zIndex = "1";
    document.getElementById("game-panel-" + activePlayer).style.opacity = "1";
    currScore = 0;
}

function init(){
    scores = [0,0];
    currScore = 0;
    activePlayer = 1;
    document.getElementById("dice").src = "dice-1.png";
    document.getElementById("player-1").textContent = "Player 1";
    document.getElementById("game-panel-1").style.boxShadow = "0px 0px 10px 0px rgb(255, 226, 173)";
    document.getElementById("game-panel-1").style.zIndex = "1";
    document.getElementById("game-panel-1").style.opacity = "1";
    document.getElementById("player-2").textContent = "Player 2";
    document.getElementById("game-panel-2").style.opacity = "0.4";
    document.getElementById("score-tot-1").textContent = '0';
    document.getElementById("score-tot-2").textContent = '0';
    document.getElementById("curr-1").innerHTML = '0';
    document.getElementById("curr-2").innerHTML = '0';

    document.getElementById("restart").style.display = "none";
}
function endGame(){
    document.getElementById("restart").style.display = "block";
    document.getElementById("dice").style.display = "none";
    document.getElementById("roll").style.display = "none";
    document.getElementById("hold").style.display = "none";
    //init();
}