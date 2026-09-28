var keysPressed = {};

document.addEventListener("keydown", function onEvent(event) {
    keysPressed[event.key] = true;
});
document.addEventListener("keyup", function onEvent(event) {
    keysPressed[event.key] = false;
});
console.log("Waw");

function update() {
    //move(keysPressed);

    requestAnimationFrame(update);
}

requestAnimationFrame(update);
