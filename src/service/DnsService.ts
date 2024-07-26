import axios from 'axios';
import { GoogleResolveDnsResponse } from '../service/types/GoogleResolveDnsResponse';

const baseUrl = 'https://dns.google.com';
export const url = `${baseUrl}/resolve`;

export class DnsService {
    public async resolve(name: string): Promise<GoogleResolveDnsResponse> {
        const params = new URLSearchParams({ name, type: 'A' });
        return (await axios.get(`${url}?${params}`)).data;
    }
}
