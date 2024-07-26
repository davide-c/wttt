import yargs from 'yargs/yargs';
import { dnsRefresh } from './command';

const parser = yargs(process.argv.slice(2))
    .command({
        command: 'dnsRefresh',
        describe:
            'Perform a DNS refresh and mark IPs that are no longer associated to a specific hostname to `Hanging`',
        builder: {
            hostname: {
                alias: 'h',
                description: 'hostname',
                type: 'string',
                demandOption: true,
            },
        },
        handler: async ({ hostname }) => {
            try {
                await dnsRefresh(hostname);
            } catch (e) {
                // TODO: print json err output
            }
        },
    })
    .demandCommand();

(async () => {
    const argv = await parser.parse();
})();
