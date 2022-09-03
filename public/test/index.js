const timerWorker     = new Worker('./../worker.js');
const pausePlayButton = document.querySelector('#pause-play-button');
const $timeDisplay    = document.querySelector('#time-display');
const $displayPhase   = document.querySelector('#phase-display');

let config = {
    focus:                 1500,
    short:                 300,
    long:                  900,
    roundsBeforeLongBreak: 4
};

//temporäre Speicherung der Timer Daten
let roundInfo = {
    time:         0,
    focusNum:     1,
    currentPhase: 'focus',
    running:      false
};

//render time at start
renderTime();
renderPhaseDisplay();

/////////////////////////Eventlistener////////////////////////
pausePlayButton.addEventListener('click', pausePlay);

//trigger event every second and save time to roundInfo + set time in html
timerWorker.addEventListener('message', (e) => {
    roundInfo.time = e.data.time;
    renderTime();
    if (!e.data.running) {
        nextRound();
    }
});


/////////////////////////Functions////////////////////////

/**
 * pause or play timer
 */
function pausePlay()
{
    if (roundInfo.running === false) {
        timerWorker.postMessage({
                                    type:        'start',
                                    time:        roundInfo.time,
                                    maxDuration: config[roundInfo.currentPhase]
                                });
        roundInfo.running = true;
    } else {
        timerWorker.postMessage({type: 'stop'});
        roundInfo.running = false;
    }
}

/**
 * render time in html element
 */
function renderTime()
{
    let seconds = config[roundInfo.currentPhase] - roundInfo.time;
    if (seconds < 0) {
        nextRound();
        return;
    }

    let timeString = Math.floor(seconds / 60)
                         .toString()
                         .padStart(2, '0') + ':' + (seconds % 60).toString()
                                                                 .padStart(2, '0');

    $timeDisplay.innerHTML                                = timeString;
    //experimental
    document.querySelector('.document-title').textContent = timeString;
}

function renderPhaseDisplay()
{
    if (roundInfo.currentPhase !== 'focus') {
        $displayPhase.textContent = 'Take a break!';
        //$displayPhase.style.color = '#57daa3'
    } else {
        $displayPhase.textContent = 'Focus!';
        //$displayPhase.style.color = 'rgba(255,37,0,0.35)'
    }
}

/**
 * switch phases
 */
function nextRound()
{
    if (roundInfo.currentPhase === 'focus') {
        if (roundInfo.focusNum === config.roundsBeforeLongBreak) {
            roundInfo.currentPhase = 'long';
            roundInfo.focusNum     = 0;
        } else {
            roundInfo.currentPhase = 'short';
        }

    } else {
        roundInfo.currentPhase = 'focus';
        roundInfo.focusNum++;
    }

    roundInfo.time = 0;
    renderTime();
    renderPhaseDisplay();
    if (roundInfo.running) {
        timerWorker.postMessage({
                                    type:        'start',
                                    maxDuration: config[roundInfo.currentPhase]
                                });
    }
}