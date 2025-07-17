import pg, { Pool, PoolClient } from "pg";

class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "root", 
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5434,
      database: process.env.DB_DATABASE || "todo",
    });

    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }

  async getClient() : Promise<PoolClient> {
    try {
      const client = await this.pool.connect();
      return client;
    } catch (error) {
      console.error('Error acquiring client:', error);
      throw error;
    }
  }

  async end() {
    try {
      await this.pool.end();
    } catch (error) {
      console.error('Error closing pool:', error);
      throw error;
    }
  }
}

export default Database;
