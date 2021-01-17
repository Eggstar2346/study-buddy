var h1 = document.getElementById('workTime'),
    start = document.getElementById('start'),
    pause = document.getElementById('pause'),
    stopp = document.getElementById('stop');

var time = 0;
var running = false;
var breakTime = false;

function showTime(time) {
    var sec = time % 60;
    var mins = Math.floor(time / 60);
    var hours = Math.floor(time / 3600);
    
    var time_shown = "";
    
    if (sec <= 9) {
        time_shown += ":0" + sec;
    }
    
    else {
        time_shown = ":" + sec;
    }
    
    if (mins <= 9) {
        time_shown = ":0" + mins + time_shown;
    }
    
    else {
        time_shown = ":" + mins + time_shown;
    }
    
    time_shown = "0" + hours + time_shown;

    return time_shown;
}

function startTime() {
    running = true;
    breakTime = false;
}

function pauseTime() {
    breakTime = true;
    running = false;
}

function stopTime() {
    breakTime = false;
    running = false;
}

function updateTime() {
    if (running) {
        time += 1;
        h1.textContent = showTime(time);
    }
}

start.onclick = startTime;
pause.onclick = pauseTime;
stopp.onclick = stopTime;

setInterval(updateTime, 1000)

