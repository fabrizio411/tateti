import { APIEvent } from "@solidjs/start/server";
import { json } from "@solidjs/router";

const rooms: Record<string, any> = (globalThis.rooms ||= {});

export async function POST({ params }: APIEvent) {
    const roomId = params.roomId!;
    const room = rooms[roomId];

    if (!room) {
        return new Response("Room not found", { status: 404 });
    }

    room.pieces = Array(9).fill("0");
    room.winners = [];
    room.turn = room.roundCount % 2 === 0 ? "o" : "x";
    room.turnCount = 0;
    room.paused = false;
    room.roundCount = (room.roundCount || 1) + 1;

    return json(room);
}
