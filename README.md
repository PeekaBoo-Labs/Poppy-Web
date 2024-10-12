<div align=center>

**Poppy 🌼!**

</div>

## Setup
### Install Dependencies
```
npm install
```

### Set .env variables
```
# Created by Vercel CLI
ANTHROPIC_API_KEY=
KV_REST_API_READ_ONLY_TOKEN=
KV_REST_API_TOKEN=
KV_REST_API_URL=
KV_URL=
YELP_API_KEY=
```

### Entropy
1. Rename `src/lib/entropy-src.template` (this will be used to validate the fingerprint on the server)
2. Rename `src/lib/entropy.js.template` (this will be used to generate the fingerprint on the client)
3. If you want, try your own blackbox implementation!

### Start dev server
```
npm run dev
```
