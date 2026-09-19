# Reusable prompts and handoff templates

Use a new task conversation when switching tasks. Provide repository instructions and the current code/diff; a fresh agent does not automatically know another agent's conversation.

## Before implementation: understand the task

> Read the assigned task, project instructions and relevant files. Do not edit yet. In plain language, explain what the feature should do, the inputs it receives, which callback or output it produces, and which files you may change. List the checks that will demonstrate completion. Flag missing dependencies or conflicts with the current code. Propose a small plan, not a rewrite.

## Approve a bounded implementation

> Implement only the approved task and file list. Reuse current dependencies and shared types. Stop and report any required out-of-scope change. Run the documented checks and report actual results; do not remove tests or weaken configuration. Return viewing steps and remaining limitations. Do not commit, push or merge without my explicit approval.

## Debug a specific failure

> Task: [task ID]. Allowed files: [paths]. Expected: [behavior]. Actual: [behavior]. Reproduction: [steps]. Error: [sanitized exact error]. Inspect the relevant code, explain the likely cause, and propose the smallest fix. Do not reinstall/reinitialize the app, change shared types or disable checks. After the fix, repeat the reproduction and relevant checks. If the cause is outside my allowed files, stop with a lead-owned blocker report. State what remains unverified.

## Read-only second opinion

> Review only; do not edit files or run destructive commands. Read the task's acceptance criteria and the actual diff against main, including new/untracked files where available. Identify reproducible defects, out-of-scope edits, unexpected dependencies, hidden fixture use, early transaction-success claims, ignored error states and failed checks. For each finding give the file, impact, reproduction or evidence and the smallest suggested fix. Separate blockers from optional polish. Do not assert that code is secure simply because you found no issue.

The lead still reviews critical logic and runs integration checks. A second AI opinion is not an independent security audit.

## Ask the agent to teach the owner

> Explain my change using the actual files. What data comes in? What is displayed? What happens when the user clicks? Which file would I open to change the label? Which behavior belongs to the lead instead? Give me a short browser verification exercise without changing code.

## Pull-request / handoff template

```text
Task and branch:
Baseline / commit:
What changed:
Files changed:
Preview route or test environment:
What I personally checked:
Automated commands and actual results:
Screenshot / evidence:
Known limitations / not-run checks:
Lead integration needed:
```

Use “ready for review,” not “done,” until the lead has merged it and the integrated flow is checked.

## Blocker template

```text
Task / branch:
Environment and commit:
Expected behavior:
Actual behavior:
Minimal reproduction steps:
Exact sanitized error:
Relevant files:
Attempt 1 and result:
Attempt 2 and result:
Proposed owner of the next step:
```

After two failed attempts, stop adding speculative fixes. Save the evidence and discuss the smallest next step with the lead. Do not delete files, wipe local changes, disable permissions or force-push to recover.

## Generic task card for the lead

```text
Task ID and owner:
One outcome:
Prerequisites / baseline:
Context files and reference screenshot:
Allowed edit paths:
Read-only interfaces / callbacks:
Required states and edge cases:
Out of scope:
Acceptance checks:
Exact commands from DEV_SETUP:
Required handoff evidence:
Escalation conditions:
```

A useful task describes one reviewable behavior, not “build the frontend.” Prompting with specific inputs, scope and verification is supported by official agent guidance [S4, S7 in the kit's SOURCES.md]; the exact templates here are project recommendations.
