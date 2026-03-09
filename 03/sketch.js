let seed = 1000000;
let splitnum = 166;
let shift = 200;

let splitSlider, shiftSlider;
let splitText, shiftText;

function preload() {
    img = loadImage('image.jpg');
}

function setup() {
    h = 148 * 5;
    w = 500;
    aspect = w / h;
    createCanvas(w, h);

    img.resize(w, h);

    colorMode(RGB);
    background(255);

    noLoop();

    let button = createButton('Save Image');
    button.position(18, 70);
    button.mousePressed(() => saveCanvas('output', 'png'));

    splitSlider = createSlider(2, 200, splitnum, 1);
    splitSlider.position(15, 15);
    splitSlider.size(100);
    splitSlider.input(redrawImage);
    splitText = createP('split: ' + splitnum);
    splitText.position(120, -5);

    shiftSlider = createSlider(0, 500, shift, 1);
    shiftSlider.position(15, 40);
    shiftSlider.size(100);
    shiftSlider.input(redrawImage);
    shiftText = createP('shift: ' + shift);
    shiftText.position(120, 20);

    redrawImage();
}

function redrawImage() {
    splitnum = splitSlider.value();
    shift = shiftSlider.value();
    splitText.html('split: ' + splitnum);
    shiftText.html('shift: ' + shift);
    noiseSeed(seed);

    // 画像を縦に引き伸ばし（ずらしても画面を埋めるように）
    let stretchH = height + shift * 2;
    let stretched = createImage(width, stretchH);
    stretched.copy(img, 0, 0, img.width, img.height, 0, 0, width, stretchH);

    background('#4126f0ff');
    let xstep = floor(width / splitnum);
    for (let i = 0; i < splitnum; i++) {
        let x = xstep * i;
        let y = map(noise(i * 0.5), 0, 1, -shift, shift);
        let sw = (i < splitnum - 1) ? xstep : width - x;

        let sy = round(shift - y);
        copy(stretched, x, sy, sw, height, x, 0, sw, height);
    }
}
