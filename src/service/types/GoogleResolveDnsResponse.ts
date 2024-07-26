export type GoogleResolveDnsResponse = {
    Status: number;
    TC: boolean;
    RD: boolean;
    RA: boolean;
    AD: boolean;
    CD: boolean;
    Question: {
        name: string;
        type: number;
    };
    Answer: {
        name?: string;
        type?: number;
        ttl?: number;
        data: string;
    }[];
};
