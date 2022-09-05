export default class ConfigScript
{
    constructor()
    {
        this.init();
    }

    init()
    {
        const $saveBtn      = document.querySelector('#save-config-button');
        const $deleteButton = document.querySelector('#delete-config-button');

        $saveBtn.addEventListener('click', () => {
            const $link          = document.querySelector('#yt-link-input').value;
            const $focus         = parseInt(document.querySelector('#focus-duration-input').value) * 60;
            const $shortBreak    = parseInt(document.querySelector('#short-break-input').value) * 60;
            const $longBreak     = parseInt(document.querySelector('#long-break-input').value) * 60;
            const $focusSessions = parseInt(document.querySelector('#focus-sessions-input').value);
            document.dispatchEvent(
                new CustomEvent('save-config', {
                    detail: {
                        videoId:               this.extractVideoIdFromLink($link),
                        focus:                 $focus,
                        short:                 $shortBreak,
                        long:                  $longBreak,
                        roundsBeforeLongBreak: $focusSessions
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
        console.log(link);
        let position = link.lastIndexOf('=');
        if (position === -1) {
            position = link.lastIndexOf('/');
        }
        return link.slice(position + 1);
    }
}