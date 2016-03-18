function chooseMode(t){
    document.getElementById('timer').innerHTML = t;
    timer(t);    
}

function timer(time){
    var timerDiv = document.getElementById("timer");
    
    timerDiv.innerHTML=--time;
    if(timerDiv.innerHTML==0){
        alert('Game over');
        setTimeout( function(){}, 1000);
    }
    else{
        setTimeout( function(){timer(time)},1000 );
    }
}

function restart(){

}