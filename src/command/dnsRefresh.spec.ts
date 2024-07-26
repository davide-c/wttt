import { GoogleResolveDnsResponse } from '../service';
import { DomainDnsData } from '../types';
import { computeState } from './dnsRefresh';

describe('dnsRefresh', () => {
    describe('`computestate` method', () => {
        const emptyState: DomainDnsData['name'] = {
            active: {},
            hanging: {},
        };

        const cases: [
            string,
            DomainDnsData['name'],
            GoogleResolveDnsResponse['Answer'],
            DomainDnsData['name'], // expected
        ][] = [
            [
                'should set a new ip',
                emptyState,
                [
                    {
                        data: '1.2.3.4',
                    },
                ],
                {
                    active: {
                        '1.2.3.4': {},
                    },
                    hanging: {},
                },
            ],
            [
                'should set multiple ips',
                emptyState,
                [
                    {
                        data: '1.2.3.4',
                    },
                    {
                        data: '1.2.3.8',
                    },
                    {
                        data: '1.2.3.12',
                    },
                ],
                {
                    active: {
                        '1.2.3.4': {},
                        '1.2.3.8': {},
                        '1.2.3.12': {},
                    },
                    hanging: {},
                },
            ],
            [
                'should mark a previously active ip as `hanging`',
                {
                    active: {
                        '1.2.3.4': {},
                    },
                    hanging: {},
                },
                [],
                {
                    active: {},
                    hanging: {
                        '1.2.3.4': {},
                    },
                },
            ],
            [
                'should mark a previously active ip as `hanging` while setting a new one',
                {
                    active: {
                        '1.2.3.4': {},
                    },
                    hanging: {},
                },
                [
                    {
                        data: '5.6.7.8',
                    },
                ],
                {
                    active: {
                        '5.6.7.8': {},
                    },
                    hanging: {
                        '1.2.3.4': {},
                    },
                },
            ],

            [
                'should mark multiple previously active ips as `hanging` and set two new ones',
                {
                    active: {
                        '1.2.3.4': {},
                        '1.2.3.8': {},
                        '1.2.3.12': {},
                        '1.2.3.24': {},
                    },
                    hanging: {},
                },
                [
                    {
                        data: '5.6.7.8',
                    },
                    {
                        data: '5.6.7.16',
                    },
                ],
                {
                    active: {
                        '5.6.7.8': {},
                        '5.6.7.16': {},
                    },
                    hanging: {
                        '1.2.3.4': {},
                        '1.2.3.8': {},
                        '1.2.3.12': {},
                        '1.2.3.24': {},
                    },
                },
            ],
        ];

        cases.forEach(([shouldMsg, initialState, mockDnsAnswer, expected]) => {
            it(shouldMsg, () => {
                const result = computeState(initialState, mockDnsAnswer);
                expect(result).toStrictEqual(expected);
            });
        });
    });
});
