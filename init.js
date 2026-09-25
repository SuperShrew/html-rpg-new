const gameArea = document.getElementById("game");
const menuBox = document.getElementById("menu");
menuBox.innerHTML += "<h1> test </h1>";

function colours(theme) {
    if (theme == null) {
        menuBox.innerHTML = `
            <button onclick="colours(1)">click1</button>
        `;
    } else if (theme == 1) {
        menuBox.innerHTML = "test2";
    }
}
