class CellHandler {
    constructor(position) {
        this.position = position;
        this.value = 0;
    }

    update() {
        let rule = this.neighborhood();
        let index = parseInt(rule, 2);
        nextGeneration[this.position].value = ruleset[index];
    }

    neighborhood() {
        let left =
            this.position == 0
                ? cells[generation][cells[generation].length - 1].value
                : cells[generation][this.position - 1].value;

        let me = cells[generation][this.position].value;

        let right =
            this.position == cells[generation].length - 1
                ? cells[generation][0].value
                : cells[generation][this.position + 1].value;

        return `${left}${me}${right}`;
    }
}

const init = () => {
    cells = [[]];
    for (let position = 0; position < numberOfCells; position++) {
        cells[generation].push(new CellHandler(position));
        if (position == Math.floor((numberOfCells - 1) / 2)) {
            cells[generation][position].value = 1;
        }
    }
    show();
};
