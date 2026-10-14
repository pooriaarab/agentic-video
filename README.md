# agentic-video

[![npm version](https://img.shields.io/npm/v/agentic-video)](https://www.npmjs.com/package/agentic-video)
[![Monthly downloads](https://img.shields.io/npm/dm/agentic-video)](https://www.npmjs.com/package/agentic-video)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/license/mit)

agentic-video is an open-source video request wrapper for Node.js applications and AI agents, with offline previews and Shotstack and Creatomate HTTP adapters.

## Install

```sh
npm install agentic-video
```

Requires Node.js 18 or later. Includes TypeScript declarations and three direct runtime dependencies.

## Preview your first scene

```js
import { renderVideo } from "agentic-video";
const receipt = await renderVideo({ spec: { scenes: [{ duration: 20 }] } });
console.log(receipt.dryRun, receipt.renderId, receipt.duration);
```

Expect `true`, an ID beginning with `preview_`, and `20`. No credentials or network calls are required.
A preview validates scene durations and produces a receipt; it creates no video file.

## Features and coverage

- Validate nonempty scene lists and positive finite durations.
- Create deterministic preview IDs from scene specifications.
- Submit HTTP requests when `live: true` is explicit.
- Record live usage as total scene duration in seconds.

| Adapter | Status | Environment key |
| --- | --- | --- |
| Shotstack | HTTP wrapper; scene payload compatibility unverified | `SHOTSTACK_API_KEY` |
| Creatomate | HTTP wrapper; scene payload compatibility unverified | `CREATOMATE_API_KEY` |

Two vendor adapters have mocked HTTP tests. Neither receives live credential verification in this rewrite.
Both send the package's scene specification unchanged; neither translates it into a vendor-specific timeline.
Export keys in the shell, or pass `apiKey` to `renderVideo`. The package does not load `.env` files.
Shotstack requests use its stage endpoint.

## Runtime surfaces

```sh
npx agentic-video render --file scenes.json
npx agentic-video costs
npx agentic-video mcp
npx agentic-video --help
npx agentic-video --version
```

`scenes.json` contains `{"scenes":[{"duration":20}]}`. Render flags include `--vendor shotstack|creatomate` and `--live`.
The Model Context Protocol (MCP) server exposes two tools: `render_video` and `get_cost_report`.
The `agentic-video-mcp` binary also starts the server.
The Worker source is a text-summary scaffold with `/health` and `/summarize`; it does not render video.

## Behavior limits

Live requests return a render ID, without polling completion, downloading output, retrying, or setting a request timeout.
Vendor rejection raises `VendorError`. A render ID does not prove a video finished.
Usage totals live in one process and do not represent currency prices.
A separate CLI `costs` invocation cannot read a previous render command's usage.

## Links and status

[Package](https://www.npmjs.com/package/agentic-video) · [Source and support](https://github.com/pooriaarab/agentic-video)

Version 0.1.1 APIs can change. Public case studies are not yet published.
Run `npm run build`, `npm run typecheck`, and `npm test` before contributing.

## License

MIT.
