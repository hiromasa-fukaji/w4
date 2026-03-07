let resSlider, resText;
let aspect, h, w;
let resnum = -1;
let coldiv = 3;
let linenum = 2;
let imgs = [];
let imagenames = ['image.jpg', 'image.jpg', 'image.jpg'];

// 各画像ごとの線色と線幅スケール [太い側, 細い側]
let lineColors = ['#fff000ff', '#6097eaff', '#000000ff'];
let lineWidths = [
    [1.0, 0.1],
    [0.5, 0.0],
    [0.25, 0.0]
];

function preload() {
    for (let i = 0; i < imagenames.length; i++) {
        imgs.push(loadImage(imagenames[i]));
    }
}

function setup() {
    h = 148 * 5;
    w = 100 * 5;
    aspect = w / h;
    createCanvas(w, h);
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].resize(w, h);
        imgs[i].filter(BLUR, 5);
        imgs[i].loadPixels();
    }
    colorMode(RGB);
    background(255);
    pixelDensity(1);
    setupUIs();
    updateUIs();
}

function draw() {
    updateUIs();
}

function setupUIs() {
    let saveBtn = createButton('Save Image');
    saveBtn.position(18, 35);
    saveBtn.mousePressed(() => saveCanvas('output', 'png'));
    let svgBtn = createButton('Save SVG');
    svgBtn.position(18, 60);
    svgBtn.mousePressed(() => save('output.svg'));
    resSlider = createSlider(5, 50, 40, 1);
    resSlider.position(15, 10);
    resSlider.size(150);
    resText = createP('');
    resText.position(170, -8);
}

function updateUIs() {
    if (resnum != resSlider.value()) {
        resnum = resSlider.value();
        resText.elt.innerHTML = resnum;
        drawVerticalThickLines();
    }
}

function drawVerticalThickLines() {
    background(255);
    let resnumX = resnum;
    let resnumY = resnum / aspect;
    noFill();
    strokeCap(SQUARE);


    for (let t = 0; t < imgs.length; t++) {
        let img = imgs[t];
        stroke(lineColors[t]);
        for (let i = 0; i < resnumX; i++) {
            for (let n = 0; n < resnumY; n++) {
                let sx = width / resnumX;
                let sy = height / resnumY;
                let xindex = round(min((i + 0.5) * sx, width));
                let yindex = round(min((n + 0.5) * sy, height));
                let index = min(xindex + yindex * img.width, img.pixels.length / 4 - 1);
                let col = color(img.pixels[index * 4], img.pixels[index * 4 + 1], img.pixels[index * 4 + 2]);
                let bri = brightness(col) / 100.0;
                let colindex = min(floor(bri * coldiv), coldiv - 1);
                strokeWeight(map(colindex, 0, coldiv - 1, sx * lineWidths[t][0], sx * lineWidths[t][1]));
                for (let j = 0; j < linenum; j++) {
                    let lx = sx * i + sx / linenum * j;
                    let ly1 = sy * n;
                    let ly2 = sy * (n + 1) + 0.5;
                    line(lx + sx * 0.25, ly1, lx + sx * 0.25, ly2);
                }
            }
        }
    }

}

