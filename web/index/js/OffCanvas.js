export default class OffCanvas
{
    constructor()
    {
        this.$button = document.querySelector('.showOffCanvas');
        this.$button.addEventListener('click', () => {
            this.renderCanvas();
        });
    }

    renderCanvas()
    {
        let $canvas       = document.createElement('div');
        $canvas.innerHTML = `<div class="offcanvas__wrapper">
        <div class="offcanvas">
            <div class="offcanvas__header"><i class="fas fa-times offcanvas__close"></i></div>
                <div class="offcanvas__body">
                ${this.getCanvasBody()}
                </div>
            </div>
        </div>`;

        $canvas = $canvas.firstChild;

        //close canvas
        $canvas.querySelector('.offcanvas__close').addEventListener('click', () => {
            $canvas.remove();
        });

        //display canvas
        document.body.appendChild($canvas);
    }

    /**
     * return html for settings
     *
     * @return {string}
     */
    getCanvasBody()
    {
        return `<div class="config">
    <header class="config__header">
        <h1># Settings #</h1>
    </header>
    <h2>Timer</h2><br>
    <div class="config__timer">
        <span>Focus:</span>
        <div class="input-form"><input id="focus-duration-input" type="number" value="25"> minutes</div>
        <span>Short Break:</span>
        <div class="input-form"><input id="short-break-input" type="number" value="5"> minutes</div>
        <span>Long Break:</span><br>
        <div class="input-form"><input id="long-break-input" type="number" value="15"> minutes</div>
        <span>Focus Sessions:</span><br>
        <label>Number of focus sessions between long breaks</label><br>
        <div class="input-form"><input id="focus-sessions-input" type="number" value="4"> minutes</div>
    </div>
    <hr>
    <h2>Volume</h2><br>
    <div class="config__volume">
        <div class="input-form"><input id="beep__volume" type="number" value="45"> %</div>
        <div id="beep__volume-test">Test</div>
    </div>
    <hr>
    <h2>Background Music</h2><br>
    <h3>Insert youtube video link here for music:</h3>
    <div class="config__music">
        <input id="yt-link-input" type="text" placeholder="https://youtu.be/liF6L9YUg2A">
    </div>

    <footer class="config__footer">
        <p id="delete-config-button">Delete config</p>
        <p id="save-config-button">Save</p>
    </footer>
</div>`;
    }
}

