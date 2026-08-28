---
name: verify-chat-stream
description: Exercise the portfolio chat UI in the browser without a model API key, by stubbing /api/chat with a synthetic NDJSON stream. Use when verifying anything in Chat.tsx, ChatMessage.tsx, useTypewriter, the caret, markdown rendering of answers, or the streaming client in chat-client.ts — especially when LLM_API_KEY is unset, the answer must not cost tokens, or the reveal timing needs to be observed frame by frame.
---

# Verify the chat stream without a model

The chat is the only interactive surface on the site, and every change to it (typing
reveal, caret, markdown, abort, error copy) needs to be seen running. A real request needs
`LLM_API_KEY`, costs tokens and returns unpredictable text. Replacing `window.fetch` for
`/api/chat` with a scripted NDJSON stream gives a deterministic answer, exact chunk
boundaries and no cost — while still running the real client code (`streamChat`, `Chat`,
`useTypewriter`, `ChatMessage`).

## 1. Start the preview

`preview_start` with `{name: "portfolio-dev"}` (`.claude/launch.json`; the port may not be
3000 — read it from the result), then navigate to `/en`.

## 2. Know the pane's limits before blaming the code

In this environment the Browser pane is often hidden, which changes the page's behaviour:

- `document.hidden` is `true` and **`requestAnimationFrame` never fires**, so anything
  rAF-driven appears frozen. `useTypewriter` deliberately completes instantly in that case.
- `setTimeout` is throttled to ~1s, so a sampling loop cannot see sub-second detail.
- Never `await` a promise that resolves inside `requestAnimationFrame` — `javascript_tool`
  will hang for 30s and time out.
- `read_page` refs report coordinates in the unscaled viewport while screenshots come back
  scaled. If a click by `ref` lands nowhere, take a screenshot and click its coordinates.

To watch an animation anyway, override the environment before submitting:

```js
Object.defineProperty(document, "hidden", { get: () => false, configurable: true });
window.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 16);
window.cancelAnimationFrame = (id) => clearTimeout(id);
```

## 3. Stub the endpoint

Emit whole `{"type":"delta"}` lines separated by `\n`, with the content type the real route
sends. Chunk the answer in a few fat slices on purpose — that is what proves the reveal is
per character rather than per token.

```js
const answer = "He tests with **Jest**, RTL and `Playwright`.\n\n- units\n- e2e";
const real = (window.__realFetch ||= window.fetch);
window.fetch = (input, init) => {
  const url = typeof input === "string" ? input : input.url;
  if (!url.includes("/api/chat")) return real(input, init);
  const enc = new TextEncoder();
  const stream = new ReadableStream({
    async start(c) {
      for (const text of [answer.slice(0, 40), answer.slice(40)]) {
        await new Promise((r) => setTimeout(r, 200));
        c.enqueue(enc.encode(JSON.stringify({ type: "delta", text }) + "\n"));
      }
      c.enqueue(enc.encode(JSON.stringify({ type: "done" }) + "\n"));
      c.close();
    },
  });
  return Promise.resolve(
    new Response(stream, {
      status: 200,
      headers: { "content-type": "application/x-ndjson; charset=utf-8" },
    }),
  );
};
```

For the failure paths, return `Response.json({...}, {status: 429})` or emit
`{"type":"error","message":"…"}` instead.

Every stub lives in the page only: a reload or an HMR-triggered remount clears it, so
re-apply it in the same call that submits. Nothing on disk is touched.

## 4. Submit and sample

The suggestion chips disappear once the transcript is non-empty, so drive the textarea
through React's native setter:

```js
const ta = document.querySelector("textarea");
Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set.call(ta, "testing?");
ta.dispatchEvent(new Event("input", { bubbles: true }));
ta.closest("form").requestSubmit();
```

Then sample `.answer` over time and assert on the sequence, not on one snapshot:

```js
const list = document.querySelectorAll(".answer");
const el = list[list.length - 1];
({ n: list.length, typing: el.className.includes("is-typing"), html: el.innerHTML });
```

## 5. What a good run looks like

- The bubble appears **empty with a caret** (`<p></p>`, a non-zero `::after` width on the
  last block) before the first character.
- `innerHTML` grows character by character despite the fat network chunks, and raw markup
  (`**`, backticks) is never visible — markers are closed while typing.
- Exactly **one** `.answer` bubble throughout: no flash, no duplicate when the answer is
  committed to the transcript.
- `is-typing` and the caret disappear on the last character.
- Stop mid-answer completes the text immediately and leaves the bubble in place.

## 6. Clean up

Reload the page to drop the stubs, and reset the viewport with `resize_window`
`{preset: "desktop"}` if it was resized.
