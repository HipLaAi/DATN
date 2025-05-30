import app from './app';
import { config } from './config/config';
import { Server } from "socket.io";
import http from "http";
import "../src/schedulers/notificationScheduler";
import chatGateway from "../src/gateways/messageGateway";

//config socket.io
const server = http.createServer(app);

// Cấu hình Socket.IO
const io = new Server(server, {
    cors: {
        origin: config.client.origin, // Cho phép truy cập từ mọi nguồn gốc (thay đổi nếu cần)
        methods: ["GET", "POST"],
    },
});

interface ActiveUser {
    userId: string;
    socketId: string;
}

var activeUser: ActiveUser[] = [];

io.on("connection", (socket) => {
    // socket.on("activeUser", (userId) => {
    //     if (!activeUser.some((user) => user.userId === userId)) {
    //         activeUser.push({ userId, socketId: socket.id });
    //     }
    // });
    socket.on("activeUser", (userId) => {
        const existingUserIndex = activeUser.findIndex((user) => user.userId === userId);

        if (existingUserIndex !== -1) {
            // Nếu userId đã tồn tại, cập nhật socketId mới
            activeUser[existingUserIndex].socketId = socket.id;
        } else {
            // Nếu userId chưa tồn tại, thêm vào danh sách
            activeUser.push({ userId, socketId: socket.id });
        }
    });
    socket.on("disconnect", () => {
        const index = activeUser.findIndex((user) => user.socketId === socket.id);
        if (index !== -1) {
            activeUser.splice(index, 1);
        }
    });
    chatGateway(socket);
});

server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})

export { io, activeUser };
