import { join } from 'node:path';
import Service from './service.js';
import { randomBytes, randomInt, randomUUID } from 'node:crypto';


async function main() {
    const dbFilePath = join(import.meta.dirname, '..', 'db', 'db.ndjson');
    const service = new Service(dbFilePath);

    await service.write({
        id: randomUUID(),
        name: 'Nome da Pessoa',
        password: randomBytes(8).toString('hex'),
        age: randomInt(30)
    });

    const data = await service.read();
    console.log(data);
}

main()
    .then(() => console.log('Done!'))
    .catch(console.error);