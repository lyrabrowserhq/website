# Lyra Browser site

Static site for Lyra Browser.

## Install

```
cd website
npm ci
npm run dev
```

## Build

```
npm run build
```

Output is `website/dist`. Copy that tree to the host. Map 404 to `/404.html` and 5xx to `/500.html`.
