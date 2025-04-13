import app from './app';
import { config } from './config/config';
import { Server } from "socket.io";
import http from "http";
import "../src/services/notificationService"

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
    socket.on("activeUser", (userId) => {
        if (!activeUser.some((user) => user.userId === userId)) {
            activeUser.push({ userId, socketId: socket.id });
        }
    });



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

export {io, activeUser};

//     socket.on("send_message", (data) => {
//         const { receive_id } = data;
//         const user = activeUser.find((user) => user.userId === String(receive_id));
//         if (user) {
//             io.to(user.socketId).emit("receive_message", data);
//         }
//     });

//     socket.on("disconnect", () => {
//         activeUser = activeUser.filter((user) => user.socketId !== socket.id);
//         // console.log("User disconnected:", socket.id, "Remaining users:", activeUser);
//     });
// });

