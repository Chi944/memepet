# Create the hosted repository — Deston

## What has and has not happened

The connected GitHub account was confirmed as `Chi944`. The installed repository search
returned no accessible MemePet match. That is not proof that the name is globally free
or absent from repositories this connection cannot access.
The available GitHub tools in the preparation chat were read-only. No hosted repository
or GitHub invitations were created.

## Browser path (no command line needed)

1. Sign in to the intended GitHub account. Open **+ → New repository**.
2. Set owner **Chi944**, name **memepet**, visibility **Private**, description
   **MemePet — X Layer meme-community companion app.**
3. Leave automatic README, .gitignore, and license initialization off, because this
   starter supplies initial files. Create the repository. If the name is already taken
   in this account, inspect that repository rather than deleting or overwriting it.
4. Extract `MemePet_Starter_Repo.zip`. Inside it, open the `memepet` folder.
5. On GitHub's empty repository page choose the option to upload existing files.
   Upload the **contents of the inner memepet folder**, not the ZIP or its outer wrapper.
   README.md, AGENTS.md, and CLAUDE.md must appear at the repository root.
   Preserve subfolders. Include hidden `.gitignore`, `.gitattributes`, and `.github`.
   Enable hidden-file display in your file manager or add any omitted dotfiles through
   GitHub's create-file interface. Never upload a local `.git` directory.
6. Commit the initial files with **chore: initialize MemePet team starter**.
   This first bootstrap commit is the exception to the feature-branch rule; subsequent
   work uses reviewed pull requests.
7. Open **Settings → Collaborators → Add people**. Invite Kym and Larm using their actual
   GitHub usernames or verified emails. They must accept. Their names in this kit do
   not identify GitHub accounts.
8. In ChatGPT's GitHub app settings, authorize this new private repository if the
   connection is restricted to selected repositories. Each teammate uses their own
   account/connection when needed; sharing a project is not a transfer of GitHub access.

## Initial local development

Clone the created repository in your chosen editor. Deston runs L0 first; Kym and Larm
can read their packs and prepare copy/art until a verified baseline is merged.
Each person uses their own checkout and task branch. Do not copy a teammate's `.env` or
share a signing wallet.

## Optional local coding-agent publishing prompt

Use this only instead of the browser creation/upload path, in a local tool with terminal
access, with the extracted folder open:

> Create and publish this starter as a PRIVATE GitHub repository named Chi944/memepet.
> First inspect this folder without reading secret files. Check that GitHub CLI is
> installed and already authenticated to Chi944, and check whether the destination
> exists. Do not request or print access tokens. If tooling/authentication is missing,
> stop and explain the official setup steps. If the repository already exists, do not
> overwrite it. With the correct account and a new destination, initialize Git on main
> if needed, inspect and commit only these starter files using my configured author
> identity, and use gh repo create with private visibility, this source folder, an
> origin remote, and push. Do not force-push or add collaborators. This prompt authorizes
> that initial private repository creation and push only, not public publication,
> deployment, or deletion. Verify the remote URL, private visibility, and pushed commit;
> report actual results. Do not claim success from a local commit alone.

This optional prompt has not been executed. Browser setup is the simplest default.

## Sources

GitHub repository creation:
https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository

Uploading files:
https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

Inviting collaborators:
https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository

GitHub CLI create:
https://cli.github.com/manual/gh_repo_create

ChatGPT GitHub connection:
https://help.openai.com/en/articles/11145903-connecting-github-to-chatgpt
