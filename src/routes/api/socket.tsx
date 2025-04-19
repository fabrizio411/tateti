import type { APIEvent } from "@solidjs/start/server";

const rooms = new Map<string, Set<WebSocket>>();

export const GET = ({ request }: APIEvent) => {
  const { socket, response } = Deno.upgradeWebSocket(request);

  socket.onopen = () => {
    const url = new URL(request.url);
    const roomId = url.searchParams.get("roomId");
    if (!roomId) {
      socket.close();
      return;
    }

    if (!rooms.has(roomId)) rooms.set(roomId, new Set());
    rooms.get(roomId)!.add(socket);

    socket.onmessage = (event: any) => {
      // retransmitir el mensaje a todos en la sala
      rooms.get(roomId)?.forEach((client) => {
        if (client !== socket) client.send(event.data);
      });
    };

    socket.onclose = () => {
      rooms.get(roomId)?.delete(socket);
      if (rooms.get(roomId)?.size === 0) rooms.delete(roomId);
    };
  };

  return response;
};
