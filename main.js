var keysPressed = {};

document.addEventListener("keydown", function onEvent(event) {
    keysPressed[event.key] = true;
});
document.addEventListener("keyup", function onEvent(event) {
    keysPressed[event.key] = false;
});
console.log("Waw");

let player = null;
let speed = 1.5;

elements.forEach(element => {
    if (element.id == "player") {
        player = element;
        console.log(player);
    }
});

function update() {
    if (keysPressed["a"]) {
        move(player, -speed, 0);
    }
    if (keysPressed["s"]) {
        move(player, 0, speed);
    }
    if (keysPressed["d"]) {
        move(player, speed, 0);
    }
    if (keysPressed["w"]) {
        move(player, 0, -speed);
    }
    if (player.x > width-player.width) {
        player.x = width-player.width;
    }
    if (player.y > height-player.height) {
        player.y = height-player.height;
    }
    player.y = Math.abs(player.y);
    player.x = Math.abs(player.x);

    drawCanvas();
    requestAnimationFrame(update);
}

requestAnimationFrame(update);
