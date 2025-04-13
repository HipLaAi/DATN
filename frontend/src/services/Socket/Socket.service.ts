import { io, Socket } from "socket.io-client";

export class SocketService {
    private static instance: Socket | null = null;

    static connect(): Socket {
        if (!SocketService.instance) {
            SocketService.instance = io("http://localhost:4040");
        }
        return SocketService.instance;
    }

    static disconnect() {
        if (SocketService.instance) {
            SocketService.instance.disconnect();
            SocketService.instance = null;
        }
    }
}