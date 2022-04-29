const game = document.querySelector(".game-board");
const inventoryEl = document.querySelector("#inventory");
const opening = document.querySelector(".opening");
const gameContainer = document.querySelector(".container");
const startBtn = document.querySelector(".opening button");
const sky = document.querySelector(".sky");
const cloud = document.querySelector(".cloud");
const trunk = document.querySelector(".trunk");
const tree = document.querySelector(".tree");
const stone = document.querySelector(".stone");
const grass = document.querySelector(".grass");
const dirt = document.querySelector(".dirt");
const shovel = document.querySelector(".shovel");
const axe = document.querySelector(".axe");
const pickaxe = document.querySelector(".pickaxe");
let tools = document.querySelector(".sidebar__tools");
let activeTool;
let buildMode = false;


let initialMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 0, 0],
    [0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 5, 5, 0, 0, 0],
    [0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 7, 0, 0, 0, 0, 5, 5, 0, 0, 0],
    [0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 7, 0, 0, 0, 0, 5, 5, 0, 0, 7],
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
];

for (let row = 0; row < initialMatrix.length; row++) {
    for (let col = 0; col < initialMatrix.length; col++) {
        let cell = document.createElement("div");
        switch (initialMatrix[row][col]) {
            case 0:
                cell.classList.add("sky");
                break;
            case 1:
                cell.classList.add("cloud");
                break;
            case 5:
                cell.classList.add("trunk");
                break;
            case 6:
                cell.classList.add("tree");
                break;
            case 7:
                cell.classList.add("stone");
                break;
            case 8:
                cell.classList.add("grass");
                break;
            case 9:
                cell.classList.add("dirt");
                break;
        }
        game.appendChild(cell);
    }
}

game.addEventListener("click", (e) => {
    inventoryEl.setAttribute("class", `${e.target.classList[0]}`)
    if (!buildMode) {
        if (((e.target.classList.contains("dirt") || e.target.classList.contains("grass")) && activeTool === shovel) || (e.target.classList.contains("stone") && activeTool === pickaxe) || ((e.target.classList.contains("tree") || e.target.classList.contains("trunk")) && activeTool === axe)) { e.target.setAttribute("class", "sky"); } else {
            activeTool.classList.remove("selected-tool")
            activeTool = null;
        }
    }
    if (e.target.classList.contains("sky")) {
        if (buildMode) {
            e.target.setAttribute("class", `${inventoryEl.classList[0]}`)
        }
    }
})

tools.addEventListener("click", (e) => {
    if (buildMode) {
        inventoryEl.style.border = "5px solid red";
        buildMode = false;
    }
    if (e.target === inventoryEl && buildMode === false) {
        buildMode = true;
        inventoryEl.style.border = "5px solid green";
    }
    if (e.target.classList.contains("shovel")) {
        activeTool = e.target
        e.target.classList.toggle("selected-tool");
        axe.classList.remove("selected-tool");
        pickaxe.classList.remove("selected-tool");
    }
    if (e.target.classList.contains("axe")) {
        activeTool = e.target
        e.target.classList.toggle("selected-tool");
        shovel.classList.remove("selected-tool");
        pickaxe.classList.remove("selected-tool");
    }
    if (e.target.classList.contains("pickaxe")) {
        activeTool = e.target
        e.target.classList.toggle("selected-tool");
        shovel.classList.remove("selected-tool");
        axe.classList.remove("selected-tool");
    }


})





startBtn.addEventListener("click", () => {
    opening.classList.toggle("display-none");
    gameContainer.classList.toggle("display-none");
})