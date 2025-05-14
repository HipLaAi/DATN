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
    chatGateway(socket);
    socket.on("activeUser", (userId) => {
        if (!activeUser.some((user) => user.userId === userId)) {
            activeUser.push({ userId, socketId: socket.id });
        }
    });




    // Code call video

    // Handle video call start
    socket.on("start-video-call", (userId) => {
        console.log(`${userId} is starting a video call`);

        // Tìm tất cả các người tham gia
        const targetUsers = activeUser.filter((user) => user.userId !== userId);

        // Gửi thông báo mời gọi video đến tất cả người tham gia
        targetUsers.forEach((user) => {
            socket.to(user.socketId).emit("incoming-video-call", userId);
        });
    });

    // Handle signaling (SDP và ICE candidates)
    socket.on("signal", (data) => {
        const { to, signal, from } = data;

        // Tìm người dùng đích
        const targetUser = activeUser.find((user) => user.userId === to);
        if (targetUser) {
            socket.to(targetUser.socketId).emit("signal", {
                from,
                signal,
            });
        }
    });

    /////


    socket.on("disconnect", () => {
        const index = activeUser.findIndex((user) => user.socketId === socket.id);
        if (index !== -1) {
            activeUser.splice(index, 1);
        }
    });
});

server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})

export { io, activeUser };
