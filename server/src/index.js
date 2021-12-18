import { readFileSync } from 'fs';
import spdy from 'spdy';

import { app } from './app';
import { insertSeeds } from './seeds';
import { sequelize } from './sequelize';

const spdyOptions = {
  // Private key
  key: readFileSync(__dirname + '/../keys/spdy-key.pem'),
  // Fullchain file or cert file (prefer the former)
  cert: readFileSync(__dirname + '/../keys/spdy-cert.pem'),
  ca: readFileSync(__dirname + '/../keys/spdy-ca.pem'),
  passphrase: 'pass',
};

async function main() {
  const server = spdy.createServer(spdyOptions, app);

  // データベースの初期化をします
  await sequelize.sync({
    force: true,
    logging: false,
  });
  await insertSeeds();

  server.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => {
    const address = server.address();
    console.log(`Listening on ${address.address}:${address.port}`);
  });
}

main().catch(console.error);
