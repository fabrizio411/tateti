export const rooms = new Map<string, {
    board: (null | "X" | "O")[];
    turn: "X" | "O";
    winner: null | "X" | "O" | "draw";
}>();
