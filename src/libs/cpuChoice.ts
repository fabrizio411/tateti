import { Mark, Pieces } from "~/global";
import { winningCombinations } from "./consts";

export const cpuChoice = (mark: Mark, pieces: Pieces): number => {
    let position = null;

    // Attack
    position = checkPosibleWin(mark === "o" ? "x" : "o", pieces);
    if (position !== null) return position;

    // Defence
    position = checkPosibleWin(mark, pieces);
    if (position !== null) return position;

    // Random
    const emptyPositions = pieces
        .map((val, i) => (val === "0" ? i : null))
        .filter((i) => i !== null);

    return emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
};

const checkPosibleWin = (player: Mark, pieces: Pieces) => {
    for (const combo of winningCombinations) {
        const values = combo.map((index) => pieces[index]);
        const playerCount = values.filter((v) => v === player).length;
        const emptyCount = values.filter((v) => v === "0").length;

        if (playerCount === 2 && emptyCount === 1) {
            const emptyIndex = combo.find((index) => pieces[index] === "0");
            return emptyIndex ?? null;
        }
    }

    return null;
};
