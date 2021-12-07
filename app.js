const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const ranges = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
canvas.width = 700;//java는 css의 data를 가져오지않으므로 html에 한번에해주거나
canvas.height = 700;//java에도 따로 해줘야함.
context.fillStyle = "white";
context.fillRect(0,0, canvas.width, canvas.height);
context.strokeStyle = "#2c2c2c";
context.fillStyle = "#2c2c2c";
context.lineWidth = 2.5;

let painting = false;
let filling = false;

function drag(event) {//어려우니 반복학습.
    x = event.offsetX
    y = event.offsetY
    if (!painting){
        context.beginPath(); //기존경로를 삭제하고, 새 경로를 만듦.
        context.moveTo(x, y);//지금의 좌표로 위치를 점을 옮겨줌
    }
    else {
        context.lineTo(x, y);//방금전 좌표에서 지금 좌표로 이어줌.
        context.stroke();//그 이어주는 선의 형태를 만들어줌.
    }
}

function start() {
    painting = true;
}

function end() {
    painting = false;
}

function enter(event) {
    x = event.offsetX;
    y = event.offsetY;
    context.moveTo(x,y);
}

function noreact(event) {
    event.preventDefault();
}

function changeColor(event) {
    const color = event.target.style.backgroundColor;
    context.strokeStyle = color;
    context.fillStyle = color;
}

function changeRange(event) {
    range = event.target.value;
    context.lineWidth = range;
}

function fullColor(event) {//스위치 기능을 하는 펑션으로, 알고리즘 생각해보기.
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}

function fill() {
    if (filling){
        context.fillRect(0,0, canvas.width, canvas.height);
    }
}

function picture() {
    const image = canvas.toDataURL();//기본값은 png이고, jpg로 하고싶으면 toDataURL("image/jpg")이런식으로.!
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", drag);
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mouseenter", enter);
    canvas.addEventListener("click", fill);
    canvas.addEventListener("contextmenu", noreact);
}

if (colors) {
    Array.from(colors).forEach(color => color.addEventListener("click", changeColor));//Array.from()하면 괄호안의 object들이 array가 됨.
}

if (ranges) {
    ranges.addEventListener("input", changeRange);
}

if (mode) {
    mode.addEventListener("click", fullColor);
}

if (save) {
    save.addEventListener("click", picture);
}