import { APIEvent } from "@solidjs/start/server";
import { json } from "@solidjs/router";

// const rooms: Record<string, any> = {};
const rooms: Record<string, any> = (globalThis.rooms ||= {});

export async function POST({ params, request }: APIEvent) {
    const roomId = params.roomId!;
    const room = rooms[roomId];

    if (!room) {
        return new Response("Room not found", { status: 404 });
    }

    const { index, player } = await request.json();

    // Validaciones
    if (room.paused || room.pieces[index] !== "0" || room.turn !== player) {
        return new Response("Invalid move", { status: 400 });
    }

    // Realiza la jugada
    room.pieces[index] = player;
    room.turnCount++;

    // Verifica si alguien ganó
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            room.pieces[a] === player &&
            room.pieces[a] === room.pieces[b] &&
            room.pieces[a] === room.pieces[c]
        ) {
            room.winners = pattern;
            room.paused = true;
            room.score[player === "x" ? "x" : "o"]++;
            return json(room);
        }
    }

    // Empate
    if (room.turnCount >= 9) {
        room.paused = true;
        room.score.ties++;
        return json(room);
    }

    // Cambia turno
    room.turn = player === "x" ? "o" : "x";

    return json(room);
}
