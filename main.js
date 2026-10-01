var keysPressed = {};

document.addEventListener("keydown", function onEvent(event) {
    keysPressed[event.key] = true;
});
document.addEventListener("keyup", function onEvent(event) {
    keysPressed[event.key] = false;
});
console.log("Waw");

let player = null;
const maxSpeed = 1.8;
let speed = 1.8;

elements.forEach(element => {
    if (element.id == "player") {
        player = element;
        console.log(player);
    }
});

function update() {
    let prevx = player.x;
    let prevy = player.y
    console.log(prevx);
    console.log(prevy);

    if (keysPressed["a"]) {
        move(player, -speed, 0);
        let collisions = checkCollisions(player);
        if (collisions != false && collisions[1].friction == 1) {
            player.x = prevx;
            player.y = prevy;
        } else {
            prevx = player.x;
            prevy = player.y;
        }
    }
    if (keysPressed["s"]) {
        move(player, 0, speed);
        let collisions = checkCollisions(player);
        if (collisions != false && collisions[1].friction == 1) {
            player.x = prevx;
            player.y = prevy;
        } else {
            prevx = player.x;
            prevy = player.y;
        }
    }
    if (keysPressed["d"]) {
        move(player, speed, 0);
        let collisions = checkCollisions(player);
        if (collisions != false && collisions[1].friction == 1) {
            player.x = prevx;
            player.y = prevy;
        } else {
            prevx = player.x;
            prevy = player.y;
        }
    }
    if (keysPressed["w"]) {
        move(player, 0, -speed);
        let collisions = checkCollisions(player);
        if (collisions != false && collisions[1].friction == 1) {
            player.x = prevx;
            player.y = prevy;
        } else {
            prevx = player.x;
            prevy = player.y;
        }
    }
    if (player.x > width-player.width) {
        player.x = width-player.width;
    }
    if (player.y > height-player.height) {
        player.y = height-player.height;
    }
    let collisions = checkCollisions(player);
    if (collisions != false) {
        speed = maxSpeed*collisions[1].friction;
        console.log("bump(ish)");
    } else {
        speed = maxSpeed;
    }
    player.y = Math.abs(player.y);
    player.x = Math.abs(player.x);

    drawCanvas();
    requestAnimationFrame(update);
}

requestAnimationFrame(update);
