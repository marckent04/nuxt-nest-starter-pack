import { Connection, getConnectionManager } from 'typeorm';
import { User } from '../user/entities/user.entity';

const entities = [
    User,
];

const options = {
    default: {
        type: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: process.env.NODE_ENV !== 'production',
        entities
    },
};

function entitiesChanged(prevEntities: any[], newEntities: any[]): boolean {
    if (prevEntities.length !== newEntities.length) return true;

    for (let i = 0; i < prevEntities.length; i++) {
        if (prevEntities[i] !== newEntities[i]) return true;
    }

    return false;
}

async function updateConnectionEntities(connection: Connection, entities: any[]) {
    // @ts-ignore
    if (!entitiesChanged(connection.options.entities, entities)) return;

    // @ts-ignore
    connection.options.entities = entities;

    // @ts-ignore
    connection.buildMetadatas();

    if (connection.options.synchronize) {
        await connection.synchronize();
    }
}

export async function ensureConnection(name: string = 'default'): Promise<Connection> {
    const connectionManager = getConnectionManager();

    if (connectionManager.has(name)) {
        const connection = connectionManager.get(name);

        if (!connection.isConnected) {
            await connection.connect();
        }

        if (process.env.NODE_ENV !== 'production') {
            // @ts-ignore
            await updateConnectionEntities(connection, options[name].entities);
        }

        return connection;
    }

    // @ts-ignore
    return await connectionManager.create({ name, ...options[name] }).connect();
}