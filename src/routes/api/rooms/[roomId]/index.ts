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
    const { playerId } = await request.json();

    console.log(roomId, playerId);

    if (!playerId) {
        return new Response("Missing playerId", { status: 400 });
    }

    // Inicializa una sala si no existe
    if (!rooms[roomId]) {
        rooms[roomId] = {
            pieces: Array(9).fill("0"),
            turn: "x",
            turnCount: 0,
            paused: false,
            winners: [],
            score: { x: 0, o: 0, ties: 0 },
            players: [playerId],
            playerRoles: { [playerId]: "x" },
        };
    } else {
        const players = rooms[roomId].players;

        if (!players.includes(playerId)) {
            if (players.length >= 2) {
                return new Response("Room full", { status: 403 });
            }

            players.push(playerId);
            rooms[roomId].playerRoles[playerId] = "o";
        }
    }

    return json(rooms[roomId]);
}
