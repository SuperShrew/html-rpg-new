const gameArea = document.getElementById("game");
const ctx = gameArea.getContext("2d");
const elements = [];
const menuBox = document.getElementById("menu");
menuBox.innerHTML += "<h1> test </h1>";
//ctx.fillStyle = "red";
//ctx.fillRect(50, 50, 150, 75);
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();

class Element {
    constructor(type, width, height, x, y, colour, offsetx, offsety, parent, id) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.offsetx = offsetx;
        this.offsety = offsety;
        this.parent = parent;
        this.id = id;
    }
}

elements.push(new Element("rect", 40, 40, 40, 40, "red", 0, 0, null, "player"));

function clear() {
    ctx.clearRect(0, 0, 512, 512);
}
function colours(colour1, colour2) { // add colour 3 4 and 5 for button text and body colours
    if (colour1 == null && colour2 == null) {
        menuBox.innerHTML = `
            Colour 1: <input type="text" name="c1" value = "#00ff00"><br>
            Colour 2: <input type="text" name="c2" value = "#0000ff"><br><br>
            <button onclick="colours(document.getElementsByName('c1'), document.getElementsByName('c2'))">Confirm Colours</button>
            <button onclick="switchText()">Flip text colour</button>
        `;
    } else if (colour1[0] && colour2[0]) {
        let elements = document.querySelectorAll(".window");
        elements.forEach(element => {
            element.style.backgroundColor = colour1[0].value;
            element.style.borderColor = colour2[0].value;
        });
    }
}

function move(element, deltax, deltay) {
    element.x += deltax;
    element.y += deltay;
    if (element.children) {
        element.children.forEach(child => {
            if (isClass(child)) {
                move(child, deltax, deltay);
            }
        });
    }
    drawCanvas();
}
function drawCanvas() {
    ctx.clearRect(0, 0, 512, 512);
    elements.forEach(element => {
        if (element.type == "rect") {
            draw(element);
        } else {
            // logic for when sprite images are used
        }
    })
}
function draw(element) {
    ctx.fillStyle = element.colour;
    ctx.fillRect(element.x, element.y, element.width, element.height);
    if(element.children) {
        element.children.forEach(child => {
            if (isClass(child)) {
                draw(child);
            }
        });
    }
}
