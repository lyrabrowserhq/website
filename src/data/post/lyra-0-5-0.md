---
publishDate: 2026-10-02T00:00:00Z
title: '0.5.0 overlay: signed updates, GPS spoof, per-site GPU'
excerpt: 'Opt-in Ed25519 update checks, Reykjavik GPS spoof, WebGPU off, WebGL on for Cloudflare. Seek default.'
category: 'Release'
tags:
  - release
  - privacy
author: Lyra
---

Lyra 0.5.0 is based on ESR 153.4.0 and changes how updates, location, and graphics work.

Update checks stay off until you enable them in Settings. The check fetches `release.json` and a 64-byte Ed25519 signature from GitHub Releases. Tag CI refuses to publish if `LYRA_RELEASE_KEY` is missing.

Geolocation defaults to block. Spoof returns Reykjavik so it matches the UTC timezone spoof. Ask uses BeaconDB.

WebGL stays enabled and sanitized. WebGL randomization is off. WebGPU stays off unless you allow a site. A non-empty WebGL allowlist becomes opt-in per site and will break Cloudflare until you list it.

Search default is Seek. Translations run locally. Google Safe Browsing stays off.
