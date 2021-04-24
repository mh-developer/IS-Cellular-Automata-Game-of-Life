class CellHandler {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.position = new Victor(x, y);
        this.value = Math.floor(Math.random() * 2);
        // this.value = 0;

        this.neighbors = 0;
    }

    update() {
        this.neighborhood();
        // dies from loneliness
        if (cells[this.x][this.y].value == 1 && this.neighbors < 2) {
            nextGeneration[this.x][this.y].value = 0;
        }
        // overpopulation
        else if (cells[this.x][this.y].value == 1 && this.neighbors > 3) {
            nextGeneration[this.x][this.y].value = 0;
        }
        // born
        else if (cells[this.x][this.y].value == 0 && this.neighbors == 3) {
            nextGeneration[this.x][this.y].value = 1;
        }
        // same
        else nextGeneration[this.x][this.y].value = cells[this.x][this.y].value;

    }

    neighborhood() {
        this.neighbors = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let positionX = this.position.clone().x;
                let positionY = this.position.clone().y;
                if (this.x == 0 && i < 0) positionX = numberOfCells;

                if (this.x == numberOfCells - 1 && i > 0) positionX = -1;

                if (this.y == 0 && j < 0) positionY = numberOfCells;

                if (this.y == numberOfCells - 1 && j > 0) positionY = -1;

                this.neighbors += cells[positionX + i][positionY + j].value;
            }
        }
        this.neighbors -= this.value;
    }
}

const init = () => {
    cells = [];
    for (let row = 0; row < numberOfCells; row++) {
        cells.push([]);
        for (let column = 0; column < numberOfCells; column++) {
            cells[row].push(new CellHandler(row, column));
        }
    }
    show();
};