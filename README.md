# Dns record util

## Business requirements
- Ability to persist dns records information in our system.
- Rely on google resolve dns service.
- Mark previously associated IPs as `Hanging`.
- Provide output.

## Notes
### Storage
Given the usage context and time constraint I decided to write a simple POC storage class that allows to load and persist json data through an api that resembles a dictionary.

This allowed to:
- Have a long lived storage without setting up database an orm, schema validation, db or a key/value storage instance.
- Avoid docker instances and any other infrastructure requirement.

The storage format type `DomainDnsData` is meant to be inexpensive in terms of read time complexity but it's very simple and limited in terms of what can be achieved with such a structure should new requirements arise, such as advanced filtering and additional properties or segmentation.

I wrote within the same file a standard entity named `DnsRecord` representing the normalised entity that I would have expect to see when using a RDBMS. As commented in the code in such case a composite key (hostname, ip) would have been necessary.


### Testing
- The logic is tested through unit tests, it would have been possible to test different conditions with functional tests by runnin an ad hoc test dns service endpoint via env vars.

## Instructions
In order to install dependencies please run ```nvm use``` where `nvm` is available.

Then install dependencies with ```npm i```.

Run tests with ```npm run test```, watch mode is availabel with ```npm run test:watch```.

The cli app can be executed by running the following command:


```
./bin/cli dnsRefresh -h test.com
```

The command can be piped into `jq` for a nicer output. (`brew install jq` on `macos`)

The above command should produce the following output on a fresh project copy:

```json
{
  "more.test.com": {
    "hanging": {},
    "active": {
      "69.167.164.199": {}
    }
  }
}
```

The above object represents the state of our json storage for the domain provided via cli.

The whole database file can be found at the configurable location `./.db/dns-records.json`.

Please see below a sample JSON db:
```json
{
  "test1234.com": {
    "hanging": {
      "7.8.9.1": {},
      "7.8.9.2": {},
      "7.8.9.3": {}
    },
    "active": {
      "7.8.9.4": {}
    }
  },
  "another-test.com": {
    "hanging": {},
    "active": {
      "7.8.9.11": {}
    }
  },
  "another.com": {
    "hanging": {},
    "active": {
      "7.8.9.12": {}
    }
  },
  "simcoimmobiliare.it": {
    "hanging": {},
    "active": {
      "185.234.69.125": {}
    }
  },
  "communityxseen.com": {
    "hanging": {},
    "active": {
      "52.84.90.124": {},
      "52.84.90.52": {},
      "52.84.90.53": {},
      "52.84.90.99": {}
    }
  },
  "google.com": {
    "hanging": {},
    "active": {
      "142.250.179.238": {}
    }
  },
  "google.co.uk": {
    "hanging": {},
    "active": {
      "142.250.200.35": {}
    }
  },
  "google.it": {
    "hanging": {},
    "active": {
      "172.217.169.35": {}
    }
  },
  "google.es": {
    "hanging": {
      "142.250.200.3": {}
    },
    "active": {}
  },
  "test.com": {
    "hanging": {},
    "active": {
      "34.224.149.186": {},
      "3.18.255.247": {}
    }
  },
  "hello.test.com": {
    "hanging": {},
    "active": {
      "69.167.164.199": {}
    }
  },
  "hi.test.com": {
    "hanging": {},
    "active": {
      "69.167.164.199": {}
    }
  },
  "a.test.com": {
    "hanging": {},
    "active": {
      "69.167.164.199": {}
    }
  },
  "more.test.com": {
    "hanging": {},
    "active": {
      "69.167.164.199": {}
    }
  }
}
```

