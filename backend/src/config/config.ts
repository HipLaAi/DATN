require('dotenv').config();

export const config = {
    port: process.env.PORT || 3000,
    limit_size: process.env.LIMIT_SIZE || 10485760,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 3306),
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'datn',
    },
    jwt: {
        secret: process.env.JWT_SECRET!,
        expiresIn: process.env.JWT_EXPIRES_IN!,
        refreshSecret: process.env.JWT_REFRESH_SECRET!,
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN!,
    },
    chat: {
        key: process.env.API_KEY!
    },
    google: {
        clientId: process.env.GG_CLIENT_ID!,
        clientSecret: process.env.GG_CLIENT_SECRET!
    },
    client: {
        origin: process.env.CLIENT_ORIGIN!
    },
    cloud: {
        name: process.env.CLOUD_NAME!,
        key: process.env.CLOUD_API_KEY!,
        secret: process.env.CLOUD_API_SECRET!
    },
};