const $button        = document.querySelector('.showOffCanvas');
const $offCanvasBody = document.querySelector('.offCanvasBody').innerHTML ?? '';

$button.addEventListener('click', () => {
    renderCanvas();
});


function renderCanvas()
{
    let $canvas       = document.createElement('div');
    $canvas.innerHTML = `<div class="offcanvas__wrapper"><div class="offcanvas">
        <div class="offcanvas__header"><i class="fas fa-times offcanvas__close"></i></div>
        <div class="offcanvas__body">
           ${$offCanvasBody}
        </div>
    </div></div>`;

    $canvas = $canvas.firstChild;

    //display canvas
    document.body.appendChild($canvas);

    //close canvas
    $canvas.querySelector('.offcanvas__close').addEventListener('click', () => {
        $canvas.remove();
    });
}