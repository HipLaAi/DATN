import { injectable } from "tsyringe";
import { ai } from "../config/chat";
import { Database } from "../config/database";

@injectable()
export class ChatReponsitory {
    constructor(private db: Database) { };

    async getChatResponse(repuest: string): Promise<any> {
        try {
            if (repuest.toLowerCase().includes("nhiệm vụ") || repuest.toLowerCase().includes("task")) {
                const sql = 'call GetBoardByID(?, @err_code, @err_msg)';
                const [results] = await this.db.query(sql, [23]);

                if (!(Array.isArray(results) && results.length > 0)) {
                    return "Hiện tại không có nhiệm vụ nào.";
                }

                const prompt = `Thông tin nhiệm vụ có trong bảng:\n${JSON.stringify(results[0], null, 2)}\nCâu hỏi: ${repuest}\nTrả lời:`;

                const response = await ai.models.generateContent({
                    model: "gemini-2.0-flash",
                    contents: prompt,
                });

                // return prompt;

                return response.text;




                // // Truy vấn dữ liệu từ database
                // const [rows] = await pool.query('SELECT title, description, due_date FROM tasks');

                // // Kiểm tra nếu không có nhiệm vụ nào
                // if ((rows as any[]).length === 0) {
                // return "Hiện tại không có nhiệm vụ nào trong cơ sở dữ liệu.";
                // }

                // // Xây dựng thông tin nhiệm vụ
                // let tasksInfo = "Thông tin nhiệm vụ hiện tại:\n";
                // (rows as any[]).forEach((row) => {
                //     const dueDate = new Date(row.due_date).toISOString().slice(0, 10);
                //     tasksInfo += `- **${row.title}**: ${row.description}. ⏰ Hạn chót: ${dueDate}\n`;
                // });

                // // Tạo prompt kết hợp dữ liệu nhiệm vụ và câu hỏi người dùng
                // const prompt = `${tasksInfo}\nCâu hỏi: ${repuest}\nTrả lời:`;

                // const response = await ai.models.generateContent({
                //     model: "gemini-2.0-flash",
                //     contents: prompt,
                // });
                // return response.text;
                // return "Hiện tại chưa có bất kỳ nhiệm vụ hay task nào cần phải hoàn thành";

            } else {
                const response = await ai.models.generateContent({
                    model: "gemini-2.0-flash",
                    contents: repuest,
                });
                return response.text;
            }
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }

        // const response = await ai.models.generateContent({
        //     model: "gemini-2.0-flash",
        //     contents: repuest,
        // });
        // return response.text;
    }
}