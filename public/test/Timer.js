export default class Timer
{
    constructor()
    {
        this.timerWorker     = new Worker('./../worker.js');
        this.pausePlayButton = document.querySelector('#pause-play-button');
        this.$timeDisplay    = document.querySelector('#time-display');
        this.$displayPhase   = document.querySelector('#phase-display');
        this.config          = {
            focus:                 1500,
            short:                 300,
            long:                  900,
            roundsBeforeLongBreak: 4
        };
        //temporäre Speicherung der Timer Daten
        this.roundInfo       = {
            time:         0,
            focusNum:     1,
            currentPhase: 'focus',
            running:      false
        };

        this.init();
    }

    init()
    {
        //render time at start
        this.renderTime();
        this.renderPhaseDisplay();
        this.pausePlayButton.addEventListener('click', () => {
            this.pausePlay();
        });

        //trigger event every second and save time to roundInfo + set time in html
        this.timerWorker.addEventListener('message', (e) => {
            this.roundInfo.time = e.data.time;
            this.renderTime();
            if (!e.data.running) {
                this.nextRound();
            }
        });
    }

    /**
     * pause or play timer
     */
    pausePlay()
    {
        if (this.roundInfo.running === false) {
            this.timerWorker.postMessage({
                                             type:        'start',
                                             time:        this.roundInfo.time,
                                             maxDuration: this.config[this.roundInfo.currentPhase]
                                         });
            this.roundInfo.running = true;
        } else {
            this.timerWorker.postMessage({type: 'stop'});
            this.roundInfo.running = false;
        }
    }

    /**
     * render time in html element
     */
    renderTime()
    {
        let seconds = this.config[this.roundInfo.currentPhase] - this.roundInfo.time;
        if (seconds < 0) {
            this.nextRound();
            return;
        }

        let timeString = Math.floor(seconds / 60)
                             .toString()
                             .padStart(2, '0') + ':' + (seconds % 60).toString()
                                                                     .padStart(2, '0');

        this.$timeDisplay.innerHTML                           = timeString;
        //experimental
        document.querySelector('.document-title').textContent = timeString;
    }

    renderPhaseDisplay()
    {
        if (this.roundInfo.currentPhase !== 'focus') {
            this.$displayPhase.textContent = 'Take a break!';
            //$displayPhase.style.color = '#57daa3'
        } else {
            this.$displayPhase.textContent = 'Focus!';
            //$displayPhase.style.color = 'rgba(255,37,0,0.35)'
        }
    }


    /**
     * switch phases
     */
    nextRound()
    {
        if (this.roundInfo.currentPhase === 'focus') {
            if (this.roundInfo.focusNum === this.config.roundsBeforeLongBreak) {
                this.roundInfo.currentPhase = 'long';
                this.roundInfo.focusNum     = 0;
            } else {
                this.roundInfo.currentPhase = 'short';
            }

        } else {
            this.roundInfo.currentPhase = 'focus';
            this.roundInfo.focusNum++;
        }

        this.roundInfo.time = 0;
        this.renderTime();
        this.renderPhaseDisplay();
        if (this.roundInfo.running) {
            this.timerWorker.postMessage({
                                             type:        'start',
                                             maxDuration: this.config[this.roundInfo.currentPhase]
                                         });
        }
    }
}