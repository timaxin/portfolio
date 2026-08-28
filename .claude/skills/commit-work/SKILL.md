---
name: commit-work
description: Commit finished work to git — never push. Use after completing any meaningful change in this repo (a feature, a fix, a refactor, a new page, docs or skills), and whenever asked to commit, save, or record work. Covers what counts as commit-worthy, how to split changes into commits, and the message style this repo uses.
---

# Commit every meaningful change

Tsimafei wants the work committed as it lands, so the history reads as a sequence of
finished pieces rather than one heap at the end. Commit without being asked.

**Never push.** Not `git push`, not `--set-upstream`, not a pull request. Pushing is his
call, and the remote is a public repo recruiters browse. The only exception is an explicit
"push this" from him in chat.

## When to commit

Commit when a change is coherent and the tree is healthy:

- a feature or page works end to end
- a bug is fixed
- a refactor is complete
- docs, skills, config or dependencies changed on their own

Do not commit work in progress, a debugging probe, or anything that fails
`npm run typecheck` or `npm run lint`. Run both first — a commit that does not build is
worse than no commit.

Skip only when he says not to commit, or says he wants to review first. That instruction
holds for the rest of the session.

## How to split

One commit per idea. If a session produced a feature plus an unrelated docs change, that is
two commits, not one. When a single file carries changes belonging to two commits, write
the intermediate version of that file, stage it, commit, then write the final version —
`git add -p` is interactive and unavailable here.

Check what is actually staged before committing:

```bash
git status --short && git diff --cached --stat
```

Never `git add -A` blindly: `.env` and local scratch files must stay out. Name the paths.

## Message style

English (the whole repo is English), imperative mood, and about the effect rather than the
diff. Look at `git log` before writing — the existing messages are the spec:

- "Replace the site favicon with the new CV mark"
- "Rebuild the timeline from LinkedIn, add two projects"
- "Make www.timcv.pl the canonical host"

A subject line alone is enough for a small change. Add a body when the reasoning is not
obvious from the diff — why an approach was chosen, what constraint forced it. Wrap it at
about 80 columns.

Every commit ends with the trailer:

```
Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
```

## Branch

If the work is on `main`, that is fine here — this is his own portfolio and he works on
`main`. Do not create branches unless asked.

## After committing

Tell him in one line what was committed and that it is local — never imply it is live. The
site deploys from the remote, so nothing he can see changes until he pushes.
