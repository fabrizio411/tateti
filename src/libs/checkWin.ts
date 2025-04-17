import { Mark, Pieces } from "~/global";
import { winningCombinations } from "./consts";

export const checkWin = (turn: Mark, pieces: Pieces) => {
    let res = null;

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (
            pieces[a] === turn &&
            pieces[b] === turn &&
            pieces[c] === turn
        ) {
            res = [a, b, c];
            break;
        }
    }

    return res;
};
