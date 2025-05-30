import { injectable } from "tsyringe";
import { ai } from "../config/chat";
import { Database } from "../config/database";

@injectable()
export class ChatReponsitory {
    constructor(private db: Database) { };

    async getChatResponse(request: string, option: any, user: any): Promise<any> {
        try {
            if (request.toLowerCase().includes("nhiệm vụ") || request.toLowerCase().includes("thẻ") || request.toLowerCase().includes("công việc") || request.toLowerCase().includes("hôm nay")) {
                if (option != "allcard") {
                    const sql = 'call GetBoardByID(?, ?, @err_code, @err_msg)';
                    const [results] = await this.db.query(sql, [option, user.user_id]);
                    const currentDateTime = new Date();

                    const dayNames = [
                        "Chủ nhật",
                        "Thứ hai",
                        "Thứ ba",
                        "Thứ tư",
                        "Thứ năm",
                        "Thứ sáu",
                        "Thứ bảy",
                    ];

                    const monthNames = [
                        "Tháng 1",
                        "Tháng 2",
                        "Tháng 3",
                        "Tháng 4",
                        "Tháng 5",
                        "Tháng 6",
                        "Tháng 7",
                        "Tháng 8",
                        "Tháng 9",
                        "Tháng 10",
                        "Tháng 11",
                        "Tháng 12",
                    ];

                    const formattedDateTime = `
                        Hôm nay là: ${dayNames[currentDateTime.getDay()]},
                        Ngày ${currentDateTime.getDate()} ${monthNames[currentDateTime.getMonth()]} năm ${currentDateTime.getFullYear()},
                        Bây giờ là: ${currentDateTime.getHours()} giờ ${currentDateTime.getMinutes()} phút.
                    `;


                    if (!(Array.isArray(results) && results.length > 0)) {
                        return "Hiện tại không có nhiệm vụ nào.";
                    }

                    const formatDate = (date: Date | null) => {
                        if (!date) return "Chưa cài thời gian";
                        return new Intl.DateTimeFormat('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        }).format(new Date(date)).replace(",", "");
                    };

                    const prompt = `
                    Dữ liệu công việc:

                    1. Thông tin bảng:
                    - Tên bảng: ${results[0].name}
                    - Mô tả: ${results[0].description || "Không có mô tả"}
                    - Trạng thái: ${results[0].status}
                    - Vai trò của người dùng hiện tại với bảng: ${results[0].role}

                    2. Các cột trong bảng:
                    ${results[0].column.map((column: any) => `
                        + Tên: ${column.name}
                        + Nhiệm vụ:
                        ${column.card.map((card: any) => `
                            - Tên nhiệm vụ: ${card.name}
                            - Trạng thái: ${card.status === "true" ? "Đã hoàn thành" : card.status === "false" ? "Chưa hoàn thành" : "Không có trạng thái"}
                            - Thời gian bắt đầu nhiệm vụ: ${formatDate(card.start_date) || "Chưa cài thời gian"}
                            - Thời gian kết thúc nhiệm vụ: ${formatDate(card.end_date) || "Chưa cài thời gian"}
                            - Người tham gia:
                            ${card.userjoin?.map((user: any) => `
                            + Tên: ${user.name}
                            + Email: ${user.email}
                            `).join("") || "Không có người tham gia"}
                            - Nhãn: 
                            ${card.label?.map((label: any) => `
                            + Tên: ${label.name}
                            + Mã nhãn: ${label.label_id}
                            + Màu nền: ${label.background}
                            `).join("") || "Không có nhãn"}
                        `).join("")}
                    `).join("")}

                    3. Khách tham gia bảng:
                    ${results[0].guest.map((guest: any, guestIndex: any) => `
                    - Khách ${guestIndex + 1}:
                        + Tên: ${guest.name}
                        + Email: ${guest.email}
                    `).join("")}

                    ${formattedDateTime}

                    4. NGười dùng hiện tại có địa chỉ email là: ${user.email}

                    Câu hỏi: ${request}

                    Dựa vào thông tin mà bạn truy vấn được từ cơ sở dữ liệu trên hãy trả lời giúp tôi câu hỏi sau:
                    `;


                    const response = await ai.models.generateContent({
                        model: "gemini-2.0-flash",
                        contents: prompt,
                    });


                    return response.text;

                }

                const sql = 'CALL GetCard(?, ?, @err_code, @err_msg)';
                const [results] = await this.db.query(sql, [user.user_id, option]);

                const currentDateTime = new Date();

                const dayNames = [
                    "Chủ nhật",
                    "Thứ hai",
                    "Thứ ba",
                    "Thứ tư",
                    "Thứ năm",
                    "Thứ sáu",
                    "Thứ bảy",
                ];

                const monthNames = [
                    "Tháng 1",
                    "Tháng 2",
                    "Tháng 3",
                    "Tháng 4",
                    "Tháng 5",
                    "Tháng 6",
                    "Tháng 7",
                    "Tháng 8",
                    "Tháng 9",
                    "Tháng 10",
                    "Tháng 11",
                    "Tháng 12",
                ];

                const formattedDateTime = `
                        Hôm nay là: ${dayNames[currentDateTime.getDay()]},
                        Ngày ${currentDateTime.getDate()} ${monthNames[currentDateTime.getMonth()]} năm ${currentDateTime.getFullYear()},
                        Bây giờ là: ${currentDateTime.getHours()} giờ ${currentDateTime.getMinutes()} phút.
                    `;

                if (!(Array.isArray(results) && results?.length > 0)) {
                    return "Hiện tại không có nhiệm vụ nào.";
                }

                const formatDate = (date: Date | null) => {
                    if (!date) return "Chưa cài thời gian";
                    return new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    }).format(new Date(date)).replace(",", "");
                };

                const taskDetails = results.map((item: any) => `
                    + Tên không gian làm việc: ${item.workspace_name}
                    + Tên bảng: ${item.board_name}
                    + Nhiệm vụ:
                        - Tên nhiệm vụ: ${item.card_name}
                        - Trạng thái: ${item.card_status || "Không có trạng thái"}
                        - Thời gian bắt đầu nhiệm vụ: ${formatDate(item.start_date) || "Chưa cài thời gian"}
                        - Thời gian kết thúc nhiệm vụ: ${formatDate(item.end_date) || "Chưa cài thời gian"}
                        - Người tham gia: ${item.userjoin?.map((user: any) => `
                            + Tên: ${user.name}
                            + Email: ${user.email}
                            `).join("") || "Không có người tham gia"}
                `).join("\n");

                const prompt = `
                        Dữ liệu công việc:

                        1. Thông tin các nhiệm vụ:
                        ${taskDetails}

                        ${formattedDateTime}

                        2. Người dùng hiện tại có địa chỉ email là: ${user.email}

                        Câu hỏi: ${request}

                        Dựa vào thông tin mà bạn truy vấn được từ cơ sở dữ liệu trên hãy trả lời giúp tôi câu hỏi sau:
                    `;

                try {
                    const response = await ai.models.generateContent({
                        model: "gemini-2.0-flash",
                        contents: prompt,
                    });

                    return response.text;
                } catch (error) {
                    console.error("Lỗi khi gọi API AI:", error);
                    return "Đã xảy ra lỗi khi xử lý câu hỏi.";
                }

            } else {
                const response = await ai.models.generateContent({
                    model: "gemini-2.0-flash",
                    contents: request,
                });
                return response.text;
            }
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }

    }
}