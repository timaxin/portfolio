import { describe, expect, it } from "vitest";
import { FOLLOWUP_MARKER } from "./chat-config";
import { markerHoldback, parseFollowUps } from "./followups";

/**
 * Replays a stream the way the model sends one: text in arbitrary chunks, the
 * marker possibly split across them. Mirrors the loop in createAnswerStream.
 */
function strip(chunks: string[]): { shown: string; tail: string } {
  let shown = "";
  let held = "";
  let tail = "";
  let inTail = false;

  for (const text of chunks) {
    if (inTail) {
      tail += text;
      continue;
    }
    held += text;

    const marker = held.indexOf(FOLLOWUP_MARKER);
    if (marker !== -1) {
      shown += held.slice(0, marker);
      tail = held.slice(marker + FOLLOWUP_MARKER.length);
      inTail = true;
      held = "";
      continue;
    }

    const keep = markerHoldback(held);
    shown += held.slice(0, held.length - keep);
    held = held.slice(held.length - keep);
  }

  if (!inTail) shown += held;
  return { shown, tail };
}

describe("markerHoldback", () => {
  it("holds nothing back from text that cannot become the marker", () => {
    expect(markerHoldback("plain answer")).toBe(0);
  });

  it("holds back exactly the part that could still grow into the marker", () => {
    expect(markerHoldback("answer<<FOLLOW")).toBe("<<FOLLOW".length);
    expect(markerHoldback("answer<")).toBe(1);
  });

  it("never holds back the whole marker, which is matched outright instead", () => {
    expect(markerHoldback(`answer${FOLLOWUP_MARKER}`)).toBe(0);
  });
});

describe("stripping the marker out of a stream", () => {
  const answer = "He tested it with Playwright.";
  const tail = '["What about CI?", "Who reviewed it?"]';

  it("removes the marker when it arrives whole", () => {
    expect(strip([answer + FOLLOWUP_MARKER + tail])).toEqual({ shown: answer, tail });
  });

  it("removes the marker when it is split across chunks", () => {
    expect(strip([answer + "<<FOLLOW", `UPS>>${tail}`])).toEqual({ shown: answer, tail });
  });

  it("removes the marker when it arrives one character at a time", () => {
    expect(strip([...(answer + FOLLOWUP_MARKER + tail)])).toEqual({ shown: answer, tail });
  });

  it("leaves an answer that never reaches a marker untouched", () => {
    expect(strip([answer])).toEqual({ shown: answer, tail: "" });
  });

  it("keeps text that merely flirts with the marker", () => {
    const teasing = "Compare << and <<F in the code.";
    expect(strip([teasing + FOLLOWUP_MARKER + tail])).toEqual({ shown: teasing, tail });
  });
});

describe("parseFollowUps", () => {
  it("reads a well-formed array", () => {
    expect(parseFollowUps('["one", "two"]')).toEqual(["one", "two"]);
  });

  it("tolerates surrounding whitespace and newlines", () => {
    expect(parseFollowUps('\n  ["one"]  \n')).toEqual(["one"]);
  });

  it("gives up rather than throwing on malformed output", () => {
    expect(parseFollowUps("not json at all")).toEqual([]);
    expect(parseFollowUps('["unterminated')).toEqual([]);
    expect(parseFollowUps("")).toEqual([]);
  });

  it("drops anything that is not a usable question", () => {
    expect(parseFollowUps('["ok", 42, null, "  ", {"q": "x"}]')).toEqual(["ok"]);
  });

  it("refuses a question too long to fit on a button", () => {
    expect(parseFollowUps(JSON.stringify(["x".repeat(200), "short"]))).toEqual(["short"]);
  });

  it("caps how many buttons the model can ask for", () => {
    expect(parseFollowUps(JSON.stringify(["a", "b", "c", "d", "e"]))).toHaveLength(3);
  });

  it("ignores a JSON value that is not an array", () => {
    expect(parseFollowUps('{"questions": ["a"]}')).toEqual([]);
  });
});
