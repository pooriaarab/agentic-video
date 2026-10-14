# Agentic video

Agentic video renders long-form video with Shotstack and Creatomate. Use it for product explainers, training videos, and social recaps.

## Install

Use Node.js 18 or later.

```sh
npm install agentic-video
```

## Quickstart

Preview is the default. It exits successfully, makes no network request, and needs no key.

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

## Live renders and keys

Add `--live` to render with a vendor. Set the matching key in your shell or secret store.

| Brand | Environment key | Live command |
| --- | --- | --- |
| Shotstack | `SHOTSTACK_API_KEY` | `npx agentic-video render --file scenes.json --vendor shotstack --live` |
| Creatomate | `CREATOMATE_API_KEY` | `npx agentic-video render --file scenes.json --vendor creatomate --live` |

Missing keys return a clear error. Vendor errors pass through unchanged. Short clips stay in `agentic-clip`.

## MCP

```sh
npx agentic-video mcp
```

Tools are `render_video` and `get_cost_report`. `render_video` uses the same scene spec and defaults to `live: false`.

## License

MIT. Copyright Pooria Arab.
