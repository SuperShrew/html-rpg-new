const gameArea = document.getElementById("game");
const menuBox = document.getElementById("menu");
menuBox.innerHTML += "<h1> test </h1>";

function colours(colour1, colour2) { // add colour 3 4 and 5 for button text and body colours
    if (colour1 == null && colour2 == null) {
        menuBox.innerHTML = `
            Colour 1: <input type="text" name="c1" value = "#00ff00"><br>
            Colour 2: <input type="text" name="c2" value = "#0000ff"><br><br>
            <button onclick="colours(document.getElementsByName('c1'), document.getElementsByName('c2'))">Confirm Colours</button>
            <button onclick="switchText()">Flip text colour</button>
        `;
    } else if (colour1[0] && colour2[0]) {
        console.log("wawo");
        let elements = document.querySelectorAll(".window");
        elements.forEach(element => {
            element.style.backgroundColor = colour1[0].value;
            console.log("sigh");
            element.style.borderColor = colour2[0].value;
        });
    }
}
