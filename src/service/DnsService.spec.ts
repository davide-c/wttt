import axios from 'axios';
import { DnsService, url } from './DnsService';

jest.mock('axios');

describe('DnsService', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    let instance: DnsService;

    beforeEach(() => {
        instance = new DnsService();
    });

    describe('method', () => {
        it('should call axios.get with the correct url', async () => {
            const mockDnsServiceUrl = 'mock.test.com';
            mockedAxios.get.mockResolvedValue({ data: {} });
            await instance.resolve(mockDnsServiceUrl);

            expect(mockedAxios.get).toHaveBeenCalledWith(`${url}?name=${mockDnsServiceUrl}&type=A`);
        });
    });
});
