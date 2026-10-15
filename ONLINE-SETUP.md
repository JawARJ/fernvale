# Online / Auto Farm 0.71 — development release

The public Sites release can show the Auto configuration window. No public game backend has been provisioned. The Node server below is a tested development implementation, not a deployed MMO service. Party is still locked.

## Run the working server locally

Install Node 20.11 or newer. No npm dependencies are required.

```
node server/server.cjs
```

Open **http://127.0.0.1:8787/**. Choose **ออนไลน์ / Auto Farm (ทดสอบ)**, leave the local server URL, and create a test account (username 3–24 ASCII letters/digits/underscores; password 10–128 characters). Select the class for the new online character. Guest/local characters remain separate and are not uploaded. The online character currently starts after the tutorial; no local-save migration is offered.

Gameplay, MP/CD, monster AI, drops, EXP and currency execute on the server using the browser game's existing engine files. Each account owns an isolated instance. Browser clients receive state snapshots and send allowed actions; they cannot submit reward amounts or character stats. Auto's four configurable slots are independent of Q/W/E/R; Buffs are never auto-cast, while equipped Passives apply. Locked/CD/MP-ineligible skills are skipped immediately. Charges release at full charge; channels hold for three seconds; toggles stay enabled instead of toggling off each cycle.

Buy a 1-hour ticket for 10,000 in-game money at the town potion shop. Activate it in the Auto window. Up to 24 hours can be activated; a ticket that would overflow the cap is not consumed. Choose a dungeon, then start Auto. It moves, uses ladders, attacks and collects nearby ground drops. It never changes maps or restarts a defeated boss. Defeat returns to town and stops Auto. Time expires or pressing Stop ends Auto and preserves unused time. There is no automatic potion use or revival.

The process keeps simulating active farms with no browser connected. Reconnect with the same account to view the same instance. Disconnecting a browser does not stop or pause Auto. Server process downtime is not billed and does not award estimated rewards. On restart, the last durable combat checkpoint resumes. Do not advertise farming through a powered-off/sleeping server.

## Persistence and operational boundaries

- `server/data/` is ignored by Git. It stores salted scrypt password hashes, hashed opaque login tokens, character checkpoints, and recent economic-action receipts. Never commit or publish it.
- Set `DATA_DIR` to a **persistent disk**, not the ephemeral source checkout. A checkpoint is fsynced and atomically renamed every second, and immediately after accepted non-input actions. A hard crash may lose at most the uncheckpointed simulation interval; checkpointed rewards cannot be replayed by reconnecting.
- Only one process/replica may own this store. An exclusive lock rejects a second writer. Do not copy a live store to a second running server. Back up the store while the service is stopped.
- Account control has a ten-second client lease to prevent accidental simultaneous controls. Stop Auto is available immediately to authenticated reconnecting devices.
- Recent economic actions support idempotency IDs, so retrying an accepted request with the same ID does not repeat its debit/grant.
- A storage failure halts simulation and rejects mutations. Restart recovery must be verified before using real player accounts.
- This is a development server using full snapshots over HTTP polling, a single JSON/checkpoint store and one Node process. It has not been load-tested for a public launch. No party rooms/shared boss state, password recovery, account deletion UI, local-character migration, online item selling, production monitoring, or multi-replica persistence has been delivered.
- The live Sites URL remains a static frontend. Its login/configuration page requires the URL of a separately hosted server. Prefer serving both the game and API from this Node server's HTTPS origin when hosting is ready.

## Hosting the prepared implementation

`render.yaml` is an **optional paid** single-instance Node web service template with a persistent disk and Singapore region. It has not been applied or purchased. The owner must create a Render account, connect the GitHub repository, review the selected paid service/disk, and authorize the cost before deploying. Do not use a free sleeping instance for continuous Auto Farm.

Render setup: choose a Blueprint from this repository and review `render.yaml`, or create a Node Web Service with start command `node server/server.cjs`, health path `/api/health`, `HOST=0.0.0.0`, `DATA_DIR=/var/data/fernvale`, and a persistent disk mounted at `/var/data`. Allow the exact public frontend origin in `ALLOWED_ORIGINS`. The platform sets `PORT`. After deployment, open the service's HTTPS URL and verify a farm continues after closing every client before inviting users.

Official references: [Node deployment](https://render.com/docs/deploy-node-express-app), [persistent disks and single-instance limitations](https://render.com/docs/disks), [free-instance limitations](https://render.com/docs/free).

## Validation

`node tests/auto71.cjs` runs actual engine combat, ticket/cap/order tests, auth and ownership checks, disconnected progression, checkpoint restart and reconnect. `tests/auto71-browser.cjs` additionally requires Playwright (set `PLAYWRIGHT_MODULE`) and Edge, and exercises the PC/mobile UI, shop, custom slots, closed-browser progression, reconnect and Stop. Existing skill/combat/save tests remain relevant to the shared engine.
