type IpSettings = {};

export type DomainDnsData = {
    [domain: string]: {
        hanging: {
            [ip: string]: IpSettings;
        };
        active: {
            [ip: string]: IpSettings;
        };
    };
};

import { PartialDeep } from 'type-fest';

export class DnsRecord {
    constructor(init: PartialDeep<DnsRecord>) {
        Object.assign(this, init);
    }

    id!: string;
    createdAt!: Date;
    updatedAt!: Date;
    /**
     * composite key: hostname, ip
     */
    hostname!: string;
    ip!: string;
    hanging!: boolean;
}
