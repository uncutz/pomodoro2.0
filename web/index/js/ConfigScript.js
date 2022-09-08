import Audio from './components/Audio.js';

export default class ConfigScript
{
    constructor()
    {
        this.init();
    }

    init()
    {
        this.config = JSON.parse(localStorage.getItem('config')) ?? false;
        this.loadStoredValues();
        document.querySelector('#beep__volume-test').addEventListener('click', () => {
            const volume = parseInt(document.querySelector('#beep__volume').value) / 100;
            (new Audio(volume)).beep();
        });

        const $saveBtn      = document.querySelector('#save-config-button');
        const $deleteButton = document.querySelector('#delete-config-button');

        $saveBtn.addEventListener('click', () => {
            const $link          = document.querySelector('#yt-link-input').value;
            const $focus         = parseInt(document.querySelector('#focus-duration-input').value) * 60;
            const $shortBreak    = parseInt(document.querySelector('#short-break-input').value) * 60;
            const $longBreak     = parseInt(document.querySelector('#long-break-input').value) * 60;
            const $focusSessions = parseInt(document.querySelector('#focus-sessions-input').value);
            const $beepVolume    = document.querySelector('#beep__volume').value / 100;
            document.dispatchEvent(
                new CustomEvent('save-config', {
                    detail: {
                        videoId:               this.extractVideoIdFromLink($link),
                        focus:                 $focus,
                        short:                 $shortBreak,
                        long:                  $longBreak,
                        roundsBeforeLongBreak: $focusSessions,
                        beepVolume:            $beepVolume
                    }
                }));
        });

        $deleteButton.addEventListener('click', () => {
            localStorage.removeItem('config');
            location.reload();
        });
    }

    extractVideoIdFromLink(link)
    {
        let position = link.lastIndexOf('=');
        if (position === -1) {
            position = link.lastIndexOf('/');
        }
        return link.slice(position + 1);
    }

    loadStoredValues()
    {
        if (this.config) {
            document.querySelector('#yt-link-input').value        = this.config.videoId ?
                'https://youtu.be/' + this.config.videoId : '';
            document.querySelector('#focus-duration-input').value = (this.config.focus / 60) ?? 25;
            document.querySelector('#short-break-input').value    = (this.config.short / 60) ?? 5;
            document.querySelector('#long-break-input').value     = (this.config.long / 60) ?? 15;
            document.querySelector('#focus-sessions-input').value = this.config.roundsBeforeLongBreak ?? 4;
            document.querySelector('#beep__volume').value         = parseFloat(this.config.beepVolume) * 100 ?? 45;
        }
    }
}