# Campus Ops Console - prototype

A front-end prototype of a single operational view for a group operations manager
working across several campuses and entities: an international school, polytechnics,
universities and a learning centre.

Live prototype: https://claude.ai/artifact/7UNJCZApiBfmoRn5vjxEMy

## What this is

A demonstration prototype, not a production system. There are no integrations, no
database and no authentication. Everything runs in the browser against the sample
records in `prototype/data.js`, and every state change is held in memory so the
screen reacts the way the real system would during a walkthrough.

The proposition it demonstrates is one operational view across fragmented channels.
Fewer missed tasks, faster approvals, clearer accountability and easier reporting
follow from that. Recovered time is a consequence, not the headline claim, and every
time figure on screen is labelled as an estimate.

## The workflow it shows

Incoming information arrives from WeChat, email, spreadsheets, forms or manual entry.
The assistant reads it, summarises it and proposes the action. It becomes a task in
one workspace with a source, owner, department, campus, status, priority, deadline,
next action, approver and follow-up history. Approvals move along a configurable
route. Stalled items surface as reminders. Completion is recorded and feeds the
reporting view.

## Sections

- Today - ranked by what is late, what is stuck and what is waiting on her decision
- Unified inbox - all five sources in one queue, each item read once and converted
- Approvals - route stages, ageing against each stage, approve or nudge
- Follow-ups - who owes her what, for how long, and when they were last chased
- Campuses - the same picture per campus or entity, with a workload comparison
- Calendar - task deadlines and diary entries on one grid
- Reports - workload, weekly completion, turnaround against a service target,
  approval ageing, and the estimated time recovery table with its caveat
- Assistant - answers computed from the records on screen, including drafted
  follow-up messages

## Deliberate design decisions

- Approval routes are per request type and shown as configurable, because the group
  has not standardised them yet. The stages in `ROUTES` are placeholders to be
  re-mapped with each campus.
- Sources are abstracted. WeChat, email, form and spreadsheet are presented as
  channel types so they can later be bound to WeCom, DingTalk, Feishu, Outlook or a
  local mail platform without redesigning the interface.
- English first, with a working EN / 中文 toggle. Every label and record carries both
  languages, and the layout is built so Chinese text does not break it.
- A prototype marker sits in the top bar, and the time recovery figures carry an
  explicit statement that they are estimates rather than measurements.
- Light and dark themes are both designed, with a toggle.

## Files

- `prototype/index.html` - page shell
- `prototype/styles.css` - design tokens and layout
- `prototype/data.js` - all sample records, day offsets relative to today
- `prototype/app.js` - views, interactions, charts and the assistant

## Not in this version

Authentication, permissions and multi-user management, a database, live integrations,
mainland China hosting, data residency and ICP considerations. Those belong to phase
two, once the concept is approved.
