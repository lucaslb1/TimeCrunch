// Keeps the time remaining so that the timer can be paused and restarted
let minutes = 25;
let timeRemaining = minutes*60*1000;
let time_string = null;
let defaultTitle = document.title;
let showTimeInTitle = true;
let intervalID = null;
let isRunning = false;


// timer background div
let timeTextBackground=document.getElementById("timeTextBackground");
timeTextBackground.addEventListener("onmouseover", timeMouseOver);
timeTextBackground.addEventListener("onmouseout", timeMouseOut);
timeTextBackground.addEventListener("click", toggleTimer);


//text
let text_field = document.getElementById("time_input");

let timeText = document.getElementById("timeText");
updateTime(timeRemaining);


//button
let startButton = document.getElementById("startButton");
startButton.addEventListener("click", startTimer);

let pauseButton = document.getElementById("pauseButton");
pauseButton.addEventListener("click", pauseTimer);

let reset_button = document.getElementById("resetButton");
reset_button.addEventListener("click", resetTimer);


// functions which deal the clicking or mousing over the time
function timeMouseOver(){

}

function timeMouseOut() {

}

function toggleTimer(){
    if(isRunning){
        pauseTimer();
    } else {
        startTimer();
    }
}



function resetTimer(){
    if(!isRunning){
        timeRemaining = minutes * 60 * 1000;
        updateTime(timeRemaining);

    }
}




//Updates the title time remaining
function updateTitleTime(time_str){

    if (showTimeInTitle && time_str && isRunning){
        document.title = "Remaining - " + time_str;
    } else {
        document.title=defaultTitle
    }
}


// Updates remaining time in all relevant places
function updateTime (time_remaining){
    let minutes = Math.floor(time_remaining / 60 / 1000).toString();
    let seconds = Math.floor((time_remaining / 1000) % 60).toString();
    if(seconds.length === 1){
        seconds = "0" + seconds;
    }

    let time_text = minutes + ":" + seconds;
    // Updates the text on the page
    timeText.innerText = time_text;
    updateTitleTime(time_text);

}


function startTimer (){
    console.log("start pressed");


    if(!intervalID && !isRunning) {
        isRunning = true;

        console.log("starting interval");
        let start_time = Date.now();
        intervalID = setInterval(function () {
            let delta = Date.now() - start_time;
            start_time = Date.now();
            timeRemaining -= delta;
            if(timeRemaining<=0){
                updateTime(0);
                timerEnd()
            } else {
                updateTime(timeRemaining)
            }

        }, 100);
    }

}

function timerEnd(){
    clearInterval(intervalID);
    intervalID=null;
}

function pauseTimer(){
    console.log("pause pressed");

    if(intervalID && isRunning) {
        isRunning = false;
        updateTitleTime();
        console.log("Paused interval");
        clearInterval(intervalID);
        intervalID = null
    }
}