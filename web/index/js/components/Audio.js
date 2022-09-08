export default class Audio
{
    constructor(volume)
    {
        this.init(volume);
    }

    init(volume)
    {
        this.config = JSON.parse(localStorage.getItem('config'));
        this.audioContext = new AudioContext();

        this.primaryGainControl = this.audioContext.createGain();
        this.primaryGainControl.gain.setValueAtTime(volume ?? (this.config ? parseInt(this.config.beepVolume) : 0.45), 0);
        this.primaryGainControl.connect(this.audioContext.destination);
    }

    /**
     * play a beep tone
     */
    beep()
    {
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