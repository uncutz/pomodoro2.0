export default class YtPlayer
{
    constructor(videoLink)
    {
        let position = videoLink.lastIndexOf('=');
        if (position === -1) {
            position = videoLink.lastIndexOf('/');
        }
        const videoId = videoLink.slice(position + 1);

        const tag            = document.createElement('script');
        tag.src              = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        let player;

        function onYouTubeIframeAPIReady()
        {
            player = new YT.Player('player', {
                height:  '',
                width:   '',
                videoId: videoId
            });
        }
    }
}