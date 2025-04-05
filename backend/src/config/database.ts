import { Pool, PoolConnection, createPool } from 'mysql2/promise';
import { config } from './config';
import { injectable } from 'tsyringe';

// mysql connection config
const connectionConfig = {
    host: config.db.host,
    port: config.db.port,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
};

@injectable()
export class Database {
    private pool: Pool; //declare variable

    constructor() {
        this.pool = createPool(connectionConfig); // use library mysql2/promise, method createpool
    }

    public async query(sql: string, values: any[]): Promise<any> {
        let connection: PoolConnection | null = null; // init connection default null
        try {
            connection = await this.pool.getConnection();
            const [results] = await connection.query(sql, values);
            const [outParam] = await connection.query(
                'SELECT @err_code, @err_msg',
            );
            const err: any = outParam;
            if (err[0]['@err_code'] === 0) {
                return results;
            } else {
                throw new Error(err?.[0]?.['@err_msg']);
            }
        } catch (error) {
            throw error;
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }
}
