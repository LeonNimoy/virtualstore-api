import 'reflect-metadata';
import 'dotenv/config';

import SetupServer from './shared/server';

(async (): Promise<void> => {
  const server = new SetupServer(Number(process.env.APP_PORT));
  await server.init();
  server.start();
})();
