# Agentic video

Render one long video from a scene spec across vendors.

## Install

Use Node.js 18 or later.

```sh
npm install agentic-video
```

## Quickstart

Preview is the default. It makes no network request and needs no key.

```sh
cat > scenes.json <<'JSON'
{"scenes":[{"duration":8,"background":"#101827"},{"duration":12,"background":"#2563eb"}],"output":{"format":"mp4","resolution":"1920x1080"}}
JSON
npx agentic-video render --file scenes.json
```

Use the SDK with the same shape.

```js
import { renderVideo } from 'agentic-video';
const receipt = await renderVideo({ spec: { scenes: [{ duration: 20 }] } });
console.log(receipt);
```

Use it for product explainers, training videos, and social recaps.

## Live renders and keys

Add `--live` to call a vendor. Set the matching key in your shell or secret store.

| Vendor | Environment key |
| --- | --- |
| Shotstack | `SHOTSTACK_API_KEY` |
| Creatomate | `CREATOMATE_API_KEY` |

```sh
npx agentic-video render --file scenes.json --vendor shotstack --live
npx agentic-video render --file scenes.json --vendor creatomate --live
```

Missing keys return a clear error. Vendor errors pass through unchanged.
Short clips stay in `agentic-clip`.

## MCP

```sh
npx agentic-video mcp
```

Tools are `render_video` and `get_cost_report`. `render_video` uses the
same scene spec and defaults to `live: false`.

## License

MIT. Copyright Pooria Arab.
