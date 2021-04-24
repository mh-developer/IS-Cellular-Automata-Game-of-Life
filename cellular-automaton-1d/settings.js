$("#start-btn").click(function () {
    steps = Number($("#num_of_steps").val());
    numberOfCells = Number($("#number_of_cells").val());
    let parsedRuleset = [
        ...`${parseInt($("#ruleset").val()).toString(2)}`,
    ].map((x) => Number(x));
    if (parsedRuleset.length < 8) {
        for (let i = 0; i < 8 - parsedRuleset.length; i++) {
            parsedRuleset.unshift(0);
        }
    }
    ruleset = [...parsedRuleset].reverse();
    if (!isStart) {
        isStart = true;
        init();

        if (generation <= steps && isStart) {
            requestAnimationFrame(animate);
        }
    } else {
        isStart = false;
    }
});
