import { ensureConnection } from "./database.functions";

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await ensureConnection(),
  },
];