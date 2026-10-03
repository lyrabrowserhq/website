---
title: 'Privacy'
layout: '~/layouts/MarkdownLayout.astro'
---

Last checked against 153.4.0esr defaults in firefox-src plus prefs/lyra.cfg on 2 Oct 2026.

This page is for **Lyra Browser** and this **website**. The website stores only a theme key in localStorage. No cookies, no analytics, no third-party scripts.

## Website

Theme: `localStorage.theme` is `light` or `dark` after you toggle. If that key is missing, the site follows `prefers-color-scheme`, and uses dark when the OS has no preference. Fonts are self-hosted in the static build. Pages are static files.

## Browser: closed by default

Locked or blanked so they do not phone home:

- Mozilla telemetry, DAP, coverage, health report, crash report URL
- Normandy, Shield studies, Nimbus rollouts and the experiment loader
- Captive portal and connectivity checks to detectportal.firefox.com
- Merino, Contile, ads.mozilla.org, Discovery Stream, partner attribution, new-tab trainhop add-ons
- Mozilla accounts remote roots (accounts, profile, oauth, pairing websocket), Sync token server, Push, WebExtension storage sync
- Google Safe Browsing v2/v4/v5 list, report, and mistake URLs (until you turn GSB on in Settings)
- Chrome Widevine update URL, AMO discovery recommendations, VPN and mobile promo links
- Google geolocation (stock ESR default). Ask mode uses BeaconDB instead
- Region lookup to location.services.mozilla.com
- Mozilla MITM priming, shopping OHTTP, ML model hub, IP protection VPN endpoint
- OpenH264 / Widevine GMP manager (URL is `data:`)
- System add-on updates from aus5.mozilla.org

The Mozilla updater is compiled out (`--disable-updater`). Lyra Browser's own check is off until `lyra.update.check` is true.

## Browser: still talks to the network

These stay because turning them off either ages out security lists or breaks a feature people use.

| Destination                                        | Why                                                                                              |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| firefox.settings.services.mozilla.com              | Remote Settings: CRLite revocation, OneCRL, add-on blocklist, Enhanced Tracking Protection lists |
| shavar.services.mozilla.com                        | Hash lookups for those ETP lists                                                                 |
| addons.mozilla.org and services.addons.mozilla.org | uBlock Origin install and AMO updates. Also whatever add-ons you install                         |
| versioncheck.addons.mozilla.org                    | Add-on update checks                                                                             |
| doh.dns.sb                                         | DNS over HTTPS (mode 2, native fallback on). Changeable in Settings                              |
| api.beacondb.net                                   | Only if geolocation is Ask. Block and spoof send nothing                                         |
| seek.lyrabrowser.com                               | Default search (Seek)                                                                            |
| lyrabrowser.com                                    | This website                                                                                     |
| github.com                                         | Opt-in update check (signed release.json)                                                        |
| sync.lyrabrowser.com                               | Opt-in P2P sync relay. Ciphertext only, isolated by pairing group                                |
| extensions.lyrabrowser.com                         | Add-on host                                                                                      |

Page translation downloads language models through Remote Settings when you translate a page. Models then run on the device.

WebRTC default ICE servers in this ESR are an empty list. Host ICE candidates are hidden. A call still uses STUN/TURN the site provides.

## What we do not send to Mozilla

No telemetry pings, no experiments, no new-tab ads, no accounts, no crash reports. `toolkit.telemetry.server` is `data:,`.

## What we do not send to Google

Safe Browsing is off. Geolocation does not use `www.googleapis.com`. There is no Chrome update URL for GMP. Search is Seek, not Google.

## Caveats

Remote Settings is still Mozilla infrastructure. Certificate revocation and tracker lists would go stale without it. FPP remote overrides stay on so Mozilla can ship site exceptions (Cloudflare and similar). You can set `privacy.fingerprintingProtection.remoteOverrides.enabled` to false in overrides if you would rather skip that fetch.

uBlock filter lists update from the lists you enable in uBlock, including EasyList and urlhaus. That is separate from the engine.

Visiting this website is a request to lyrabrowser.com, not to GitHub.
