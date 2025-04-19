import { APIEvent } from "@solidjs/start/server";
import { json } from "@solidjs/router";

// const rooms: Record<string, any> = {};
const rooms: Record<string, any> = (globalThis.rooms ||= {});

export async function GET({ params }: APIEvent) {
    const roomId = params.roomId!;
    const room = rooms[roomId];

    if (!room) {
        return new Response("Room not found", { status: 404 });
    }

    return json(room);
}

export async function POST({ params, request }: APIEvent) {
    const roomId = params.roomId!;

    // Inicializa una sala si no existe
    if (!rooms[roomId]) {
        rooms[roomId] = {
            pieces: Array(9).fill("0"),
            turn: "x",
            turnCount: 0,
            paused: false,
            winners: [],
            score: { x: 0, o: 0, ties: 0 },
        };
    }

    return json(rooms[roomId]);
}
