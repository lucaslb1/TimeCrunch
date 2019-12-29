// Lucas Battelle 2019
// timer.js deals with the logic and actual operation of the timer

let debugMode = true;



//--------------------------------------------------------Constants

//The default long and short times in minutes
const defaultTimes = [25, 5];

//The default title displayed when timer is not running
const defaultTitle = document.title;



//--------------------------------------------------------State Variables

//Is the timer running currently/going down?
let isRunning = false;

//Time remaining for current timer
let timeRemaining = defaultTimes[0]*60*1000;

//Is the current timer the work or rest timer
// 0 for longer work period, 1 for the short rest period
let timerState = 0;

//Holds the intervalId
let intervalID = null;



//-------------------------------------------------------Customizable Options

// Shows the time remaining in the windows title tab when active
let showTimeInTitle = true;



//-------------------------------------------------------Document Element Stuff

// Timer background div
// Clicking on the time will toggle the timer to start and pause
let timeTextBackground=document.getElementById("timeTextBackground");
timeTextBackground.addEventListener("click", toggleTimer);


//Text
let text_field = document.getElementById("time_input");

// The actual time text displayed on the browser page
let timeText = document.getElementById("timeText");
updateTime(timeRemaining);


//Buttons
let startButton = document.getElementById("startButton");
startButton.addEventListener("click", startTimer);

let pauseButton = document.getElementById("pauseButton");
pauseButton.addEventListener("click", pauseTimer);

let reset_button = document.getElementById("resetButton");
reset_button.addEventListener("click", resetTimer);



//-------------------------------------------------------Control Functions

// Activated by clicking on the time
function toggleTimer(){
    if(isRunning){
        pauseTimer();
    } else {
        startTimer();
    }
}

//Starts timer from a pause or stop
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
                timerEnd();
            } else {
                updateTime(timeRemaining)
            }

        }, 100);
    }

}

// Pauses timer while running
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

// Called when timer reaches 00:00
function timerEnd(){
    pauseTimer();
    playSound(1);
    timerState = (timerState+1) % defaultTimes.length;
    resetTimer();
    startTimer();
}


// Resets timer
function resetTimer(){
    if(!isRunning){
        timeRemaining = defaultTimes[timerState] * 60 * 1000;
        updateTime(timeRemaining);

    }
}



//--------------------------------------------------------Update Functions

// Highest update function
// Updates remaining time in all relevant places
function updateTime (time_remaining){
    let minutes = Math.floor(time_remaining / 60 / 1000).toString();
    let seconds = Math.floor((time_remaining / 1000) % 60).toString();
    if(seconds.length === 1){
        seconds = "0" + seconds;
    }
    if(minutes.length === 1){
        minutes = "0" + minutes;
    }

    let time_text = minutes + ":" + seconds;

    // Updates the text on the page and in the title
    timeText.innerText = time_text;
    updateTitleTime(time_text);

}

//Updates the title time remaining
function updateTitleTime(time_str){

    if (showTimeInTitle && time_str && isRunning){
        document.title = "Work - " + time_str;
    } else {
        document.title=defaultTitle
    }
}



//--------------------------------------------------------Utility Functions

// Plays sounds
// input is sound number
function playSound(x){
    if(x === 1){
        let snd = new Audio("/static/audio/alert1.wav");
        snd.play();
    }
}
