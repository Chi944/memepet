# Three separate chats inside OKX Hackathon

No ChatGPT conversations have been created by this starter. The preparation chat did
not expose a tool for creating or renaming project conversations.

Use the existing **OKX Hackathon** project, not three separate projects.
Open its Share pane, keep access invite-only, and invite Kym and Larm to the project
if they are not already members. Chat access is sufficient for creating their own
conversations; give edit access only when they need to change shared files/instructions.
These invitations are separate from GitHub access.

Each person signs in to their own ChatGPT account and starts their own fresh chat inside
that project. Use these titles and first messages:

| Owner | Title | Opening message |
|---|---|---|
| Deston | Deston — Lead & Integration | chat-starters/Deston.md |
| Kym | Kym — Pet UI & Visuals | chat-starters/Kym.md |
| Larm | Larm — Community UI & QA | chat-starters/Larm.md |

Use the chat menu to set the title where available. Sending a prompt asking the model
to rename a chat is not proof the title was changed. Each teammate creating their own
chat avoids treating someone else's conversation as a jointly editable live thread.

**Separate does not mean private:** shared-project members can view the project's chats
and files. Do not paste credentials or personal material that should be hidden from
other members. Shared projects support branching, rather than synchronous co-editing
of a single conversation.

## Shared context to add

Deston can add PROJECT_BRIEF.md, OWNERSHIP.md, and the three role packs to project sources.
For a smaller upload footprint, use TEAM_CONTEXT.md, which combines the frozen project
brief, ownership, and all three role packs. Add the role-specific opening prompt only
to that person's chat. Project instructions should describe the whole team, not assume
every speaker is Deston. Suggested shared instructions are in PROJECT_INSTRUCTIONS.md.

Do not rely on automatic recall of another conversation. Supply a current repository
reference, branch/commit, or handoff when needed. Chat context does not merge code.

## Source

OpenAI Projects documentation, checked 19 September 2026:
https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt
