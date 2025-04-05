import bcrypt from 'bcrypt';

interface UserModel {
    user_id?: number;
    name?: string;
    email: string;
    password: string;
    status?: string;
    description?: string;
    avatar?: string;
    created_at?: Date;
    update_at?: Date
}

async function hashPassword(user: UserModel): Promise<void> {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
    } catch (error) {
        throw error;
    }
}

async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
        const comparedPassword = await bcrypt.compare(password, hashedPassword);
        return comparedPassword;
    } catch (error) {
        throw error;
    }
}

export { hashPassword, comparePassword, UserModel };