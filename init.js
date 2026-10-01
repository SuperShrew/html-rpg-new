const gameArea = document.getElementById("game");
const ctx = gameArea.getContext("2d");
const elements = []; // array of game elements
const menuBox = document.getElementById("menu");
const width = gameArea.width;
const height = gameArea.height;
var background = gameArea.style.backgroundColor;
menuBox.innerHTML += "<h1> test </h1>";
//ctx.fillStyle = "red";
//ctx.fillRect(50, 50, 150, 75);
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();

class Element { // class for all elements on the screen, could be replaced with an object in the future depending on performance and stuff
    constructor(type, width, height, x, y, colour, offsetx, offsety, parent, id, friction=1) {
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
        this.friction = friction;
    }
}

elements.push(new Element("rect", 40, 40, 40, 40, "red", 0, 0, null, "player"));
elements.push(new Element("rect", 100, 100, 250, 200, "purple", 0, 0, null, "bigolblock"));
elements.push(new Element("rect", 100, 100, 400, 100, "green", 0, 0, null, "bigolsand", 0.2));

function clear() { //obselite
    ctx.clearRect(0, 0, 512, 512);
}

function colours(colour1, colour2) { // add colour 3 4 and 5 for button text and body colours
    if (colour1 == null && colour2 == null) { // creates menu in bottom text box for customising the window themes
        menuBox.innerHTML = `
            Colour 1: <input type="text" name="c1" value = "#00ff00"><br>
            Colour 2: <input type="text" name="c2" value = "#0000ff"><br><br>
            <button onclick="colours(document.getElementsByName('c1'), document.getElementsByName('c2'))">Confirm Colours</button>
            <button onclick="switchText()">Flip text colour</button>
        `;
    } else if (colour1[0] && colour2[0]) { // applies new colours
        let windows = document.querySelectorAll(".window");
        windows.forEach(element => {
            element.style.backgroundColor = colour1[0].value;
            element.style.borderColor = colour2[0].value;
        });
    }
}

function move(element, deltax, deltay) { // moves elements by a set interval (incl children)
    element.x += deltax;
    element.y += deltay;
    if (element.children) {
        element.children.forEach(child => {
            if (isClass(child)) {
                move(child, deltax, deltay);
            }
        });
    }
}
function moveTo(element, x, y) { // moves elements to specific coordinates (inc children)
    element.x = x;
    element.y = y;
    if (element.children) {
        element.children.forEach(child => {
            if (isClass(child)) {
                moveTo(child, x, y);
            }
        });
    }
}
function drawCanvas() { // iterates through all elements and draws each one onto the canvas
    ctx.clearRect(0, 0, width, height);
    elements.forEach(element => {
        if (element.type == "rect") {
            draw(element);
        } else if (element.type == "sprite") {
            // logic for when sprite images are used
        }
    });
    draw(elements.find(e => e.id == "player"));
}
function draw(element) { // draws a specific element to the canvas (inc children)
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
function checkCollisions(element) {
    let o = null
    elements.forEach(object => {
        let x1 = element.x;
        let x2 = object.x;
        let y1 = element.y;
        let y2 = object.y;
        let xw1 = element.x + element.width;
        let xw2 = object.x + object.width;
        let yh1 = element.y + element.height;
        let yh2 = object.y + object.height;
        if (object == element) {
            console.log("passed player");
        } else if ((xw1 > x2  && x1 < xw2) && (yh1 > y2 && y1 < yh2)) {
            o = object;
            return;
        } else if ((xw2 > x1  && x2 < xw1) && (yh2 > y1 && y2 < yh1)) {
            o = object;
            return;
        }
    });
    if (o) {
        return [element, o];
    } else {
        return false;
    }
}
