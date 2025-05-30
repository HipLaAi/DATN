import { io, activeUser } from "../server";

const chatGateway = (socket: any) => {
    socket.on("send_message", (data: { receive_id: string, message: string }) => {
        const { receive_id } = data;
        const user = activeUser.find((user) => user.userId === receive_id);
        if (user) {
            // console.log(user);
            io.to(user.socketId).emit("receive_message", data);
        } else {
            console.log(`User with ID ${receive_id} is not online.`);
        }
    });
};

export default chatGateway;
