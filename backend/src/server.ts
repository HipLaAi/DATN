import app from './app';
import { config } from './config/config';
import { Server } from "socket.io";
import http from "http";

//config socket.io
const server = http.createServer(app);

// Cấu hình Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Cho phép truy cập từ mọi nguồn gốc (thay đổi nếu cần)
        methods: ["GET", "POST"],
    },
});

interface ActiveUser {
    userId: string;
    socketId: string;
}

let activeUser: ActiveUser[] = [];

io.on("connection", (socket) => {

    socket.on("new_user_add", (newUserId) => {
        if (!activeUser.some((user) => user.userId === newUserId)) {
            activeUser.push({ userId: newUserId, socketId: socket.id });
            // console.log("New User Connected", activeUser);
        }
    });

    socket.on("send_message", (data) => {
        const { receive_id } = data;
        const user = activeUser.find((user) => user.userId === String(receive_id));
        if (user) {
            io.to(user.socketId).emit("receive_message", data);
        }
    });

    socket.on("disconnect", () => {
        activeUser = activeUser.filter((user) => user.socketId !== socket.id);
        // console.log("User disconnected:", socket.id, "Remaining users:", activeUser);
    });
});

server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})