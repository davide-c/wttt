const readFileAsyncMock = jest.fn();
const existsSyncMock = jest.fn();
const mkdirSyncMock = jest.fn();

jest.mock('fs', () => ({
    existsSync: existsSyncMock,
    mkdirSync: mkdirSyncMock,
}));

jest.mock('./utils', () => ({
    readFileAsync: readFileAsyncMock,
    writeFileAsync: jest.fn(),
}));

import { Storage } from './';

jest.mock('axios');

type MockData = {
    foo: string[];
    bar: number[];
};

describe('Storage', () => {
    let instance: Storage<MockData>;
    const initialValue = { foo: [] as string[], bar: [] as number[] };

    beforeEach(() => {
        instance = new Storage({
            path: '.mock/path.json',
            initialValue: { foo: [] as string[], bar: [] as number[] },
        });
    });

    describe('method', () => {
        it('should set mutate the storage class internal state', async () => {
            readFileAsyncMock.mockResolvedValue({ toString: () => JSON.stringify(initialValue) });
            existsSyncMock.mockReturnValue(true);
            mkdirSyncMock.mockReturnValue(null);

            await instance.init();
            await instance.set('bar', ['j', 'k', 'l']);

            expect((instance as any).data).toStrictEqual({
                foo: [],
                bar: ['j', 'k', 'l'],
            });
        });
    });
});
