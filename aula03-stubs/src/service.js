import fs from 'node:fs/promises';

export default class Service {
    #dbFilePath

    constructor(dbFilePath) {
        this.#dbFilePath = dbFilePath
    }

    async write(data) {
        await fs.appendFile(this.#dbFilePath, JSON.stringify(data).concat('\n'));
    }

    async read() {
        try {
            const data = await fs.readFile(this.#dbFilePath, 'utf-8');

            if (!data) return [];

            return data
                .split('\n')
                .filter(e => !!e)
                .map(e => JSON.parse(e))
                .map(({ password, ...rest }) => rest)
        } catch (error) {
            if (error?.code === 'ENOENT') {
                return [];
            }

            console.error(error);
        }
    }
}
