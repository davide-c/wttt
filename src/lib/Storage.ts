import { existsSync } from 'fs';
import { mkdirpSync } from 'mkdirp';
import { readFileAsync, writeFileAsync } from './utils';

type StorageCfg<T> = {
    path: string;
    initialValue: Partial<T>;
};

const pathRmFilename = (p: string) => p.substring(0, p.lastIndexOf('/'));

export class Storage<T extends object> {
    protected data!: T;

    constructor(protected config: StorageCfg<T>) {}

    public async init() {
        const pathExists = existsSync(this.config.path);

        if (!pathExists) {
            this.persist(true);
        }

        const data = (await readFileAsync(this.config.path)).toString();

        try {
            this.data = JSON.parse(data);
        } catch (e) {
            throw e; // TODO: custom error
        }
    }

    public async persist(initialize = false) {
        mkdirpSync(pathRmFilename(this.config.path));
        const data = JSON.stringify(initialize ? this.config.initialValue : this.data, null, 2);
        await writeFileAsync(this.config.path, data);
    }

    public get(k: keyof T) {
        return this.data[k];
    }

    public set(k: keyof T, v: T[keyof T]) {
        this.data[k] = v;
    }
}
