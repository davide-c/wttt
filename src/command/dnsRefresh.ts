import { Storage } from '../lib';
import { GoogleResolveDnsResponse } from '../service';
import { DnsService } from '../service/DnsService';
import { DomainDnsData } from '../types';

export const dnsRefresh = async (hostname: string): Promise<void> => {
    if (!hostname.length) {
        throw new Error('hostname is not valid');
    }

    const db = new Storage<DomainDnsData>({
        path: `${process.cwd()}/.db/dns-records.json`,
        initialValue: {},
    });

    await db.init();

    const result = await new DnsService().resolve(hostname);

    let state = db.get(hostname);
    const newState = computeState(state, result.Answer);

    db.set(hostname, newState);
    await db.persist();

    console.log(JSON.stringify({ [hostname]: newState }));
};

export const computeState = (
    currentState: DomainDnsData['name'],
    answer: GoogleResolveDnsResponse['Answer'],
): DomainDnsData['name'] => {
    const result: DomainDnsData['name'] = {
        hanging: { ...currentState?.hanging, ...currentState?.active },
        active: {},
    };

    for (const { data } of answer) {
        result.active[data] = {};
        delete result.hanging?.[data];
    }

    return result;
};
