let app = new PIXI.Application({
    width: 1200,
    height: 900,
    transparent: false,
    resolution: 1,
    backgroundColor: 0x264653,
});
let cellLayer = new PIXI.Container();

let cells = [];
let nextGeneration = [];
let isStart = false;
let numberOfCells = 30;

const createCellGraphics = (x, y) => {
    let g = new PIXI.Graphics();
    drawCell(g, x, y);
    cellLayer.addChild(g);
    return g;
};

const drawCell = (graphics, x, y) => {
    let w = app.screen.width / numberOfCells;
    let h = app.screen.height / numberOfCells;
    graphics.interactive = true;
    graphics.lineStyle(2, 0xf1faee, 1);
    if (cells[x][y].value == 1) graphics.beginFill(0x2a9d8f, 1);
    else graphics.beginFill(0xb1faee, 1);
    graphics.drawRect(y * w, x * h, w, h);
    graphics.endFill();
    graphics.hitArea = graphics.getBounds();
    if (!isStart) {
        graphics.click = function (e) {
            cells[x][y].value = cells[x][y].value == 1 ? 0 : 1;
            show();
        };
    }
};

const getEnvironment = () => {
    return {
        cells: cells,
    };
};

const updateCells = () => {
    nextGeneration = _.cloneDeep(cells);
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            cells[i][j].update();
        }
    }
    cells = _.cloneDeep(nextGeneration);
};

const show = () => {
    app.stage.addChild(cellLayer);
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            createCellGraphics(i, j);
        }
    }
};

const animate = () => {
    if (isStart) {
        updateCells();
        show();
    }
};

document.getElementById("wrapper").appendChild(app.view);
