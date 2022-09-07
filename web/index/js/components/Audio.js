export default class Audio
{
    constructor()
    {
        this.init();
    }

    init()
    {
        this.audioContext = new AudioContext();

        this.primaryGainControl = this.audioContext.createGain();
        this.primaryGainControl.gain.setValueAtTime(0.05, 0);
        this.primaryGainControl.connect(this.audioContext.destination);
    }

    /**
     * play a beep tone
     */
    beep()
    {
        console.log('beep');
        const oscillator = this.audioContext.createOscillator();
        oscillator.frequency.setValueAtTime(260, 0);
        oscillator.type = 'sine';

        const oscillatorGain = this.audioContext.createGain();
        oscillatorGain.gain.setValueAtTime(1.5, 0);
        oscillatorGain.gain.exponentialRampToValueAtTime(
            0.02,
            this.audioContext.currentTime + 0.5
        );

        oscillatorGain.connect(this.primaryGainControl);
        oscillator.connect(oscillatorGain);
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }
}